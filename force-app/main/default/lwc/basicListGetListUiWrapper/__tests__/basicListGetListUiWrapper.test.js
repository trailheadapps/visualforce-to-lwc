import { createElement } from 'lwc';
import BasicListGetListUiWrapper from 'c/basicListGetListUiWrapper';

// Mock inner component, as it uses a wire adapter and crashes
jest.mock('../../basicListGetListUi/basicListGetListUi');

describe('c-basic-list-get-list-ui-wrapper', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });
    it('shows inner component using c-example-wrapper', () => {
        // Create initial element
        const element = createElement('c-basic-list-get-list-ui-wrapper', {
            is: BasicListGetListUiWrapper
        });
        document.body.appendChild(element);

        const exampleEl = element.shadowRoot.querySelector('c-example-wrapper');
        expect(exampleEl).not.toBeNull();

        const innerEl = exampleEl.querySelector('c-basic-list-get-list-ui');
        expect(innerEl).not.toBeNull();
    });

    it('is accessible', () => {
        const element = createElement('c-basic-list-get-list-ui-wrapper', {
            is: BasicListGetListUiWrapper
        });

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            expect(element).toBeAccessible();
        });
    });
});
