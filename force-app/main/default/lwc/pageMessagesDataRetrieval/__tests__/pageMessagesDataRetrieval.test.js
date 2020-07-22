import { createElement } from 'lwc';
import PagePageMessagesDataRetrieval from 'c/pageMessagesDataRetrieval';
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

    it('displays the account.errors in an error panel when accounts.error is true', () => {
        const element = createElement('c-page-messages-data-retrieval', {
            is: PagePageMessagesDataRetrieval
        });
        document.body.appendChild(element);
        getAccountsAdapter.error('Error Message');
        return Promise.resolve().then(() => {
            const errorPanelEl = element.shadowRoot.querySelector(
                'c-error-panel'
            );
            expect(errorPanelEl).not.toBeNull();
            expect(errorPanelEl.errors).toStrictEqual({
                body: 'Error Message',
                ok: false,
                status: 400,
                statusText: 'Bad Request'
            });
        });
    });

    it('displays the account.data in a sub-template when accounts.data is true', () => {
        const element = createElement('c-page-messages-data-retrieval', {
            is: PagePageMessagesDataRetrieval
        });
        document.body.appendChild(element);
        getAccountsAdapter.emit({ data: 'hello world' });
        return Promise.resolve().then(() => {
            const paragraphEl = element.shadowRoot.querySelector('p');
            expect(paragraphEl).not.toBeNull();
            expect(paragraphEl.textContent).not.toBeNull();
        });
    });
});
