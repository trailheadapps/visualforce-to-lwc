import { createElement } from 'lwc';
import CreateMixedRecordsApexWrapper from 'c/createMixedRecordsApexWrapper';

describe('c-create-mixed-records-apex-wrapper', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });
    it('shows inner component using c-example-wrapper', () => {
        // Create initial element
        const element = createElement('c-create-mixed-records-apex-wrapper', {
            is: CreateMixedRecordsApexWrapper
        });
        document.body.appendChild(element);

        const exampleCmp = element.shadowRoot.querySelector(
            'c-example-wrapper'
        );
        expect(exampleCmp).not.toBeNull();

        const innerCmp = exampleCmp.querySelector(
            'c-create-mixed-records-apex'
        );
        expect(innerCmp).not.toBeNull();
    });
});
