import { createElement } from 'lwc';
import ViewRecordWithParentRecordDataWrapper from 'c/viewRecordWithParentRecordData';
import { getRecord } from 'lightning/uiRecordApi';
import { registerLdsTestWireAdapter } from '@salesforce/sfdx-lwc-jest';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_TYPE_FIELD from '@salesforce/schema/Account.Type';
import ACCOUNT_PHONE_FIELD from '@salesforce/schema/Account.Phone';
import ACCOUNT_OWNER_NAME_FIELD from '@salesforce/schema/Account.Owner.Name';

// Mock realistic data
const mockGetRecord = require('./data/getRecord.json');

// Register as an LDS wire adapter. Some tests verify the provisioned values trigger desired behavior.
const getRecordAdapter = registerLdsTestWireAdapter(getRecord);

describe('c-view-record-with-parent-record-data', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('contains one lightning-record-view-form with three lightning-output-fields and one lightning-formatted-text', () => {
        // Create initial element
        const element = createElement('c-view-record-with-parent-record-data', {
            is: ViewRecordWithParentRecordDataWrapper
        });
        document.body.appendChild(element);

        const recordViewFormEl = element.shadowRoot.querySelector(
            'lightning-record-view-form'
        );
        const outputFieldEls = element.shadowRoot.querySelectorAll(
            'lightning-record-view-form lightning-output-field'
        );
        const formattedTextEl = element.shadowRoot.querySelector(
            'lightning-record-view-form lightning-formatted-text'
        );

        expect(recordViewFormEl).not.toBeNull();
        expect(outputFieldEls.length).toEqual(3);
        expect(formattedTextEl).not.toBeNull();
    });

    it('uses the account object and account field within lightning-record-view-form', () => {
        const ACCOUNT_FIELDS = [
            ACCOUNT_NAME_FIELD,
            ACCOUNT_TYPE_FIELD,
            ACCOUNT_PHONE_FIELD
        ];

        // Create initial element
        const element = createElement('c-view-record-with-parent-record-data', {
            is: ViewRecordWithParentRecordDataWrapper
        });
        document.body.appendChild(element);

        const recordViewFormEl = element.shadowRoot.querySelector(
            'lightning-record-view-form'
        );
        const outputFieldEls = element.shadowRoot.querySelectorAll(
            'lightning-record-view-form lightning-output-field'
        );
        const outputFields = Array.from(outputFieldEls).map(
            (outputField) => outputField.fieldName
        );

        expect(recordViewFormEl.objectApiName).toEqual(ACCOUNT_OBJECT);
        expect(outputFields).toEqual(ACCOUNT_FIELDS);
    });

    describe('@wire getRecord', () => {
        it('gets called to query the account owner name field', () => {
            const RECORD_ID = '0012100000rZPJFAA4';

            // Create initial element
            const element = createElement(
                'c-view-record-with-parent-record-data',
                {
                    is: ViewRecordWithParentRecordDataWrapper
                }
            );

            element.recordId = RECORD_ID;
            document.body.appendChild(element);

            // Emit data from @wire
            getRecordAdapter.emit(mockGetRecord);

            // Return a promise to wait for any asynchronous DOM updates. Jest
            // will automatically wait for the Promise chain to complete before
            // ending the test and fail the test if the promise rejects.
            return Promise.resolve().then(() => {
                expect(getRecordAdapter.getLastConfig()).toEqual({
                    recordId: RECORD_ID,
                    fields: [ACCOUNT_OWNER_NAME_FIELD]
                });
            });
        });

        it('shows the account owner name on successful emit', () => {
            // Create initial element
            const element = createElement(
                'c-view-record-with-parent-record-data',
                {
                    is: ViewRecordWithParentRecordDataWrapper
                }
            );
            document.body.appendChild(element);

            // Emit data from @wire
            getRecordAdapter.emit(mockGetRecord);

            // Return a promise to wait for any asynchronous DOM updates. Jest
            // will automatically wait for the Promise chain to complete before
            // ending the test and fail the test if the promise rejects.
            return Promise.resolve().then(() => {
                const textEl = element.shadowRoot.querySelector(
                    'lightning-formatted-text'
                );
                expect(textEl.value).toEqual(
                    mockGetRecord.fields.Owner.value.fields.Name.value
                );
            });
        });

        it('shows an empty value for the account owner name on error emit', () => {
            // Create initial element
            const element = createElement(
                'c-view-record-with-parent-record-data',
                {
                    is: ViewRecordWithParentRecordDataWrapper
                }
            );
            document.body.appendChild(element);

            // Emit data from @wire
            getRecordAdapter.error();

            // Return a promise to wait for any asynchronous DOM updates. Jest
            // will automatically wait for the Promise chain to complete before
            // ending the test and fail the test if the promise rejects.
            return Promise.resolve().then(() => {
                const textEl = element.shadowRoot.querySelector(
                    'lightning-formatted-text'
                );
                expect(textEl.value).toBe('');
            });
        });
    });
});
