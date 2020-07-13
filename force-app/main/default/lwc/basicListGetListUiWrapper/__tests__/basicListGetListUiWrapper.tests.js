import { createElement } from 'lwc';
import BasicListGetListUiWrapper from 'c/basicListGetListUiWrapper';

// Mock inner component, as it uses a wire adapter and crashes
jest.mock('../../basicListGetListUi/basicListGetListUi', () =>
    require('../../basicListGetListUi/__mocks__/basicListGetListUi')
);

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

        const exampleCmp = element.shadowRoot.querySelector(
            'c-example-wrapper'
        );
        expect(exampleCmp).not.toBeNull();

        const innerCmp = exampleCmp.querySelector('c-basic-list-get-list-ui');
        expect(innerCmp).not.toBeNull();
    });
});
