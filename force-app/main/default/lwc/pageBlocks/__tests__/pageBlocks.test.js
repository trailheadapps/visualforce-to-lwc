import { createElement } from 'lwc';
import PageBlocks from 'c/pageBlocks';

describe('c-page-block', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('displays a lightning-card', () => {
        const element = createElement('c-page-blocks', {
            is: PageBlocks
        });
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const cardEl = element.shadowRoot.querySelector('lightning-card');
            expect(cardEl).not.toBeNull();
        });
    });
    it('displays a lightning-accordion', () => {
        const element = createElement('c-page-blocks', {
            is: PageBlocks
        });
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const accordionEl = element.shadowRoot.querySelector(
                'lightning-accordion'
            );
            expect(accordionEl).not.toBeNull();
        });
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

    it('displays 2 lighting-accordion-sections', () => {
        const element = createElement('c-page-blocks', {
            is: PageBlocks
        });
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const sectionEls = element.shadowRoot.querySelectorAll(
                'lightning-accordion-section'
            );
            expect(sectionEls.length).toBe(2);
            expect(sectionEls[0].name).toBe('A');
            expect(sectionEls[0].label).toBe('Contents');
            expect(sectionEls[1].name).toBe('B');
            expect(sectionEls[1].label).toBe('Instructors');
        });
    });
    it('displays 8 layout items with the proper size', () => {
        const element = createElement('c-page-blocks', {
            is: PageBlocks
        });
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const layoutItemEls = element.shadowRoot.querySelectorAll(
                'lightning-layout-item'
            );
            expect(layoutItemEls.length).toBe(8);
            layoutItemEls.forEach(function (value, index) {
                expect(layoutItemEls[index].size).toBe('6');
            });
        });
    });
});
