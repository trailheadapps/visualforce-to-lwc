import { createElement } from 'lwc';
import BasicListGetListUi from 'c/basicListGetListUi';
import { getListUi } from 'lightning/uiListApi';
import { formatGetListUiSObjects } from 'c/ldsUtils';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_TYPE_FIELD from '@salesforce/schema/Account.Type';
import ACCOUNT_PHONE_FIELD from '@salesforce/schema/Account.Phone';
import ACCOUNT_EMPLOYEES_FIELD from '@salesforce/schema/Account.NumberOfEmployees';
import { registerLdsTestWireAdapter } from '@salesforce/sfdx-lwc-jest';

const COLUMNS = [
    {
        label: 'Account Name',
        fieldName: ACCOUNT_NAME_FIELD.fieldApiName,
        type: 'text'
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

// Mock realistic data
const mockGetListUi = require('./data/getListUi.json');
const mockFormatGetListUiSObjects = require('./data/formatGetListUiSObjects.json');

// Register as an LDS wire adapter. Some tests verify the provisioned values trigger desired behavior.
const getListUiAdapter = registerLdsTestWireAdapter(getListUi);

// Mock ldsUtils
jest.mock('c/ldsUtils');

describe('c-basic-list-get-list-ui', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }

        // Prevent data saved on mocks from leaking between tests
        jest.clearAllMocks();
    });
    it('renders lightning-datatable when there is data', () => {
        // Create initial element
        const element = createElement('c-basic-list-get-list-ui', {
            is: BasicListGetListUi
        });
        document.body.appendChild(element);

        // Mock formatGetListUiSObjects return value
        formatGetListUiSObjects.mockReturnValue(mockFormatGetListUiSObjects);

        // Emit data from @wire
        getListUiAdapter.emit(mockGetListUi);

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve().then(() => {
            const datatableEl = element.shadowRoot.querySelector(
                'lightning-datatable'
            );
            expect(formatGetListUiSObjects).toHaveBeenCalledWith(mockGetListUi);
            expect(datatableEl).not.toBeNull();
            expect(datatableEl.data).toStrictEqual(mockFormatGetListUiSObjects);
            expect(datatableEl.columns).toStrictEqual(COLUMNS);
        });
    });

    it('renders error panel when there is error', () => {
        // Create initial element
        const element = createElement('c-basic-list-get-list-ui', {
            is: BasicListGetListUi
        });
        document.body.appendChild(element);

        // Emit data from @wire
        getListUiAdapter.error();

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
