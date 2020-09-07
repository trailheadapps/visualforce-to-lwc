import { createElement } from 'lwc';
import CreateRecordWithPrepopulatedValues from 'c/createRecordWithPrepopulatedValues';

describe('c-create-record-with-prepopulated-values', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('is accessible', () => {
        const element = createElement(
            'c-create-record-with-prepopulated-values',
            {
                is: CreateRecordWithPrepopulatedValues
            }
        );
        document.body.appendChild(element);

        return Promise.resolve().then(() => expect(element).toBeAccessible());
    });
});
