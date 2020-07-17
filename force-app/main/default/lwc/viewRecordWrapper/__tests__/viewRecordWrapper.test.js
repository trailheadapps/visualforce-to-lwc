import { createElement } from 'lwc';
import ViewRecordWrapper from 'c/viewRecordWrapper';

const RECORD_ID = '0019A00000E8zAWQAZ';

describe('c-view-record-wrapper', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('passes recordId to c-example-wrapper component c-view-record component with correct recordId value', () => {
        // Create initial element
        const element = createElement('c-view-record-wrapper', {
            is: ViewRecordWrapper
        });
        element.recordId = RECORD_ID;
        document.body.appendChild(element);

        // Verify required child components are present on render.
        const exampleEl = element.shadowRoot.querySelector('c-example-wrapper');
        expect(exampleEl).not.toBeNull();
        expect(exampleEl.recordId).toBe(RECORD_ID);
    });

    it('passes recordId to c-view-record component', () => {
        // Create initial element
        const element = createElement('c-view-record-wrapper', {
            is: ViewRecordWrapper
        });
        element.recordId = RECORD_ID;
        document.body.appendChild(element);
        const viewRecordEl = element.shadowRoot.querySelector(
            'c-example-wrapper > c-view-record'
        );
        expect(viewRecordEl).not.toBeNull();
        expect(viewRecordEl.recordId).toBe(RECORD_ID);
    });
});
