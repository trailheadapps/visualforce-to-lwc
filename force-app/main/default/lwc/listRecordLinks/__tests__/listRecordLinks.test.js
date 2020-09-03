import { createElement } from 'lwc';
import ListRecordLinks from 'c/listRecordLinks';
import { registerApexTestWireAdapter } from '@salesforce/sfdx-lwc-jest';
import getAccounts from '@salesforce/apex/ListWithParentRecordDataControllerLwc.getAccounts';

const getAccountsAdapter = registerApexTestWireAdapter(getAccounts);
const mockAccountData = require('./data/mockAccountData.json');

describe('c-list-record-links', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        // Prevent data saved on mocks from leaking between tests
        jest.clearAllMocks();
    });

    it('is accessible', () => {
        const element = createElement('c-list-record-links', {
            is: ListRecordLinks
        });
        document.body.appendChild(element);

        getAccountsAdapter.emit(mockAccountData);

        return Promise.resolve().then(() => {
            expect(element).toBeAccessible();
        });
    });
});
