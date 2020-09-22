import { createElement } from 'lwc';
import ViewRecordWithParentRecordDataWrapper from 'c/viewRecordWithParentRecordDataWrapper';

const RECORD_ID = '0019A00000E8zAWQAZ';

// Mock exampleWrapper component so that accessibility tests don't expect the visualforce iframe to load
jest.mock('../../exampleWrapper/exampleWrapper');

describe('c-view-record-with-parent-record-data-wrapper', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('passes recordId to c-example-wrapper component', () => {
        // Create initial element
        const element = createElement(
            'c-view-record-with-parent-record-data-wrapper',
            {
                is: ViewRecordWithParentRecordDataWrapper
            }
        );
        element.recordId = RECORD_ID;
        document.body.appendChild(element);

        // Verify example component exists, and that recordId is passed to its attribute

        const exampleEl = element.shadowRoot.querySelector('c-example-wrapper');
        expect(exampleEl).not.toBeNull();
        expect(exampleEl.recordId).toBe(RECORD_ID);
    });

    it('passes recordId to c-view-record-with-parent-data component', () => {
        // Create initial element
        const element = createElement(
            'c-view-record-with-parent-record-data-wrapper',
            {
                is: ViewRecordWithParentRecordDataWrapper
            }
        );
        element.recordId = RECORD_ID;
        document.body.appendChild(element);

        // Verify c-view-record-with-parent-record-data component exists, and that recordId is passed to its attribute
        const exampleEl = element.shadowRoot.querySelector('c-example-wrapper');
        expect(exampleEl).not.toBeNull();

        const innerEl = exampleEl.querySelector(
            'c-view-record-with-parent-record-data'
        );
        expect(innerEl).not.toBeNull();
        expect(innerEl.recordId).toBe(RECORD_ID);
    });

    it('is accessible', () => {
        const element = createElement(
            'c-view-record-with-parent-record-data-wrapper',
            {
                is: ViewRecordWithParentRecordDataWrapper
            }
        );

        document.body.appendChild(element);

        return Promise.resolve().then(() => expect(element).toBeAccessible());
    });
});
