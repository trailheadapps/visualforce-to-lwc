import { createElement } from 'lwc';
import NavigateToRecord from 'c/navigateToRecord';
import { getNavigateCalledWith } from 'lightning/navigation';

describe('c-navigate-to-record', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('navigates to record view by ID', () => {
        const element = createElement('c-navigate-to-record', {
            is: NavigateToRecord
        });
        element.label = 'foo';
        element.recordId = '0031700000pJRRTAA4';
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            // Get handle to anchor and fire click event
            const anchorEl = element.shadowRoot.querySelector('a');
            expect(anchorEl).not.toBeNull();
            anchorEl.click();

            const { pageReference } = getNavigateCalledWith();

            expect(pageReference.type).toEqual('standard__recordPage');
            expect(pageReference.attributes.recordId).toEqual(element.recordId);
            expect(pageReference.attributes.actionName).toEqual('view');
        });
    });

    it('creates an anchor element with the right label', () => {
        const element = createElement('c-navigate-to-record', {
            is: NavigateToRecord
        });
        element.label = 'foo';
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            // Get handle to anchor and fire click event
            const anchorEl = element.shadowRoot.querySelector('a');
            expect(anchorEl).not.toBeNull();
            expect(anchorEl.textContent).toEqual(element.label);
        });
    });

    it('is accessible', () => {
        const element = createElement('c-navigate-to-record', {
            is: NavigateToRecord
        });

        document.body.appendChild(element);

        return Promise.resolve().then(() => expect(element).toBeAccessible());
    });
});
