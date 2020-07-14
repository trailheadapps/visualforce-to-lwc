import { createElement } from 'lwc';
import lightningActionLwc from 'c/lightningActionLwc';

describe('c-lightning-action-lwc', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('displays text', () => {
        //Create element
        const element = createElement('c-lightning-action-lwc', {
            is: lightningActionLwc
        });
        document.body.appendChild(element);

        //Verify that the Lightning Web Component has text
        const div = element.shadowRoot.querySelector('div');
        expect(div.textContent).toBe('This is a Lightning Web Component!');
    });
});
