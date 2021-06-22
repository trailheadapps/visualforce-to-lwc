import { createElement } from 'lwc';
import ViewRecordWithParentRecordData from 'c/viewRecordWithParentRecordData';
import { getRecord } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_TYPE_FIELD from '@salesforce/schema/Account.Type';
import ACCOUNT_PHONE_FIELD from '@salesforce/schema/Account.Phone';
import ACCOUNT_OWNER_NAME_FIELD from '@salesforce/schema/Account.Owner.Name';

// Mock realistic data
const mockGetRecord = require('./data/getRecord.json');

describe('c-view-record-with-parent-record-data', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }

        jest.clearAllMocks();
    });

    // Helper function to wait until the microtask queue is empty.
    // Used to wait for asynchronous DOM updates.
    async function flushPromises() {
        return Promise.resolve();
    }

    it('contains one lightning-record-view-form with three lightning-output-fields and one lightning-formatted-text', async () => {
        // Create initial element
        const element = createElement('c-view-record-with-parent-record-data', {
            is: ViewRecordWithParentRecordData
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

    it('uses the account object and account field within lightning-record-view-form', async () => {
        const ACCOUNT_FIELDS = [
            ACCOUNT_NAME_FIELD,
            ACCOUNT_TYPE_FIELD,
            ACCOUNT_PHONE_FIELD
        ];

        // Create initial element
        const element = createElement('c-view-record-with-parent-record-data', {
            is: ViewRecordWithParentRecordData
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
        it('gets called to query the account owner name field', async () => {
            const RECORD_ID = '0012100000rZPJFAA4';

            // Create initial element
            const element = createElement(
                'c-view-record-with-parent-record-data',
                {
                    is: ViewRecordWithParentRecordData
                }
            );

            element.recordId = RECORD_ID;
            document.body.appendChild(element);

            // Emit data from @wire
            getRecord.emit(mockGetRecord);

            // Wait for any asynchronous DOM updates
            await flushPromises();

            expect(getRecord.getLastConfig()).toEqual({
                recordId: RECORD_ID,
                fields: [ACCOUNT_OWNER_NAME_FIELD]
            });
        });

        it('shows the account owner name on successful emit', async () => {
            // Create initial element
            const element = createElement(
                'c-view-record-with-parent-record-data',
                {
                    is: ViewRecordWithParentRecordData
                }
            );
            document.body.appendChild(element);

            // Emit data from @wire
            getRecord.emit(mockGetRecord);

            // Wait for any asynchronous DOM updates
            await flushPromises();

            const textEl = element.shadowRoot.querySelector(
                'lightning-formatted-text'
            );
            expect(textEl.value).toEqual(
                mockGetRecord.fields.Owner.value.fields.Name.value
            );
        });

        it('shows an empty value for the account owner name on error emit', async () => {
            // Create initial element
            const element = createElement(
                'c-view-record-with-parent-record-data',
                {
                    is: ViewRecordWithParentRecordData
                }
            );
            document.body.appendChild(element);

            // Emit data from @wire
            getRecord.error();

            // Wait for any asynchronous DOM updates
            await flushPromises();

            const textEl = element.shadowRoot.querySelector(
                'lightning-formatted-text'
            );
            expect(textEl.value).toBe('');
        });
    });

    it('is accessible', async () => {
        const element = createElement('c-view-record-with-parent-record-data', {
            is: ViewRecordWithParentRecordData
        });

        document.body.appendChild(element);

        await expect(element).toBeAccessible();
    });
});
