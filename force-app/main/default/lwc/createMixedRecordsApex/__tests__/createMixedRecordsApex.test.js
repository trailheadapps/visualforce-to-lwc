import { createElement } from 'lwc';
import CreateMixedRecordsApex from 'c/createMixedRecordsApex';
import { ShowToastEventName } from 'lightning/platformShowToastEvent';
import { reduceErrors } from 'c/ldsUtils';
import createContactAndOpportunity from '@salesforce/apex/CreateMixedRecordsApexControllerLwc.createContactAndOpportunity';

// Mocking imperative Apex method call
jest.mock(
    '@salesforce/apex/CreateMixedRecordsApexControllerLwc.createContactAndOpportunity',
    () => {
        return {
            default: jest.fn()
        };
    },
    { virtual: true }
);

// Sample data for imperative Apex call
const APEX_OPERATION_SUCCESS = null;

// Sample error for imperative Apex call
const APEX_OPERATION_ERROR = {
    body: { message: 'An internal server error has occurred' },
    ok: false,
    status: 400,
    statusText: 'Bad Request'
};

describe('c-create-mixed-records-apex', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        // Prevent data saved on mocks from leaking between tests
        jest.clearAllMocks();
    });

    // Helper function to wait until the microtask queue is empty.
    // Used to wait for asynchronous DOM updates.
    async function flushPromises() {
        return Promise.resolve();
    }

    it('initializes lightning-input values correctly', () => {
        const element = createElement('c-create-mixed-records-apex', {
            is: CreateMixedRecordsApex
        });
        document.body.appendChild(element);

        const DEFAULT_VALUES = ['Yan', 'Khang', 'Possible deal'];

        const actualValues = Array.from(
            element.shadowRoot.querySelectorAll('lightning-input')
        ).map((input) => input.value);

        expect(actualValues).toEqual(DEFAULT_VALUES);
    });

    it('passes the user input to the Apex method correctly', async () => {
        const CONTACT_FIRST_NAME = 'John';
        const CONTACT_LAST_NAME = 'Taylor';
        const OPPORTUNITY_NAME = 'Big deal!';
        const APEX_PARAMETERS = {
            contactFirstName: CONTACT_FIRST_NAME,
            contactLastName: CONTACT_LAST_NAME,
            opportunityName: OPPORTUNITY_NAME
        };

        // Assign mock value for resolved Apex promise
        createContactAndOpportunity.mockResolvedValue(APEX_OPERATION_SUCCESS);

        // Create initial element
        const element = createElement('c-create-mixed-records-apex', {
            is: CreateMixedRecordsApex
        });
        document.body.appendChild(element);

        // Select input fields for simulating user input
        const contactFirstNameInputEl = element.shadowRoot.querySelector(
            'lightning-input[class="contactFirstName"]'
        );
        contactFirstNameInputEl.value = CONTACT_FIRST_NAME;
        contactFirstNameInputEl.dispatchEvent(new CustomEvent('change'));

        const contactLastNameInputEl = element.shadowRoot.querySelector(
            'lightning-input[class="contactLastName"]'
        );
        contactLastNameInputEl.value = CONTACT_LAST_NAME;
        contactLastNameInputEl.dispatchEvent(new CustomEvent('change'));

        const opportunityNameInputEl = element.shadowRoot.querySelector(
            'lightning-input[class="opportunityName"]'
        );
        opportunityNameInputEl.value = OPPORTUNITY_NAME;
        opportunityNameInputEl.dispatchEvent(new CustomEvent('change'));

        // Select button for executing Apex call
        const buttonEl = element.shadowRoot.querySelector('lightning-button');
        buttonEl.click();

        // Wait for any asynchronous DOM updates
        await flushPromises();

        // Validate parameters of mocked Apex call
        expect(createContactAndOpportunity.mock.calls[0][0]).toEqual(
            APEX_PARAMETERS
        );
    });

    it('shows success toast message when records created successfully', async () => {
        // Assign mock value for resolved Apex promise
        createContactAndOpportunity.mockResolvedValue(APEX_OPERATION_SUCCESS);

        // Create initial element
        const element = createElement('c-create-mixed-records-apex', {
            is: CreateMixedRecordsApex
        });
        document.body.appendChild(element);

        // Mock handler for toast event
        const handler = jest.fn();
        // Add event listener to catch toast event
        element.addEventListener(ShowToastEventName, handler);

        // Select button for executing Apex call
        const buttonEl = element.shadowRoot.querySelector('lightning-button');
        buttonEl.click();

        // Wait for any asynchronous DOM updates
        await flushPromises();

        // Check if toast event has been fired
        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.variant).toBe('success');
        expect(handler.mock.calls[0][0].detail.message).toBe(
            'Contact & Opportunity created correctly'
        );
    });

    it('shows error toast message when there is an error', async () => {
        // Assign mock value for rejected Apex promise
        createContactAndOpportunity.mockRejectedValue(APEX_OPERATION_ERROR);

        // Create initial element
        const element = createElement('c-create-mixed-records-apex', {
            is: CreateMixedRecordsApex
        });
        document.body.appendChild(element);

        // Mock handler for toast event
        const handler = jest.fn();
        // Add event listener to catch toast event
        element.addEventListener(ShowToastEventName, handler);

        // Select button for executing Apex call
        const buttonEl = element.shadowRoot.querySelector('lightning-button');
        buttonEl.click();

        // Wait for any asynchronous DOM updates
        await flushPromises();

        // Check if toast event has been fired
        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.variant).toBe('error');
        expect(handler.mock.calls[0][0].detail.message).toBe(
            'Error creating records: ' +
                reduceErrors(APEX_OPERATION_ERROR).join(', ')
        );
    });

    it('is accessible', async () => {
        const element = createElement('c-create-mixed-records-apex', {
            is: CreateMixedRecordsApex
        });

        document.body.appendChild(element);

        await expect(element).toBeAccessible();
    });
});
