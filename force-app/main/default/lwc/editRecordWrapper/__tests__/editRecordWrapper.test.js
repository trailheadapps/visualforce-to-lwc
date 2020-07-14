import { createElement } from 'lwc';
import EditRecordWrapper from 'c/editRecordWrapper';

describe('c-edit-record-wrapper', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('shows inner component using c-example-wrapper', () => {
        const RECORD_ID = '0019A00000E8zAWQAZ';
        // Create initial element
        const element = createElement('c-edit-record-wrapper', {
            is: EditRecordWrapper
        });
        element.recordId = RECORD_ID;
        document.body.appendChild(element);

        const exampleCmp = element.shadowRoot.querySelector(
            'c-example-wrapper'
        );
        expect(exampleCmp).not.toBeNull();
        expect(exampleCmp.recordId).toBe(RECORD_ID);

        const innerCmp = exampleCmp.querySelector('c-edit-record');
        expect(innerCmp).not.toBeNull();
        expect(innerCmp.recordId).toBe(RECORD_ID);
    });
});
