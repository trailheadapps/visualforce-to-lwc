import { createElement } from 'lwc';
import EditRecord from 'c/editRecord';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_TYPE_FIELD from '@salesforce/schema/Account.Type';
import ACCOUNT_PHONE_FIELD from '@salesforce/schema/Account.Phone';
import ACCOUNT_EMPLOYEES_FIELD from '@salesforce/schema/Account.NumberOfEmployees';
import { ShowToastEventName } from 'lightning/platformShowToastEvent';

const RECORD_ID = '0019A00000E8zAWQAZ';

describe('c-edit-record', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }

        jest.clearAllMocks();
    });
    it('shows a lightning-record-form initialized', () => {
        // Create initial element
        const element = createElement('c-edit-record', {
            is: EditRecord
        });
        element.recordId = RECORD_ID;
        document.body.appendChild(element);

        const recordForm = element.shadowRoot.querySelector(
            'lightning-record-form'
        );
        expect(recordForm).not.toBeNull();
        expect(recordForm.objectApiName).toStrictEqual(ACCOUNT_OBJECT);
        expect(recordForm.fields).toStrictEqual([
            ACCOUNT_NAME_FIELD,
            ACCOUNT_TYPE_FIELD,
            ACCOUNT_PHONE_FIELD,
            ACCOUNT_EMPLOYEES_FIELD
        ]);
    });

    describe('shows success toast message', () => {
        it('when a record is created successfully', () => {
            // Create initial element
            const element = createElement('c-edit-record', {
                is: EditRecord
            });
            document.body.appendChild(element);

            // Mock handler for toast event
            const handler = jest.fn();
            // Add event listener to catch toast event
            element.addEventListener(ShowToastEventName, handler);

            // Make lightning-record-form dispatch a success event
            const recordForm = element.shadowRoot.querySelector(
                'lightning-record-form'
            );
            recordForm.dispatchEvent(new CustomEvent('success'));

            // Return a promise to wait for any asynchronous DOM updates. Jest
            // will automatically wait for the Promise chain to complete before
            // ending the test and fail the test if the promise rejects.
            return Promise.resolve().then(() => {
                // Check if toast event has been fired
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.variant).toBe('success');
                expect(handler.mock.calls[0][0].detail.message).toBe(
                    'Account created'
                );
            });
        });

        it('when a record is updated successfully', () => {
            // Create initial element
            const element = createElement('c-edit-record', {
                is: EditRecord
            });
            element.recordId = RECORD_ID;
            document.body.appendChild(element);

            // Mock handler for toast event
            const handler = jest.fn();
            // Add event listener to catch toast event
            element.addEventListener(ShowToastEventName, handler);

            // Make lightning-record-form dispatch a success event
            const recordForm = element.shadowRoot.querySelector(
                'lightning-record-form'
            );
            recordForm.dispatchEvent(new CustomEvent('success'));

            // Return a promise to wait for any asynchronous DOM updates. Jest
            // will automatically wait for the Promise chain to complete before
            // ending the test and fail the test if the promise rejects.
            return Promise.resolve().then(() => {
                // Check if toast event has been fired
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.variant).toBe('success');
                expect(handler.mock.calls[0][0].detail.message).toBe(
                    'Account updated'
                );
            });
        });
    });

    describe('shows error toast message', () => {
        it('when there is an error creating a record', () => {
            // Create initial element
            const element = createElement('c-edit-record', {
                is: EditRecord
            });
            document.body.appendChild(element);

            // Mock handler for toast event
            const handler = jest.fn();
            // Add event listener to catch toast event
            element.addEventListener(ShowToastEventName, handler);

            // Make lightning-record-form dispatch a success event
            const recordForm = element.shadowRoot.querySelector(
                'lightning-record-form'
            );
            recordForm.dispatchEvent(new CustomEvent('error'));

            // Return a promise to wait for any asynchronous DOM updates. Jest
            // will automatically wait for the Promise chain to complete before
            // ending the test and fail the test if the promise rejects.
            return Promise.resolve().then(() => {
                // Check if toast event has been fired
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.variant).toBe('error');
                expect(handler.mock.calls[0][0].detail.message).toBe(
                    'Error creating Account'
                );
            });
        });

        it('when there is an error updating a record', () => {
            // Create initial element
            const element = createElement('c-edit-record', {
                is: EditRecord
            });
            element.recordId = RECORD_ID;
            document.body.appendChild(element);

            // Mock handler for toast event
            const handler = jest.fn();
            // Add event listener to catch toast event
            element.addEventListener(ShowToastEventName, handler);

            // Make lightning-record-form dispatch a success event
            const recordForm = element.shadowRoot.querySelector(
                'lightning-record-form'
            );
            recordForm.dispatchEvent(new CustomEvent('error'));

            // Return a promise to wait for any asynchronous DOM updates. Jest
            // will automatically wait for the Promise chain to complete before
            // ending the test and fail the test if the promise rejects.
            return Promise.resolve().then(() => {
                // Check if toast event has been fired
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.variant).toBe('error');
                expect(handler.mock.calls[0][0].detail.message).toBe(
                    'Error updating Account'
                );
            });
        });
    });

    it('is accessible', () => {
        const element = createElement('c-edit-record', {
            is: EditRecord
        });

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            expect(element).toBeAccessible();
        });
    });
});
