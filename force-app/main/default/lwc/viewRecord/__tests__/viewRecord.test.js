import { createElement } from 'lwc';
import ViewRecord from 'c/viewRecord';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_TYPE_FIELD from '@salesforce/schema/Account.Type';
import ACCOUNT_PHONE_FIELD from '@salesforce/schema/Account.Phone';
import ACCOUNT_EMPLOYEES_FIELD from '@salesforce/schema/Account.NumberOfEmployees';

const RECORD_ID_INPUT = '0019A00000E8zAWQAZ';

describe('c-view-record', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders lightning-record-form initialized', () => {
        // Create initial element
        const element = createElement('c-view-record', {
            is: ViewRecord
        });
        // Set public properties
        element.recordId = RECORD_ID_INPUT;
        document.body.appendChild(element);

        // Validate if correct parameters have been passed to base components
        const formEl = element.shadowRoot.querySelector(
            'lightning-record-form'
        );
        expect(formEl.recordId).toBe(RECORD_ID_INPUT);
        expect(formEl.objectApiName).toStrictEqual(ACCOUNT_OBJECT);
        expect(formEl.fields).toStrictEqual([
            ACCOUNT_NAME_FIELD,
            ACCOUNT_TYPE_FIELD,
            ACCOUNT_PHONE_FIELD,
            ACCOUNT_EMPLOYEES_FIELD
        ]);
    });
});
