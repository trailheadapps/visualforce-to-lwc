import { createElement } from 'lwc';
import PageMessagesDataRetrievalWrapper from 'c/pageMessagesDataRetrievalWrapper';

jest.mock('../../pageMessagesDataRetrieval/pageMessagesDataRetrieval');

describe('c-page-messages-data-retrieval-wrapper', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });
    it('shows inner component using c-example-wrapper', () => {
        // Create initial element
        const element = createElement(
            'c-page-messages-data-retrieval-wrapper',
            {
                is: PageMessagesDataRetrievalWrapper
            }
        );
        document.body.appendChild(element);

        const exampleEl = element.shadowRoot.querySelector('c-example-wrapper');
        expect(exampleEl).not.toBeNull();

        const innerEl = exampleEl.querySelector(
            'c-page-messages-data-retrieval'
        );
        expect(innerEl).not.toBeNull();
    });
});
