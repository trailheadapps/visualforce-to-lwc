import { createElement } from 'lwc';
import PageBlocks from 'c/pageBlocks';

describe('c-page-block', () => {
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

    it('displays lightning-accordion-sections A and B', async () => {
        const element = createElement('c-page-blocks', {
            is: PageBlocks
        });
        document.body.appendChild(element);

        // Wait for any asynchronous DOM updates
        await flushPromises();

        const accordionEl = element.shadowRoot.querySelector(
            'lightning-accordion'
        );
        expect(accordionEl).not.toBeNull();
        expect(accordionEl.activeSectionName).toStrictEqual(['A', 'B']);
    });

    it('is accessible', async () => {
        const element = createElement('c-page-blocks', {
            is: PageBlocks
        });
        document.body.appendChild(element);

        await expect(element).toBeAccessible();
    });
});
