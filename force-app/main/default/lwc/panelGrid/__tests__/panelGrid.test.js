import { createElement } from 'lwc';
import PanelGrid from 'c/panelGrid';

describe('c-panel-grid', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('is accessible', async () => {
        const element = createElement('c-panel-grid', {
            is: PanelGrid
        });
        document.body.appendChild(element);

        await expect(element).toBeAccessible();
    });
});
