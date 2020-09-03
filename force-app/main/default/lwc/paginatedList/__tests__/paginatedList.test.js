import { createElement } from 'lwc';
import PaginatedList from 'c/paginatedList';
import getAccountsPaginated from '@salesforce/apex/PaginatedListControllerLwc.getAccountsPaginated';
import { registerLdsTestWireAdapter } from '@salesforce/sfdx-lwc-jest';

const getAccountsPaginatedAdapter = registerLdsTestWireAdapter(
    getAccountsPaginated
);

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

describe('c-paginated-list', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }

        jest.clearAllMocks();
    });

    it('renders table with records fetched from wire', () => {
        // Create initial element
        const element = createElement('c-paginated-list', {
            is: PaginatedList
        });
        document.body.appendChild(element);

        // Emit mock data
        getAccountsPaginatedAdapter.emit(mockGetAccountData);

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve().then(() => {
            // Check that datatable contains the right data
            const datatableEl = element.shadowRoot.querySelector(
                'lightning-datatable'
            );
            expect(datatableEl).not.toBeNull();
            expect(datatableEl.data).toStrictEqual(mockGetAccountData.records);
            expect(datatableEl.columns).toStrictEqual(COLUMNS);
        });
    });

    it('disables next button on last page', () => {
        // Create initial element
        const element = createElement('c-paginated-list', {
            is: PaginatedList
        });
        document.body.appendChild(element);

        // Emit mock data that simulates last page
        delete mockGetAccountData.nextPageToken;
        getAccountsPaginatedAdapter.emit(mockGetAccountData);

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve().then(() => {
            // Check that datatable contains the right data
            const paginatorEl = element.shadowRoot.querySelector('c-paginator');
            expect(paginatorEl.nextButtonDisabled).toBeTruthy();
        });
    });

    it('disables previous button on first page', () => {
        // Create initial element
        const element = createElement('c-paginated-list', {
            is: PaginatedList
        });
        document.body.appendChild(element);

        // Emit mock data
        getAccountsPaginatedAdapter.emit(mockGetAccountData);

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve().then(() => {
            // Check that datatable contains the right data
            const paginatorEl = element.shadowRoot.querySelector('c-paginator');
            expect(paginatorEl.previousButtonDisabled).toBeTruthy();
        });
    });

    it('requests next page when next button is clicked', () => {
        const NEXT_PAGE_TOKEN = 5;

        // Create initial element
        const element = createElement('c-paginated-list', {
            is: PaginatedList
        });
        document.body.appendChild(element);

        // Emit mock data
        mockGetAccountData.nextPageToken = NEXT_PAGE_TOKEN;
        getAccountsPaginatedAdapter.emit(mockGetAccountData);

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve()
            .then(() => {
                // Request next page
                const paginatorEl = element.shadowRoot.querySelector(
                    'c-paginator'
                );
                paginatorEl.dispatchEvent(new CustomEvent('next'));
            })
            .then(() => {
                // Check that wire was called to retrieve next page
                expect(
                    getAccountsPaginatedAdapter.getLastConfig().pageToken
                ).toBe(NEXT_PAGE_TOKEN);
            });
    });

    it('requests previous page when previous button is clicked', () => {
        // Create initial element
        const element = createElement('c-paginated-list', {
            is: PaginatedList
        });
        document.body.appendChild(element);

        // Emit mock data
        getAccountsPaginatedAdapter.emit(mockGetAccountData);

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve()
            .then(() => {
                // Request previous page
                const paginatorEl = element.shadowRoot.querySelector(
                    'c-paginator'
                );
                paginatorEl.dispatchEvent(new CustomEvent('previous'));
            })
            .then(() => {
                // Check that wire was called to retrieve previous page
                expect(
                    getAccountsPaginatedAdapter.getLastConfig().pageToken
                ).toBe(-5);
            });
    });

    it('renders error panel when wire emits error', () => {
        const ERROR = { message: 'An error message' };

        // Create initial element
        const element = createElement('c-paginated-list', {
            is: PaginatedList
        });
        document.body.appendChild(element);

        // Emit error from @wire
        getAccountsPaginatedAdapter.error(ERROR);

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve().then(() => {
            const errorPanelEl = element.shadowRoot.querySelector(
                'c-error-panel'
            );
            expect(errorPanelEl).not.toBeNull();
            expect(errorPanelEl.errors.body).toStrictEqual(ERROR);
        });
    });

    it('is accessible', () => {
        const element = createElement('c-paginated-list', {
            is: PaginatedList
        });

        document.body.appendChild(element);

        return Promise.resolve().then(() => expect(element).toBeAccessible());
    });
});
