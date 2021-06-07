import { createElement } from 'lwc';
import EditRecordWrapper from 'c/editRecordWrapper';

// Mock exampleWrapper component so that accessibility tests don't expect the visualforce iframe to load
jest.mock('../../exampleWrapper/exampleWrapper');

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

        const exampleEl = element.shadowRoot.querySelector('c-example-wrapper');
        expect(exampleEl).not.toBeNull();
        expect(exampleEl.recordId).toBe(RECORD_ID);

        const innerEl = exampleEl.querySelector('c-edit-record');
        expect(innerEl).not.toBeNull();
        expect(innerEl.recordId).toBe(RECORD_ID);
    });

    it('is accessible', async () => {
        const element = createElement('c-edit-record-wrapper', {
            is: EditRecordWrapper
        });

        document.body.appendChild(element);

        await expect(element).toBeAccessible();
    });
});
