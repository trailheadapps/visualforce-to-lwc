import { createElement } from 'lwc';
import PageMessagesToast from 'c/pageMessagesToast';
import { ShowToastEventName } from 'lightning/platformShowToastEvent';
import callApex from '@salesforce/apex/PageMessagesControllerLwc.callApex';
import { reduceErrors } from 'c/ldsUtils';

// Mocking imperative Apex method call
jest.mock(
    '@salesforce/apex/PageMessagesControllerLwc.callApex',
    () => {
        return {
            default: jest.fn()
        };
    },
    { virtual: true }
);

describe('c-page-messages-toast', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }

        jest.clearAllMocks();
    });

    // Helper function to wait until the microtask queue is empty. This is needed for promise
    // timing when calling imperative Apex.
    function flushPromises() {
        // eslint-disable-next-line no-undef
        return new Promise((resolve) => setImmediate(resolve));
    }

    it('calls apex when button is clicked', () => {
        // Assign mock value for resolved Apex promise
        callApex.mockResolvedValue();

        // Create initial element
        const element = createElement('c-paginated-list-wrapper', {
            is: PageMessagesToast
        });
        document.body.appendChild(element);

        const buttonEl = element.shadowRoot.querySelector('lightning-button');
        buttonEl.click();

        // Return an immediate flushed promise (after the Apex call) to then
        // wait for any asynchronous DOM updates. Jest will automatically wait
        // for the Promise chain to complete before ending the test and fail
        // the test if the promise ends in the rejected state.
        return flushPromises().then(() => {
            // Validate parameters of mocked Apex call
            expect(callApex).toBeCalled();
        });
    });

    it('shows toast when apex fails after button is clicked', () => {
        // Assign mock value for rejected Apex promise
        const ERROR_OBJECT = { message: 'test error' };
        callApex.mockRejectedValue(ERROR_OBJECT);

        // Create initial element
        const element = createElement('c-paginated-list-wrapper', {
            is: PageMessagesToast
        });
        document.body.appendChild(element);

        // Mock handler for toast event
        const handler = jest.fn();
        // Add event listener to catch toast event
        element.addEventListener(ShowToastEventName, handler);

        const buttonEl = element.shadowRoot.querySelector('lightning-button');
        buttonEl.click();

        // Return an immediate flushed promise (after the Apex call) to then
        // wait for any asynchronous DOM updates. Jest will automatically wait
        // for the Promise chain to complete before ending the test and fail
        // the test if the promise ends in the rejected state.
        return flushPromises().then(() => {
            // Check if toast event has been fired
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.title).toBe('Error');
            expect(handler.mock.calls[0][0].detail.message).toBe(
                reduceErrors(ERROR_OBJECT).join(', ')
            );
            expect(handler.mock.calls[0][0].detail.variant).toBe('error');
        });
    });

    it('is accessible', () => {
        const element = createElement('c-page-messages-toast', {
            is: PageMessagesToast
        });

        document.body.appendChild(element);

        return Promise.resolve().then(() => expect(element).toBeAccessible());
    });
});
