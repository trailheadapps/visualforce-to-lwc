import { createElement } from 'lwc';
import ListInfiniteScrolling from 'c/listInfiniteScrolling';
import { registerApexTestWireAdapter } from '@salesforce/sfdx-lwc-jest';
import getAccountsPaginated from '@salesforce/apex/PaginatedListControllerLwc.getAccountsPaginated';

const getAccountsPaginatedAdapter = registerApexTestWireAdapter(
    getAccountsPaginated
);

const mockGetAccountsPaginatedRecords = require('./data/mockGetAccountsPaginatedRecords.json');

describe('c-list-infinite-scrolling', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('displays a data table when records is true', () => {
        const element = createElement('c-list-infinite-scrolling', {
            is: ListInfiniteScrolling
        });
        document.body.appendChild(element);
        getAccountsPaginatedAdapter.emit(mockGetAccountsPaginatedRecords);

        return Promise.resolve().then(() => {
            const dataTableEl = element.shadowRoot.querySelector(
                'lightning-datatable'
            );

            expect(dataTableEl).not.toBeNull();
            expect(dataTableEl.data).toEqual(
                mockGetAccountsPaginatedRecords.records
            );
        });
    });

    it('does not display a data table when @wire returns error', () => {
        const MESSAGE = 'Error with @wire';
        const element = createElement('c-list-infinite-scrolling', {
            is: ListInfiniteScrolling
        });
        document.body.appendChild(element);
        getAccountsPaginatedAdapter.error(MESSAGE);

        return Promise.resolve().then(() => {
            const errorPanelEl = element.shadowRoot.querySelector(
                'c-error-panel'
            );

            expect(errorPanelEl).not.toBeNull();
            expect(errorPanelEl.errors.body).toBe(MESSAGE);
        });
    });

    it('requests more data when scrolling reaches the bottom', () => {
        const element = createElement('c-list-infinite-scrolling', {
            is: ListInfiniteScrolling
        });
        document.body.appendChild(element);

        getAccountsPaginatedAdapter.emit(mockGetAccountsPaginatedRecords);

        return Promise.resolve()
            .then(() => {
                const dataTableEl = element.shadowRoot.querySelector(
                    'lightning-datatable'
                );

                expect(dataTableEl).not.toBeNull();
                expect(dataTableEl.data).toEqual(
                    mockGetAccountsPaginatedRecords.records
                );
                expect(
                    getAccountsPaginatedAdapter.getLastConfig().pageToken
                ).toBe(0);
            })
            .then(() => {
                // Toggle checkbox to show details
                const dataTableEl = element.shadowRoot.querySelector(
                    'lightning-datatable'
                );
                dataTableEl.dispatchEvent(new CustomEvent('loadmore'));
            })
            .then(() => {
                expect(
                    getAccountsPaginatedAdapter.getLastConfig().pageToken
                ).toBe(5);
            });
    });
});
