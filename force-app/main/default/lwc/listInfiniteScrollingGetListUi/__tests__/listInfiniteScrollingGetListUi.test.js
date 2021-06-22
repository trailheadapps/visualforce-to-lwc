import { createElement } from 'lwc';
import ListInfiniteScrollingGetListUi from 'c/listInfiniteScrollingGetListUi';
import { getListUi } from 'lightning/uiListApi';
import { formatGetListUiSObjects } from 'c/ldsUtils';

const mockGetAccountData = require('./data/mockGetAccountData.json');

describe('c-list-infinite-scrolling-get-list-ui', () => {
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

    it('displays a data table when records is true', async () => {
        // Create element
        const element = createElement('c-list-infinite-scrolling-get-list-ui', {
            is: ListInfiniteScrollingGetListUi
        });
        document.body.appendChild(element);

        // Mock returned data
        getListUi.emit(mockGetAccountData);

        // Wait for any asynchronous DOM updates
        await flushPromises();

        const dataTableEl = element.shadowRoot.querySelector(
            'lightning-datatable'
        );
        expect(dataTableEl.data).toEqual(
            formatGetListUiSObjects(mockGetAccountData)
        );
    });

    it('displays an error when the error variable is set', async () => {
        const MESSAGE = 'Error retrieving data';

        // Create element
        const element = createElement('c-list-infinite-scrolling-get-list-ui', {
            is: ListInfiniteScrollingGetListUi
        });
        document.body.appendChild(element);

        // Emit error from wire adapter
        getListUi.error(MESSAGE);

        // Wait for any asynchronous DOM updates
        await flushPromises();

        const errorPanelEl = element.shadowRoot.querySelector('c-error-panel');
        expect(errorPanelEl.errors.body).toBe(MESSAGE);
    });

    it('requests more data when scrolling reaches the bottom', async () => {
        const element = createElement('c-list-infinite-scrolling-get-list-ui', {
            is: ListInfiniteScrollingGetListUi
        });
        document.body.appendChild(element);

        // Wait for any asynchronous DOM updates
        await flushPromises();

        const dataTableEl = element.shadowRoot.querySelector(
            'lightning-datatable'
        );

        expect(dataTableEl).not.toBeNull();
        expect(getListUi.getLastConfig().pageToken).toBe(0);

        dataTableEl.dispatchEvent(new CustomEvent('loadmore'));

        // Wait for any asynchronous DOM updates
        await flushPromises();
        // If the scroll worked, our new pageToken should have updated from
        // 0 to 5.
        expect(getListUi.getLastConfig().pageToken).toBe(5);
    });

    it('is accessible when data is returned', async () => {
        // Create element
        const element = createElement('c-list-infinite-scrolling-get-list-ui', {
            is: ListInfiniteScrollingGetListUi
        });
        document.body.appendChild(element);

        // Mock returned data
        getListUi.emit(mockGetAccountData);

        // Wait for any asynchronous DOM updates
        await flushPromises();

        await expect(element).toBeAccessible();
    });

    it('is accessible when error is returned', async () => {
        const MESSAGE = 'Error retrieving data';

        // Create element
        const element = createElement('c-list-infinite-scrolling-get-list-ui', {
            is: ListInfiniteScrollingGetListUi
        });
        document.body.appendChild(element);

        // Emit error from wire adapter
        getListUi.error(MESSAGE);

        // Wait for any asynchronous DOM updates
        await flushPromises();

        await expect(element).toBeAccessible();
    });
});
