import { createElement } from 'lwc';
import PaginatedList from 'c/paginatedList';
import getAccountsPaginated from '@salesforce/apex/PaginatedListControllerLwc.getAccountsPaginated';

const mockGetAccountData = require('./data/mockGetAccountData.json');

const COLUMNS = [
    {
        label: 'Account Name',
        fieldName: 'Name',
        type: 'text'
    },
    { label: 'Type', fieldName: 'Type', type: 'text' },
    {
        label: 'Phone',
        fieldName: 'Type',
        type: 'phone'
    },
    {
        label: 'Employees',
        fieldName: 'NumberOfEmployees',
        type: 'number'
    }
];

// Mock  Apex wire adapter
jest.mock(
    '@salesforce/apex/PaginatedListControllerLwc.getAccountsPaginated',
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

describe('c-paginated-list', () => {
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

    it('renders table with records fetched from wire', async () => {
        // Create initial element
        const element = createElement('c-paginated-list', {
            is: PaginatedList
        });
        document.body.appendChild(element);

        // Emit mock data
        getAccountsPaginated.emit(mockGetAccountData);

        // Wait for any asynchronous DOM updates
        await flushPromises();

        // Check that datatable contains the right data
        const datatableEl = element.shadowRoot.querySelector(
            'lightning-datatable'
        );
        expect(datatableEl).not.toBeNull();
        expect(datatableEl.data).toStrictEqual(mockGetAccountData.records);
        expect(datatableEl.columns).toStrictEqual(COLUMNS);
    });

    it('disables next button on last page', async () => {
        // Create initial element
        const element = createElement('c-paginated-list', {
            is: PaginatedList
        });
        document.body.appendChild(element);

        // Emit mock data that simulates last page
        delete mockGetAccountData.nextPageToken;
        getAccountsPaginated.emit(mockGetAccountData);

        // Wait for any asynchronous DOM updates
        await flushPromises();

        // Check that datatable contains the right data
        const paginatorEl = element.shadowRoot.querySelector('c-paginator');
        expect(paginatorEl.nextButtonDisabled).toBeTruthy();
    });

    it('disables previous button on first page', async () => {
        // Create initial element
        const element = createElement('c-paginated-list', {
            is: PaginatedList
        });
        document.body.appendChild(element);

        // Emit mock data
        getAccountsPaginated.emit(mockGetAccountData);

        // Wait for any asynchronous DOM updates
        await flushPromises();

        // Check that datatable contains the right data
        const paginatorEl = element.shadowRoot.querySelector('c-paginator');
        expect(paginatorEl.previousButtonDisabled).toBeTruthy();
    });

    it('requests next page when next button is clicked', async () => {
        const NEXT_PAGE_TOKEN = 5;

        // Create initial element
        const element = createElement('c-paginated-list', {
            is: PaginatedList
        });
        document.body.appendChild(element);

        // Emit mock data
        mockGetAccountData.nextPageToken = NEXT_PAGE_TOKEN;
        getAccountsPaginated.emit(mockGetAccountData);

        // Wait for any asynchronous DOM updates
        await flushPromises();

        // Request next page
        const paginatorEl = element.shadowRoot.querySelector('c-paginator');
        paginatorEl.dispatchEvent(new CustomEvent('next'));

        // Wait for any asynchronous DOM updates
        await flushPromises();

        // Check that wire was called to retrieve next page
        expect(getAccountsPaginated.getLastConfig().pageToken).toBe(
            NEXT_PAGE_TOKEN
        );
    });

    it('requests previous page when previous button is clicked', async () => {
        // Create initial element
        const element = createElement('c-paginated-list', {
            is: PaginatedList
        });
        document.body.appendChild(element);

        // Emit mock data
        getAccountsPaginated.emit(mockGetAccountData);

        // Wait for any asynchronous DOM updates
        await flushPromises();

        // Request previous page
        const paginatorEl = element.shadowRoot.querySelector('c-paginator');
        paginatorEl.dispatchEvent(new CustomEvent('previous'));

        // Wait for any asynchronous DOM updates
        await flushPromises();

        // Check that wire was called to retrieve previous page
        expect(getAccountsPaginated.getLastConfig().pageToken).toBe(-5);
    });

    it('renders error panel when wire emits error', async () => {
        const ERROR = { message: 'An error message' };

        // Create initial element
        const element = createElement('c-paginated-list', {
            is: PaginatedList
        });
        document.body.appendChild(element);

        // Emit error from @wire
        getAccountsPaginated.error(ERROR);

        // Wait for any asynchronous DOM updates
        await flushPromises();

        const errorPanelEl = element.shadowRoot.querySelector('c-error-panel');
        expect(errorPanelEl).not.toBeNull();
        expect(errorPanelEl.errors.body).toStrictEqual(ERROR);
    });

    it('is accessible when data is returned', async () => {
        // Create initial element
        const element = createElement('c-paginated-list', {
            is: PaginatedList
        });
        document.body.appendChild(element);

        // Emit mock data
        getAccountsPaginated.emit(mockGetAccountData);

        // Wait for any asynchronous DOM updates
        await flushPromises();

        await expect(element).toBeAccessible();
    });

    it('is accessible when error is returned', async () => {
        const ERROR = { message: 'An error message' };

        // Create initial element
        const element = createElement('c-paginated-list', {
            is: PaginatedList
        });
        document.body.appendChild(element);

        // Emit error from @wire
        getAccountsPaginated.error(ERROR);

        // Wait for any asynchronous DOM updates
        await flushPromises();

        await expect(element).toBeAccessible();
    });
});
