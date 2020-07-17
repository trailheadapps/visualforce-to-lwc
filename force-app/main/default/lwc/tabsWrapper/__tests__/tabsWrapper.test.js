import { createElement } from 'lwc';
import TabsWrapper from 'c/tabsWrapper';

describe('c-tabs-wrapper', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('shows inner component using c-example-wrapper', () => {
        const element = createElement('c-tabs-wrapper', {
            is: TabsWrapper
        });
        document.body.appendChild(element);

        // Verify required child components are present on render.
        const exampleEl = element.shadowRoot.querySelector('c-example-wrapper');
        expect(exampleEl).not.toBeNull();

        const innerEl = exampleEl.querySelector('c-tabs');
        expect(innerEl).not.toBeNull();
    });
});
