import { createElement } from 'lwc';
import CreateMixedRecordsWireFunctions from 'c/createMixedRecordsWireFunctions';
import { ShowToastEventName } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
import { reduceErrors } from 'c/ldsUtils';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import CONTACT_FIRST_NAME_FIELD from '@salesforce/schema/Contact.FirstName';
import CONTACT_LAST_NAME_FIELD from '@salesforce/schema/Contact.LastName';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import OPPORTUNITY_NAME_FIELD from '@salesforce/schema/Opportunity.Name';
import OPPORTUNITY_STAGENAME_FIELD from '@salesforce/schema/Opportunity.StageName';
import OPPORTUNITY_CLOSEDATE_FIELD from '@salesforce/schema/Opportunity.CloseDate';

// Realistic data after a create record call
const mockCreateRecordContact = require('./data/createRecordContact.json');
const mockCreateRecordOpportunity = require('./data/createRecordContact.json');

describe('c-create-mixed-records-wire-functions', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }

        // Prevent data saved on mocks from leaking between tests
        jest.clearAllMocks();
    });

    // Helper function to wait until the microtask queue is empty. This is needed for promise
    // timing when calling createRecord.
    function flushPromises() {
        // eslint-disable-next-line no-undef
        return new Promise((resolve) => setImmediate(resolve));
    }

    it('initializes lightning-input values correctly', () => {
        const element = createElement('c-create-mixed-records-wire-functions', {
            is: CreateMixedRecordsWireFunctions
        });
        document.body.appendChild(element);

        const inputsEl = element.shadowRoot.querySelectorAll('lightning-input');

        expect(inputsEl.length).toBe(3);
        expect(inputsEl[0].value).toBe('Yan');
        expect(inputsEl[1].value).toBe('Khang');
        expect(inputsEl[2].value).toBe('Possible deal');
    });

    it('passes the user input to the createRecord LDS function correctly', () => {
        const CONTACT_FIRST_NAME = 'John';
        const CONTACT_LAST_NAME = 'Taylor';
        const OPPORTUNITY_NAME = 'Big deal!';
        const CREATE_CONTACT_PARAMETERS = [
            {
                apiName: CONTACT_OBJECT.objectApiName,
                fields: {
                    [CONTACT_FIRST_NAME_FIELD.fieldApiName]: CONTACT_FIRST_NAME,
                    [CONTACT_LAST_NAME_FIELD.fieldApiName]: CONTACT_LAST_NAME
                }
            }
        ];
        const CREATE_OPPORTUNITY_PARAMETERS = [
            {
                apiName: OPPORTUNITY_OBJECT.objectApiName,
                fields: {
                    [OPPORTUNITY_NAME_FIELD.fieldApiName]: OPPORTUNITY_NAME,
                    [OPPORTUNITY_STAGENAME_FIELD.fieldApiName]: 'Prospecting',
                    [OPPORTUNITY_CLOSEDATE_FIELD.fieldApiName]: new Date(
                        2025,
                        1,
                        1
                    )
                }
            }
        ];

        // Create initial element
        const element = createElement('c-create-mixed-records-wire-functions', {
            is: CreateMixedRecordsWireFunctions
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

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve().then(() => {
            // Validate createRecord calls
            expect(createRecord).toHaveBeenCalledTimes(2);
            expect(createRecord.mock.calls[0]).toEqual(
                CREATE_CONTACT_PARAMETERS
            );
            expect(createRecord.mock.calls[1]).toEqual(
                CREATE_OPPORTUNITY_PARAMETERS
            );
        });
    });

    it('shows success toast message when records created successfully', () => {
        // Assign mock value for resolved createRecord promise
        createRecord.mockResolvedValueOnce(mockCreateRecordContact);
        createRecord.mockResolvedValueOnce(mockCreateRecordOpportunity);

        // Create initial element
        const element = createElement('c-create-mixed-records-wire-functions', {
            is: CreateMixedRecordsWireFunctions
        });
        document.body.appendChild(element);

        // Mock handler for toast event
        const handler = jest.fn();
        // Add event listener to catch toast event
        element.addEventListener(ShowToastEventName, handler);

        // Select button for executing Apex call
        const buttonEl = element.shadowRoot.querySelector('lightning-button');
        buttonEl.click();

        // Return an immediate flushed promise (after the Apex call) to then
        // wait for any asynchronous DOM updates. Jest will automatically wait
        // for the Promise chain to complete before ending the test and fail
        // the test if the promise ends in the rejected state.
        return flushPromises().then(() => {
            // Check if toast event has been fired
            expect(handler).toHaveBeenCalledTimes(2);
            expect(handler.mock.calls[0][0].detail.variant).toBe('success');
            expect(handler.mock.calls[0][0].detail.message).toBe(
                `Contact created with Id: ${mockCreateRecordContact.id}`
            );
            expect(handler.mock.calls[1][0].detail.variant).toBe('success');
            expect(handler.mock.calls[1][0].detail.message).toBe(
                `Opportunity created with Id: ${mockCreateRecordOpportunity.id}`
            );
        });
    });

    it('shows error toast message when there is an error', () => {
        const LDS_OPERATION_ERROR = new Error('Error creating record.');

        // Assign mock value for rejected Apex promise
        createRecord.mockRejectedValue(LDS_OPERATION_ERROR);

        // Create initial element
        const element = createElement('c-create-mixed-records-wire-functions', {
            is: CreateMixedRecordsWireFunctions
        });
        document.body.appendChild(element);

        // Mock handler for toast event
        const handler = jest.fn();
        // Add event listener to catch toast event
        element.addEventListener(ShowToastEventName, handler);

        // Select button for executing Apex call
        const buttonEl = element.shadowRoot.querySelector('lightning-button');
        buttonEl.click();

        // Return an immediate flushed promise (after the Apex call) to then
        // wait for any asynchronous DOM updates. Jest will automatically wait
        // for the Promise chain to complete before ending the test and fail
        // the test if the promise ends in the rejected state.
        return flushPromises().then(() => {
            // Check if toast event has been fired
            expect(handler).toHaveBeenCalledTimes(2);
            expect(handler.mock.calls[0][0].detail.variant).toBe('error');
            expect(handler.mock.calls[0][0].detail.message).toBe(
                'Error creating records: ' +
                    reduceErrors(LDS_OPERATION_ERROR).join(', ')
            );
            expect(handler.mock.calls[1][0].detail.variant).toBe('error');
            expect(handler.mock.calls[1][0].detail.message).toBe(
                'Error creating records: ' +
                    reduceErrors(LDS_OPERATION_ERROR).join(', ')
            );
        });
    });
});
