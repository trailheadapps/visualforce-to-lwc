import { createElement } from 'lwc';
import AfterRenderHook from 'c/afterRenderHook';

describe('c-after-render-hook', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    // Helper function to wait until the microtask queue is empty.
    async function flushPromises() {
        return Promise.resolve();
    }

    it('does not display courses when connected', async () => {
        const element = createElement('c-after-render-hook', {
            is: AfterRenderHook
        });
        document.body.appendChild(element);

        const pEls = element.shadowRoot.querySelectorAll('p');
        expect(pEls.length).toBe(0);
    });

    it('displays courses after render', async () => {
        const element = createElement('c-after-render-hook', {
            is: AfterRenderHook
        });
        document.body.appendChild(element);

        // Wait for any asynchronous DOM updates
        await flushPromises();

        const pEls = element.shadowRoot.querySelectorAll('p');
        expect(pEls.length).toBe(3);
    });

    it('is accessible', async () => {
        const element = createElement('c-after-render-hook', {
            is: AfterRenderHook
        });
        document.body.appendChild(element);

        await expect(element).toBeAccessible();
    });
});
