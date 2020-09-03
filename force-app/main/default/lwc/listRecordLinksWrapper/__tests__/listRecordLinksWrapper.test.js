import { createElement } from 'lwc';
import ListRecordLinksWrapper from 'c/listRecordLinksWrapper';

jest.mock('../../listRecordLinks/listRecordLinks');

describe('c-list-record-links-wrapper', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });
    it('shows inner component using c-example-wrapper', () => {
        // Create initial element
        const element = createElement('c-list-record-links-wrapper', {
            is: ListRecordLinksWrapper
        });
        document.body.appendChild(element);

        const exampleEl = element.shadowRoot.querySelector('c-example-wrapper');
        expect(exampleEl).not.toBeNull();

        const innerEl = exampleEl.querySelector('c-list-record-links');
        expect(innerEl).not.toBeNull();
    });
});
