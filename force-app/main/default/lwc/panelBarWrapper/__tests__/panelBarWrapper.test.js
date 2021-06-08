import { createElement } from 'lwc';
import PanelBarWrapper from 'c/panelBarWrapper';

// Mock exampleWrapper component so that accessibility tests don't expect the visualforce iframe to load
jest.mock('../../exampleWrapper/exampleWrapper');

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
        const exampleWrapperEl =
            element.shadowRoot.querySelector('c-example-wrapper');
        expect(exampleWrapperEl).not.toBeNull();

        // check if panel bar component exists
        const panelBarEl = exampleWrapperEl.querySelector('c-panel-bar');
        expect(panelBarEl).not.toBeNull();
    });

    it('is accessible', async () => {
        const element = createElement('c-panel-bar-wrapper', {
            is: PanelBarWrapper
        });

        document.body.appendChild(element);

        await expect(element).toBeAccessible();
    });
});
