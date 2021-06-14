import { createElement } from 'lwc';
import PageMessagesDataRetrieval from 'c/pageMessagesDataRetrieval';
import { registerApexTestWireAdapter } from '@salesforce/sfdx-lwc-jest';
import getAccounts from '@salesforce/apex/PageMessagesDataRetrievalControllerLwc.getAccounts';

const getAccountsAdapter = registerApexTestWireAdapter(getAccounts);

describe('c-page-messages-data-retrieval', () => {
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

    it('displays the account.errors in an error panel when accounts.error is true', async () => {
        const element = createElement('c-page-messages-data-retrieval', {
            is: PageMessagesDataRetrieval
        });
        document.body.appendChild(element);

        getAccountsAdapter.error('Error Message');

        // Wait for any asynchronous DOM updates
        await flushPromises();

        const errorPanelEl = element.shadowRoot.querySelector('c-error-panel');
        expect(errorPanelEl).not.toBeNull();
        expect(errorPanelEl.errors).toStrictEqual({
            body: 'Error Message',
            ok: false,
            status: 400,
            statusText: 'Bad Request'
        });
    });

    it('displays the account.data in a sub-template when accounts.data is true', async () => {
        const element = createElement('c-page-messages-data-retrieval', {
            is: PageMessagesDataRetrieval
        });
        document.body.appendChild(element);

        getAccountsAdapter.emit({ data: 'hello world' });

        // Wait for any asynchronous DOM updates
        await flushPromises();

        const paragraphEl = element.shadowRoot.querySelector('p');
        expect(paragraphEl).not.toBeNull();
        expect(paragraphEl.textContent).not.toBeNull();
    });

    it('is accessible when data is returned', async () => {
        const element = createElement('c-page-messages-data-retrieval', {
            is: PageMessagesDataRetrieval
        });

        document.body.appendChild(element);

        getAccountsAdapter.emit({ data: 'hello world' });

        // Wait for any asynchronous DOM updates
        await flushPromises();

        await expect(element).toBeAccessible();
    });

    it('is accessible when error is returned', async () => {
        const element = createElement('c-page-messages-data-retrieval', {
            is: PageMessagesDataRetrieval
        });

        document.body.appendChild(element);

        getAccountsAdapter.error('Error Message');

        // Wait for any asynchronous DOM updates
        await flushPromises();

        await expect(element).toBeAccessible();
    });
});
