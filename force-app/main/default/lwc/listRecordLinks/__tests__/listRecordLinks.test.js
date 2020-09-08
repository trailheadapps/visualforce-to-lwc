import { createElement } from 'lwc';
import ListRecordLinks from 'c/listRecordLinks';
import ACCOUNT_ID_FIELD from '@salesforce/schema/Account.Id';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_TYPE_FIELD from '@salesforce/schema/Account.Type';
import ACCOUNT_PHONE_FIELD from '@salesforce/schema/Account.Phone';
import ACCOUNT_EMPLOYEES_FIELD from '@salesforce/schema/Account.NumberOfEmployees';
import { registerApexTestWireAdapter } from '@salesforce/sfdx-lwc-jest';
import getAccounts from '@salesforce/apex/ListRecordLinks.getAccounts';

const COLUMNS = [
    {
        label: 'Account Name',
        type: 'navigateToRecord',
        typeAttributes: {
            recordId: { fieldName: ACCOUNT_ID_FIELD.fieldApiName },
            label: { fieldName: ACCOUNT_NAME_FIELD.fieldApiName }
        }
    },
    { label: 'Type', fieldName: ACCOUNT_TYPE_FIELD.fieldApiName, type: 'text' },
    {
        label: 'Phone',
        fieldName: ACCOUNT_PHONE_FIELD.fieldApiName,
        type: 'phone'
    },
    {
        label: 'Employees',
        fieldName: ACCOUNT_EMPLOYEES_FIELD.fieldApiName,
        type: 'number'
    }
];

// Realistic data with a list of accounts
const mockGetAccounts = require('./data/getAccounts.json');

// Register as Apex wire adapter. Some tests verify that provisioned values trigger desired behavior.
const getAccountsAdapter = registerApexTestWireAdapter(getAccounts);

describe('c-list-record-links', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        // Prevent data saved on mocks from leaking between tests
        jest.clearAllMocks();
    });

    it('renders c-datatable-with-custom-types when there is data', () => {
        // Create initial element
        const element = createElement('c-list-record-links', {
            is: ListRecordLinks
        });
        document.body.appendChild(element);

        // Emit data from @wire
        getAccountsAdapter.emit(mockGetAccounts);

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve().then(() => {
            const datatableEl = element.shadowRoot.querySelector(
                'c-datatable-with-custom-types'
            );
            expect(datatableEl).not.toBeNull();
            expect(datatableEl.data).toStrictEqual(mockGetAccounts);
            expect(datatableEl.columns).toStrictEqual(COLUMNS);
        });
    });

    it('renders error panel when there is error', () => {
        const APEX_ERROR = {
            body: 'Error retrieving records',
            ok: false,
            status: '400',
            statusText: 'Bad Request'
        };

        // Create initial element
        const element = createElement('c-list-record-links', {
            is: ListRecordLinks
        });
        document.body.appendChild(element);

        // Emit data from @wire
        getAccountsAdapter.error(
            APEX_ERROR.body,
            APEX_ERROR.status,
            APEX_ERROR.statusText
        );

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve().then(() => {
            const errorPanelEl = element.shadowRoot.querySelector(
                'c-error-panel'
            );
            expect(errorPanelEl).not.toBeNull();
            expect(errorPanelEl.errors).toStrictEqual(APEX_ERROR);
        });
    });

    it('is accessible when data is returned', () => {
        // Create initial element
        const element = createElement('c-list-record-links', {
            is: ListRecordLinks
        });
        document.body.appendChild(element);

        // Emit data from @wire
        getAccountsAdapter.emit(mockGetAccounts);

        return Promise.resolve().then(() => expect(element).toBeAccessible());
    });

    it('is accessible when error is returned', () => {
        const APEX_ERROR = {
            body: 'Error retrieving records',
            ok: false,
            status: '400',
            statusText: 'Bad Request'
        };

        // Create initial element
        const element = createElement('c-list-record-links', {
            is: ListRecordLinks
        });
        document.body.appendChild(element);

        // Emit data from @wire
        getAccountsAdapter.error(
            APEX_ERROR.body,
            APEX_ERROR.status,
            APEX_ERROR.statusText
        );

        return Promise.resolve().then(() => expect(element).toBeAccessible());
    });
});
