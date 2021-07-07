import { createElement } from 'lwc';
import BeforeRenderHook from 'c/beforeRenderHook';

describe('c-before-render-hook', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('displays courses when connected', async () => {
        const element = createElement('c-before-render-hook', {
            is: BeforeRenderHook
        });
        document.body.appendChild(element);

        const pEls = element.shadowRoot.querySelectorAll('p');
        expect(pEls.length).toBe(3);
    });

    it('is accessible', async () => {
        const element = createElement('c-before-render-hook', {
            is: BeforeRenderHook
        });
        document.body.appendChild(element);

        await expect(element).toBeAccessible();
    });
});
