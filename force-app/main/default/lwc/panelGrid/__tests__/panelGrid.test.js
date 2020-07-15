import { createElement } from 'lwc';
import PanelGrid from 'c/panelGrid';

describe('c-panel-grid', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders panel-grid component', () => {
        const element = createElement('c-panel-grid', {
            is: PanelGrid
        });
        document.body.appendChild(element);

        //check if lightning-layout element exists
        const lightningLayoutEl = element.shadowRoot.querySelector(
            'lightning-layout'
        );
        expect(lightningLayoutEl).not.toBeNull();

        //check if lighnting-layout-items element exists
        const lightningLayoutItemsEls = element.shadowRoot.querySelectorAll(
            'lightning-layout-item'
        );
        expect(lightningLayoutItemsEls.length).toBe(4);
        // check for each element size
        lightningLayoutItemsEls.forEach((item) => {
            expect(item.size).toBe('6');
        });
        // check for the first lighnting-layout-item element
        const firstItemFormattedTextEl = lightningLayoutItemsEls[0].querySelector(
            'lightning-formatted-text'
        );
        expect(firstItemFormattedTextEl).not.toBeNull();
        expect(firstItemFormattedTextEl.value).toBe('London');

        // check for the second lighnting-layout-item element
        const secondItemFormattedTextEl = lightningLayoutItemsEls[1].querySelector(
            'lightning-formatted-text'
        );
        expect(secondItemFormattedTextEl).not.toBeNull();
        expect(secondItemFormattedTextEl.value).toBe('Madrid');

        // check for the third lighnting-layout-item element
        const thirdItemFormattedTextEls = lightningLayoutItemsEls[2].querySelectorAll(
            'lightning-formatted-text'
        );
        expect(thirdItemFormattedTextEls.length).toBe(2);
        expect(thirdItemFormattedTextEls[0].value).toBe('San Francisco');
        expect(thirdItemFormattedTextEls[1].value).toBe('Tokio');

        // check for the last lighnting-layout-item element
        const lastItemFormattedTextEl = lightningLayoutItemsEls[3].querySelector(
            'lightning-formatted-text'
        );
        expect(lastItemFormattedTextEl).not.toBeNull();
        expect(lastItemFormattedTextEl.value).toBe('Dublin');
    });
});
