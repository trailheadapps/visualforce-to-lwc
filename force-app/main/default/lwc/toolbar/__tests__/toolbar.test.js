import { createElement } from 'lwc';
import Toolbar from 'c/toolbar';

describe('c-toolbar', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('is accessible', () => {
        const element = createElement('c-toolbar', {
            is: Toolbar
        });
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            expect(element).toBeAccessible();
        });
    });
});
