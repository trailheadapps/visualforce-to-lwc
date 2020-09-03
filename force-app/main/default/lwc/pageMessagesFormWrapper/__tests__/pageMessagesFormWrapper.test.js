import { createElement } from 'lwc';
import PageMessagesFormWrapper from 'c/pageMessagesFormWrapper';

describe('c-page-messages-form-wrapper', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('shows inner component using c-example-wrapper', () => {
        // Create initial element
        const element = createElement('c-page-messages-form-wrapper', {
            is: PageMessagesFormWrapper
        });
        document.body.appendChild(element);

        const exampleEl = element.shadowRoot.querySelector('c-example-wrapper');
        expect(exampleEl).not.toBeNull();

        const innerEl = exampleEl.querySelector('c-page-messages-form');
        expect(innerEl).not.toBeNull();
    });

    it('is accessible', () => {
        const element = createElement('c-page-messages-form-wrapper', {
            is: PageMessagesFormWrapper
        });

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            expect(element).toBeAccessible();
        });
    });
});
