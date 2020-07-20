import { createElement } from 'lwc';
import EditableListWrapper from 'c/editableListWrapper';

// Mock inner component, as it calls Apex and crashes
jest.mock('../../editableList/editableList');

describe('c-editable-list-wrapper', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });
    it('shows inner component using c-example-wrapper', () => {
        // Create initial element
        const element = createElement('c-editable-list-wrapper', {
            is: EditableListWrapper
        });
        document.body.appendChild(element);

        const exampleEl = element.shadowRoot.querySelector('c-example-wrapper');
        expect(exampleEl).not.toBeNull();

        const innerEl = exampleEl.querySelector('c-editable-list');
        expect(innerEl).not.toBeNull();
    });
});
