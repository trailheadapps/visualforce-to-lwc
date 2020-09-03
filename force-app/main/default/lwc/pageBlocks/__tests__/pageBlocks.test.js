import { createElement } from 'lwc';
import PageBlocks from 'c/pageBlocks';

describe('c-page-block', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });
    it('displays lightning-accordion-sections A and B', () => {
        const element = createElement('c-page-blocks', {
            is: PageBlocks
        });
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const accordionEl = element.shadowRoot.querySelector(
                'lightning-accordion'
            );
            expect(accordionEl).not.toBeNull();
            expect(accordionEl.activeSectionName).toStrictEqual(['A', 'B']);
        });
    });

    it('is accessible', () => {
        const element = createElement('c-page-blocks', {
            is: PageBlocks
        });
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            expect(element).toBeAccessible();
        });
    });
});
