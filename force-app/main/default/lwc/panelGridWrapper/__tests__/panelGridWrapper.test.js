import { createElement } from 'lwc';
import PanelGridWrapper from 'c/panelGridWrapper';

describe('c-panel-grid-wrapper', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders panel-grid-wrapper', () => {
        const element = createElement('c-panel-grid-wrapper', {
            is: PanelGridWrapper
        });
        document.body.appendChild(element);

        //check if example Wrapper component exists
        const exampleWrapperEl = element.shadowRoot.querySelector(
            'c-example-wrapper'
        );
        expect(exampleWrapperEl).not.toBeNull();

        // check if panel grid component exists
        const panelBarEl = exampleWrapperEl.querySelector('c-panel-grid');
        expect(panelBarEl).not.toBeNull();
    });
});
