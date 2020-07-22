import { createElement } from 'lwc';
import PagePageMessagesDataRetrieval from 'c/pageMessagesDataRetrieval';
import { registerApexTestWireAdapter } from '@salesforce/sfdx-lwc-jest';
import getAccounts from '@salesforce/apex/PageMessagesDataRetrievalControllerLwc.getAccounts';

// Register as an LDS wire adapter. Some tests verify the provisioned values trigger desired behavior.
const getAccountsAdapter = registerApexTestWireAdapter(getAccounts);

describe('c-page-messages-data-retrieval', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('displays the account.errors in an error panel when accounts.error is true', () => {
        const ERROR_MESSAGE = 'Error Message';

        // Create initial element
        const element = createElement('c-page-messages-data-retrieval', {
            is: PagePageMessagesDataRetrieval
        });
        document.body.appendChild(element);

        // Emit error from @wire
        getAccountsAdapter.error(ERROR_MESSAGE);

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve().then(() => {
            const errorPanelEl = element.shadowRoot.querySelector(
                'c-error-panel'
            );
            expect(errorPanelEl).not.toBeNull();
            expect(errorPanelEl.errors.body).toBe(ERROR_MESSAGE);
        });
    });
});
