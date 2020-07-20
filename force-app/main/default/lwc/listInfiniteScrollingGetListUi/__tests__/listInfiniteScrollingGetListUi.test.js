import { createElement } from 'lwc';
import ListInfiniteScrollingGetListUi from 'c/listInfiniteScrollingGetListUi';
import { registerLdsTestWireAdapter } from '@salesforce/sfdx-lwc-jest';
import { getListUi } from 'lightning/uiListApi';
import { formatGetListUiSObjects } from 'c/ldsUtils';

const getListUiAdapter = registerLdsTestWireAdapter(getListUi);

const mockGetAccountData = require('./data/mockGetAccountData.json');

describe('c-list-infinite-scrolling-get-list-ui', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }

        jest.clearAllMocks();
    });

    it('displays a data table when records is true', () => {
        // Create element
        const element = createElement('c-list-infinite-scrolling-get-list-ui', {
            is: ListInfiniteScrollingGetListUi
        });
        document.body.appendChild(element);

        // Verify that the data table exsists
        // and has our mock data
        getListUiAdapter.emit(mockGetAccountData);

        return Promise.resolve().then(() => {
            const dataTableEl = element.shadowRoot.querySelector(
                'lightning-datatable'
            );
            expect(dataTableEl.data).toEqual(
                formatGetListUiSObjects(mockGetAccountData)
            );
        });
    });

    it('displays an error when the error variable is set', () => {
        const MESSAGE = 'Error retrieving data';

        // Create element
        const element = createElement('c-list-infinite-scrolling-get-list-ui', {
            is: ListInfiniteScrollingGetListUi
        });
        document.body.appendChild(element);

        // Emit data from wire adapter
        getListUiAdapter.error(MESSAGE);

        return Promise.resolve().then(() => {
            const errorPanelEl = element.shadowRoot.querySelector(
                'c-error-panel'
            );
            expect(errorPanelEl.errors.body).toBe(MESSAGE);
        });
    });

    it('requests more data when scrolling reaches the bottom', () => {
        const element = createElement('c-list-infinite-scrolling-get-list-ui', {
            is: ListInfiniteScrollingGetListUi
        });
        document.body.appendChild(element);

        return Promise.resolve()
            .then(() => {
                const dataTableEl = element.shadowRoot.querySelector(
                    'lightning-datatable'
                );

                expect(dataTableEl).not.toBeNull();
                expect(getListUiAdapter.getLastConfig().pageToken).toBe(0);
            })
            .then(() => {
                // Run the event load more to simulate scrolling
                const dataTableEl = element.shadowRoot.querySelector(
                    'lightning-datatable'
                );
                dataTableEl.dispatchEvent(new CustomEvent('loadmore'));
            })
            .then(() => {
                // If the scroll worked, our new pageToken should have updated from
                // 0 to 5.
                expect(getListUiAdapter.getLastConfig().pageToken).toBe(5);
            });
    });
});
