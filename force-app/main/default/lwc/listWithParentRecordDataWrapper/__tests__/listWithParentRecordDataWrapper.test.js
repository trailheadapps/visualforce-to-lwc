import { createElement } from 'lwc';
import ListWithParentRecordDataWrapper from 'c/listWithParentRecordDataWrapper';

jest.mock('../../listWithParentRecordData/listWithParentRecordData');

describe('c-list-with-parent-record-data-wrapper', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });
    it('shows inner component using c-example-wrapper', () => {
        // Create initial element
        const element = createElement(
            'c-list-with-parent-record-data-wrapper',
            {
                is: ListWithParentRecordDataWrapper
            }
        );
        document.body.appendChild(element);

        const exampleEl = element.shadowRoot.querySelector('c-example-wrapper');
        expect(exampleEl).not.toBeNull();

        const innerEl = exampleEl.querySelector(
            'c-list-with-parent-record-data'
        );
        expect(innerEl).not.toBeNull();
    });

    it('is accessible', () => {
        const element = createElement(
            'c-list-with-parent-record-data-wrapper',
            {
                is: ListWithParentRecordDataWrapper
            }
        );

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            expect(element).toBeAccessible();
        });
    });
});
