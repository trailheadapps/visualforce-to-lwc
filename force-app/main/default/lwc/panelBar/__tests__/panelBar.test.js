import { createElement } from 'lwc';
import PanelBar from 'c/panelBar';

describe('c-panel-bar', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('is accessible', () => {
        const element = createElement('c-panel-bar', {
            is: PanelBar
        });
        document.body.appendChild(element);

        return Promise.resolve().then(() => expect(element).toBeAccessible());
    });
});
