import { createElement } from 'lwc';
import EditableList from 'c/editableList';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_TYPE_FIELD from '@salesforce/schema/Account.Type';
import ACCOUNT_PHONE_FIELD from '@salesforce/schema/Account.Phone';
import ACCOUNT_EMPLOYEES_FIELD from '@salesforce/schema/Account.NumberOfEmployees';
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

// Mock Apex wire adapter
jest.mock(
    '@salesforce/apex/ListControllerLwc.getAccounts',
    () => {
        const {
            createApexTestWireAdapter
        } = require('@salesforce/sfdx-lwc-jest');
        return {
            default: createApexTestWireAdapter(jest.fn())
        };
    },
    { virtual: true }
);

describe('c-editable-list', () => {
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

    it('renders lightning-datatable when there is data', async () => {
        // Create initial element
        const element = createElement('c-editable-list', {
            is: EditableList
        });
        document.body.appendChild(element);

        // Emit data from @wire
        getAccounts.emit(mockGetAccounts);

        // Wait for any asynchronous DOM updates
        await flushPromises();

        const datatableEl = element.shadowRoot.querySelector(
            'lightning-datatable'
        );
        expect(datatableEl).not.toBeNull();
        expect(datatableEl.data).toStrictEqual(mockGetAccounts);
        expect(datatableEl.columns).toStrictEqual(COLUMNS);
    });

    it('renders error panel when there is error', async () => {
        const APEX_ERROR = {
            body: 'Error retrieving records',
            ok: false,
            status: '400',
            statusText: 'Bad Request'
        };

        // Create initial element
        const element = createElement('c-editable-list', {
            is: EditableList
        });
        document.body.appendChild(element);

        // Emit data from @wire
        getAccounts.error(
            APEX_ERROR.body,
            APEX_ERROR.status,
            APEX_ERROR.statusText
        );

        // Wait for any asynchronous DOM updates
        await flushPromises();

        const errorPanelEl = element.shadowRoot.querySelector('c-error-panel');
        expect(errorPanelEl).not.toBeNull();
        expect(errorPanelEl.errors).toStrictEqual(APEX_ERROR);
    });

    it('is accessible when data is returned', async () => {
        // Create initial element
        const element = createElement('c-editable-list', {
            is: EditableList
        });
        document.body.appendChild(element);

        // Emit data from @wire
        getAccounts.emit(mockGetAccounts);

        // Wait for any asynchronous DOM updates
        await flushPromises();

        await expect(element).toBeAccessible();
    });

    it('is accessible when error is returned', async () => {
        const APEX_ERROR = {
            body: 'Error retrieving records',
            ok: false,
            status: '400',
            statusText: 'Bad Request'
        };

        // Create initial element
        const element = createElement('c-editable-list', {
            is: EditableList
        });
        document.body.appendChild(element);

        // Emit data from @wire
        getAccounts.error(
            APEX_ERROR.body,
            APEX_ERROR.status,
            APEX_ERROR.statusText
        );

        // Wait for any asynchronous DOM updates
        await flushPromises();

        await expect(element).toBeAccessible();
    });
});
