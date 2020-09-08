import { createElement } from 'lwc';
import PageMessagesForm from 'c/pageMessagesForm';
import createCity from '@salesforce/apex/PageMessagesFormControllerLwc.createCity';

// Mocking imperative Apex method call
jest.mock(
    '@salesforce/apex/PageMessagesFormControllerLwc.createCity',
    () => {
        return {
            default: jest.fn()
        };
    },
    { virtual: true }
);

const MOCK_CITY_NAME = 'mockCityName';
const MOCK_ERROR = { message: 'mockError' };

describe('c-page-messages-form', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        // Prevent data saved on mocks from leaking between tests
        jest.clearAllMocks();
    });

    // Helper function to wait until the microtask queue is empty. This is needed for promise
    // timing when calling imperative Apex.
    function flushPromises() {
        // eslint-disable-next-line no-undef
        return new Promise((resolve) => setImmediate(resolve));
    }

    it('displays no error by default', () => {
        // Create initial element
        const element = createElement('c-page-messages-form', {
            is: PageMessagesForm
        });
        document.body.appendChild(element);

        // Check that error popover is not rendered
        const listEl = element.shadowRoot.querySelector('c-error-popover');
        expect(listEl).toBeNull();
    });

    it('updates city name when input changes', () => {
        // Create initial element
        const element = createElement('c-page-messages-form', {
            is: PageMessagesForm
        });
        document.body.appendChild(element);

        // Trigger input change
        const inputEl = element.shadowRoot.querySelector('lightning-input');
        inputEl.dispatchEvent(
            new CustomEvent('change', { detail: { value: MOCK_CITY_NAME } })
        );

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve().then(() => {
            expect(inputEl.value).toBe(MOCK_CITY_NAME);
        });
    });

    it('clears city name when cancel button clicked', () => {
        // Create initial element
        const element = createElement('c-page-messages-form', {
            is: PageMessagesForm
        });
        document.body.appendChild(element);

        // Set an initial input value
        const inputEl = element.shadowRoot.querySelector('lightning-input');
        inputEl.value = MOCK_CITY_NAME;

        // Click the cancel button
        element.shadowRoot.querySelector('.cancel').click();

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve().then(() => {
            expect(inputEl.value).toBe('');
        });
    });

    describe('createCity Apex calls', () => {
        it('creates city when save button clicked', () => {
            // Create initial element
            const element = createElement('c-page-messages-form', {
                is: PageMessagesForm
            });
            document.body.appendChild(element);

            // Set an initial input value
            const inputEl = element.shadowRoot.querySelector('lightning-input');
            inputEl.dispatchEvent(
                new CustomEvent('change', { detail: { value: MOCK_CITY_NAME } })
            );

            // Mock create city Apex call result
            createCity.mockResolvedValue(null);

            // Return an immediate flushed promise (after the Apex call) to then
            // wait for any asynchronous DOM updates. Jest will automatically wait
            // for the Promise chain to complete before ending the test and fail
            // the test if the promise ends in the rejected state.
            return Promise.resolve()
                .then(() => {
                    // Click the save button
                    element.shadowRoot.querySelector('.save').click();
                })
                .then(() => {
                    // Validate parameters of mocked Apex call
                    expect(createCity).toHaveBeenCalledWith({
                        cityName: MOCK_CITY_NAME
                    });
                });
        });

        it('displays errors when create city fails', () => {
            // Create initial element
            const element = createElement('c-page-messages-form', {
                is: PageMessagesForm
            });
            document.body.appendChild(element);

            // Mock create city Apex error
            createCity.mockRejectedValue(MOCK_ERROR);

            // Return an immediate flushed promise (after the Apex call) to then
            // wait for any asynchronous DOM updates. Jest will automatically wait
            // for the Promise chain to complete before ending the test and fail
            // the test if the promise ends in the rejected state.
            return flushPromises()
                .then(() => {
                    // Click the save button
                    element.shadowRoot.querySelector('.save').click();
                })
                .then(() => {
                    // Wait Apex call to resolve and for rerender
                    return flushPromises();
                })
                .then(() => {
                    // Validate that error is showing up
                    const errorButtonIconEl = element.shadowRoot.querySelector(
                        'lightning-button-icon'
                    );
                    expect(errorButtonIconEl).not.toBeNull();
                    const errorPopoverEl = element.shadowRoot.querySelector(
                        'c-error-popover'
                    );
                    expect(errorPopoverEl).not.toBeNull();
                });
        });
    });

    it('is accessible', () => {
        // Create initial element
        const element = createElement('c-page-messages-form', {
            is: PageMessagesForm
        });
        document.body.appendChild(element);

        // Mock create city Apex error
        createCity.mockRejectedValue(MOCK_ERROR);

        return Promise.resolve().then(() => expect(element).toBeAccessible());
    });
});
