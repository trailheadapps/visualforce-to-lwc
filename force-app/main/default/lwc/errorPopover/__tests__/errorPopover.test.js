import { createElement } from 'lwc';
import ErrorPopover from 'c/errorPopover';

describe('c-error-popover', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders c-error-popover element', () => {
        const ERROR_MESSAGE_INPUT = 'Friendly Error Message';

        const element = createElement('c-error-popover', {
            is: ErrorPopover
        });
        element.errors = ERROR_MESSAGE_INPUT;
        document.body.appendChild(element);

        // Check for errors in body
        const popoverDivEl = element.shadowRoot.querySelector(
            '.slds-var-popover__body'
        );
        expect(popoverDivEl.textContent).toBe(ERROR_MESSAGE_INPUT);
    });

    it('hides dialog when close button is clicked', () => {
        const ERROR_MESSAGE_INPUT = 'Friendly Error Message';

        const element = createElement('c-error-popover', {
            is: ErrorPopover
        });
        element.errors = ERROR_MESSAGE_INPUT;
        document.body.appendChild(element);

        // click lightning button element
        element.shadowRoot.querySelector('lightning-button-icon').click();

        return Promise.resolve().then(() => {
            // check that the section is not rendered once close dialog button is clicked.
            const reRenderedSectionEl = element.shadowRoot.querySelector(
                'section'
            );
            expect(reRenderedSectionEl).toBeNull();
        });
    });

    it('toggles c-error-popover', () => {
        const ERROR_MESSAGE_INPUT = 'Friendly Error Message';

        const element = createElement('c-error-popover', {
            is: ErrorPopover
        });
        element.errors = ERROR_MESSAGE_INPUT;
        document.body.appendChild(element);

        element.toggle();

        return Promise.resolve().then(() => {
            // check that the section that previously rendered no more renders once toggled.
            const reRenderedSectionEl = element.shadowRoot.querySelector(
                'section'
            );
            expect(reRenderedSectionEl).toBeNull();
        });
    });
});
