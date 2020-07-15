import { createElement } from 'lwc';
import PanelBar from 'c/panelBar';

describe('c-panel-bar', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders c-panel-bar component', () => {
        const element = createElement('c-panel-bar', {
            is: PanelBar
        });
        document.body.appendChild(element);

        //check if lightning accordion exists
        const lightningAccordionEl = element.shadowRoot.querySelector(
            'lightning-accordion'
        );
        expect(lightningAccordionEl).not.toBeNull();

        // check if the accordion sections are present with relevant text contents
        const lightningAccordionSectionEls = element.shadowRoot.querySelectorAll(
            'lightning-accordion-section'
        );
        expect(lightningAccordionSectionEls.length).toBe(3);

        expect(lightningAccordionSectionEls[0].name).toBe('AnnaPerez');
        expect(lightningAccordionSectionEls[0].label).toBe('Anna Perez');
        expect(lightningAccordionSectionEls[0].textContent).toBe('London, UK.');

        expect(lightningAccordionSectionEls[1].name).toBe('MarkKingston');
        expect(lightningAccordionSectionEls[1].label).toBe('Mark Kingston');
        expect(lightningAccordionSectionEls[1].textContent).toBe(
            'Madrid, Spain.'
        );

        expect(lightningAccordionSectionEls[2].name).toBe('TomDavis');
        expect(lightningAccordionSectionEls[2].label).toBe('Tom Davis');
        expect(lightningAccordionSectionEls[2].textContent).toBe(
            'San Francisco, USA.'
        );
    });
});
