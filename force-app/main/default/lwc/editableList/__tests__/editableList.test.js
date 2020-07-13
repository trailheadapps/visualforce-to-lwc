import { createElement } from 'lwc';
import EditableList from 'c/editableList';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_TYPE_FIELD from '@salesforce/schema/Account.Type';
import ACCOUNT_PHONE_FIELD from '@salesforce/schema/Account.Phone';
import ACCOUNT_EMPLOYEES_FIELD from '@salesforce/schema/Account.NumberOfEmployees';
import { registerApexTestWireAdapter } from '@salesforce/sfdx-lwc-jest';
import getAccounts from '@salesforce/apex/ListControllerLwc.getAccounts';

const COLUMNS = [
    {
        label: 'Account Name',
        fieldName: ACCOUNT_NAME_FIELD.fieldApiName,
        type: 'text',
        editable: 'true'
    },
    {
        label: 'Type',
        fieldName: ACCOUNT_TYPE_FIELD.fieldApiName,
        type: 'text',
        editable: 'true'
    },
    {
        label: 'Phone',
        fieldName: ACCOUNT_PHONE_FIELD.fieldApiName,
        type: 'phone',
        editable: 'true'
    },
    {
        label: 'Employees',
        fieldName: ACCOUNT_EMPLOYEES_FIELD.fieldApiName,
        type: 'number',
        editable: 'true'
    }
];

// Realistic data with a list of accounts
const mockGetAccounts = require('./data/getAccounts.json');

// Register as Apex wire adapter. Some tests verify that provisioned values trigger desired behavior.
const getAccountsAdapter = registerApexTestWireAdapter(getAccounts);

describe('c-editable-list', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });
    it('renders lightning-datatable when there is data', () => {
        // Create initial element
        const element = createElement('c-editable-list', {
            is: EditableList
        });
        document.body.appendChild(element);

        // Emit data from @wire
        getAccountsAdapter.emit(mockGetAccounts);

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve().then(() => {
            const datatableEl = element.shadowRoot.querySelector(
                'div.table-container > lightning-datatable'
            );
            expect(datatableEl).not.toBeNull();
            expect(datatableEl.data).toStrictEqual(mockGetAccounts);
            expect(datatableEl.columns).toStrictEqual(COLUMNS);
        });
    });

    it('renders error panel when there is error', () => {
        // Create initial element
        const element = createElement('c-editable-list', {
            is: EditableList
        });
        document.body.appendChild(element);

        // Emit data from @wire
        getAccountsAdapter.error();

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve().then(() => {
            const errorPanelEl = element.shadowRoot.querySelector(
                'c-error-panel'
            );
            expect(errorPanelEl).not.toBeNull();
            expect(errorPanelEl.errors).toBeTruthy();
        });
    });
});
