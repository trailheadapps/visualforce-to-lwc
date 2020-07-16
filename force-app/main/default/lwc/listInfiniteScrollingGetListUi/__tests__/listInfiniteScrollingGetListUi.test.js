import { createElement } from 'lwc';
import ListInfiniteScrollingGetListUi from 'c/listInfiniteScrollingGetListUi';
import { registerApexTestWireAdapter } from '@salesforce/sfdx-lwc-jest';
import getAccountsPaginated from '@salesforce/apex/PaginatedListControllerLwc.getAccountsPaginated';

const getAccountsPaginatedAdapter = registerApexTestWireAdapter(
    getAccountsPaginated
);
const mockAccountData = require('./data/mockAccountData.json');

describe('c-list-infinite-scrolling-get-list-ui', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('displays a data table when records is true', () => {
        // Create element
        const element = createElement('c-list-infinite-scrolling-get-list-ui', {
            is: ListInfiniteScrollingGetListUi
        });
        document.body.appendChild(element);

        // Verify that the data table exsists
        // and has our mock data
        getAccountsPaginatedAdapter.emit();

        return Promise.resolve().then(() => {
            const dataTableEl = element.shadowRoot.querySelector(
                'lightning-datatable'
            );
            expect(dataTableEl.data).toEqual(mockAccountData.records);
        });
    });

    /**it('triggers loadMoreData when the list is scrolled down', () => {
    // Create element
    const element = createElement('c-list-infinite-scrolling', {
        is: ListInfiniteScrolling
      });
      document.body.appendChild(element);

    // create a mock handler for loadMoreData
    expect(true);
  });**/

    it('displays an error when the error variable is set', () => {
        const MESSAGE = 'Error retrieving data';

        // Create element
        const element = createElement('c-list-infinite-scrolling-get-list-ui', {
            is: ListInfiniteScrollingGetListUi
        });
        document.body.appendChild(element);

        // Emit data from wire adapter
        getAccountsPaginatedAdapter.error(MESSAGE);

        return Promise.resolve().then(() => {
            const errorPanelEl = element.shadowRoot.querySelector(
                'c-error-panel'
            );
            expect(errorPanelEl.errors.body).toBe(MESSAGE);
        });
    });
});
