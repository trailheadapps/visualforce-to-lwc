import { createElement } from 'lwc';
import ListWithParentRecordData from 'c/listWithParentRecordData';
import { registerApexTestWireAdapter } from '@salesforce/sfdx-lwc-jest';
import getAccounts from '@salesforce/apex/ListWithParentRecordDataControllerLwc.getAccounts';

const getAccountsAdapter = registerApexTestWireAdapter(getAccounts);
const mockAccountData = require('./data/mockAccountData.json');

describe('c-list-with-parent-record-data', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        // Prevent data saved on mocks from leaking between tests
        jest.clearAllMocks();
    });

    it('Does not render a datatable when the wire service returns nothing.', () => {
        // Create initial element
        const element = createElement('c-list-with-parent-record-data', {
            is: ListWithParentRecordData
        });
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const errorPanelEl = element.shadowRoot.querySelector(
                'c-error-panel'
            );
            expect(errorPanelEl).toBeNull();

            const dataTableEl = element.shadowRoot.querySelector(
                'lightning-datatable'
            );
            expect(dataTableEl).toBeNull();
        });
    });

    it('renders the error pannel when @wire returns an error', () => {
        // Create initial element
        const element = createElement('c-list-with-parent-record-data', {
            is: ListWithParentRecordData
        });
        document.body.appendChild(element);
        // By having this return an empty object, we're emulating a case where there are no accounts
        getAccountsAdapter.error();

        return Promise.resolve().then(() => {
            const errorPanelEl = element.shadowRoot.querySelector(
                'c-error-panel'
            );
            expect(errorPanelEl).not.toBeNull();

            const dataTableEl = element.shadowRoot.querySelector(
                'lightning-datatable'
            );
            expect(dataTableEl).toBeNull();
        });
    });

    it('renders the dataTable when account data is returned', () => {
        // Create initial element
        const element = createElement('c-list-with-parent-record-data', {
            is: ListWithParentRecordData
        });
        document.body.appendChild(element);
        getAccountsAdapter.emit(mockAccountData);

        return Promise.resolve().then(() => {
            const errorPanelEl = element.shadowRoot.querySelector(
                'c-error-panel'
            );
            expect(errorPanelEl).toBeNull();

            const dataTableEl = element.shadowRoot.querySelector(
                'lightning-datatable'
            );
            expect(dataTableEl).not.toBeNull();
            expect(dataTableEl.data).not.toBeNull();
            expect(dataTableEl.columns).toMatchObject([
                { label: 'Account Name', fieldName: 'Name', type: 'text' },
                { label: 'Type', fieldName: 'Type', type: 'text' },
                { label: 'Phone', fieldName: 'Phone', type: 'phone' },
                { label: 'Owner Name', fieldName: 'Owner.Name', type: 'text' }
            ]);
        });
    });
});
