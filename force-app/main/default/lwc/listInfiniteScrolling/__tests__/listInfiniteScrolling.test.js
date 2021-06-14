import { createElement } from 'lwc';
import ListInfiniteScrolling from 'c/listInfiniteScrolling';
import { registerApexTestWireAdapter } from '@salesforce/sfdx-lwc-jest';
import getAccountsPaginated from '@salesforce/apex/PaginatedListControllerLwc.getAccountsPaginated';

const getAccountsPaginatedAdapter =
    registerApexTestWireAdapter(getAccountsPaginated);

const mockGetAccountsPaginatedRecords = require('./data/mockGetAccountsPaginatedRecords.json');

describe('c-list-infinite-scrolling', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    // Helper function to wait until the microtask queue is empty.
    // Used to wait for asynchronous DOM updates.
    async function flushPromises() {
        return Promise.resolve();
    }

    it('displays a data table when records is true', async () => {
        const element = createElement('c-list-infinite-scrolling', {
            is: ListInfiniteScrolling
        });
        document.body.appendChild(element);
        getAccountsPaginatedAdapter.emit(mockGetAccountsPaginatedRecords);

        // Wait for any asynchronous DOM updates
        await flushPromises();

        const dataTableEl = element.shadowRoot.querySelector(
            'lightning-datatable'
        );

        expect(dataTableEl).not.toBeNull();
        expect(dataTableEl.data).toEqual(
            mockGetAccountsPaginatedRecords.records
        );
    });

    it('displays the error panel when @wire returns error', async () => {
        const MESSAGE = 'Error with @wire';
        const element = createElement('c-list-infinite-scrolling', {
            is: ListInfiniteScrolling
        });
        document.body.appendChild(element);
        getAccountsPaginatedAdapter.error(MESSAGE);

        // Wait for any asynchronous DOM updates
        await flushPromises();

        const errorPanelEl = element.shadowRoot.querySelector('c-error-panel');

        expect(errorPanelEl).not.toBeNull();
        expect(errorPanelEl.errors.body).toBe(MESSAGE);
    });

    it('does not display a data table when @wire returns error', async () => {
        const element = createElement('c-list-infinite-scrolling', {
            is: ListInfiniteScrolling
        });
        document.body.appendChild(element);
        getAccountsPaginatedAdapter.error();

        // Wait for any asynchronous DOM updates
        await flushPromises();

        const dataTableEl = element.shadowRoot.querySelector(
            'lightning-datatable'
        );

        expect(dataTableEl).toBeNull();
    });

    it('requests more data when scrolling reaches the bottom', async () => {
        const element = createElement('c-list-infinite-scrolling', {
            is: ListInfiniteScrolling
        });
        document.body.appendChild(element);

        getAccountsPaginatedAdapter.emit(mockGetAccountsPaginatedRecords);

        // Wait for any asynchronous DOM updates
        await flushPromises();

        const dataTableEl = element.shadowRoot.querySelector(
            'lightning-datatable'
        );

        expect(dataTableEl).not.toBeNull();
        expect(dataTableEl.data).toEqual(
            mockGetAccountsPaginatedRecords.records
        );
        expect(getAccountsPaginatedAdapter.getLastConfig().pageToken).toBe(0);

        dataTableEl.dispatchEvent(new CustomEvent('loadmore'));

        // Wait for any asynchronous DOM updates
        await flushPromises();

        expect(getAccountsPaginatedAdapter.getLastConfig().pageToken).toBe(5);
    });

    it('is accessible when data is returned', async () => {
        const element = createElement('c-list-infinite-scrolling', {
            is: ListInfiniteScrolling
        });

        document.body.appendChild(element);

        getAccountsPaginatedAdapter.emit(mockGetAccountsPaginatedRecords);

        // Wait for any asynchronous DOM updates
        await flushPromises();

        await expect(element).toBeAccessible();
    });

    it('is accessible when error is returned', async () => {
        const element = createElement('c-list-infinite-scrolling', {
            is: ListInfiniteScrolling
        });

        document.body.appendChild(element);

        getAccountsPaginatedAdapter.error();

        // Wait for any asynchronous DOM updates
        await flushPromises();

        await expect(element).toBeAccessible();
    });
});
