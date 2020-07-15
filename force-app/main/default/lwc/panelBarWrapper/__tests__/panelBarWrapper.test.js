import { createElement } from 'lwc';
import PanelBarWrapper from 'c/panelBarWrapper';

describe('c-panel-bar-wrapper', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders panel-bar-wrapper component', () => {
        const element = createElement('c-panel-bar-wrapper', {
            is: PanelBarWrapper
        });
        document.body.appendChild(element);

        //check if example Wrapper component exists
        const exampleWrapperEl = element.shadowRoot.querySelector(
            'c-example-wrapper'
        );
        expect(exampleWrapperEl).not.toBeNull();
        expect(exampleWrapperEl.iconName).toBe('custom:custom44');
        expect(exampleWrapperEl.lwc).toBe('panelBar');
        expect(exampleWrapperEl.title).toBe('Panel Bar');
        expect(exampleWrapperEl.visualforce).toBe('panelBar');
        expect(exampleWrapperEl.visualforceHeight).toBe('90px');

        // check if panel bar component exists
        const panelBarEl = element.shadowRoot.querySelector('c-panel-bar');
        expect(panelBarEl).not.toBeNull();
        expect(panelBarEl.slot).toBe('lwc');
    });
});
