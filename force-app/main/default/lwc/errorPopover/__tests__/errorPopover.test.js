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

        const sectionEl = element.shadowRoot.querySelector('section');
        expect(sectionEl).not.toBeNull();

        // check for float right div element
        const divEl = element.shadowRoot.querySelector('div.slds-float_right');
        expect(divEl).not.toBeNull();

        // check for lightning button icon element
        const buttonIconEl = element.shadowRoot.querySelector(
            'lightning-button-icon'
        );
        expect(buttonIconEl).not.toBeNull();
        expect(buttonIconEl.variant).toBe('bare');
        expect(buttonIconEl.iconClass).toBe('slds-button_icon-inverse');
        expect(buttonIconEl.iconName).toBe('utility:close');
        expect(buttonIconEl.alternativeText).toBe('Close dialog');
        expect(buttonIconEl.size).toBe('small');

        //check for header element
        const headerEl = element.shadowRoot.querySelector('header');
        expect(headerEl).not.toBeNull();

        // check for lightning icon element
        const lightningIconEl = element.shadowRoot.querySelector(
            'lightning-icon'
        );
        expect(lightningIconEl).not.toBeNull();
        expect(lightningIconEl.variant).toBe('inverse');
        expect(lightningIconEl.iconName).toBe('utility:error');
        expect(lightningIconEl.alternativeText).toBe('Error');
        expect(lightningIconEl.size).toBe('x-small');

        // check for the header element title
        const headerTitleEl = element.shadowRoot.querySelector('h2');
        expect(headerTitleEl.textContent).toBe('Resolve error');

        //check for errors in final div
        const popoverDivEl = element.shadowRoot.querySelector(
            'div.slds-var-popover__body'
        );
        expect(popoverDivEl.textContent).toBe(ERROR_MESSAGE_INPUT);
    });

    it('clicks close Dialog buton', () => {
        const ERROR_MESSAGE_INPUT = 'Friendly Error Message';

        const element = createElement('c-error-popover', {
            is: ErrorPopover
        });
        element.errors = ERROR_MESSAGE_INPUT;
        document.body.appendChild(element);

        const sectionEl = element.shadowRoot.querySelector('section');
        expect(sectionEl).not.toBeNull();

        // click lightning button element
        const buttonIconEl = element.shadowRoot.querySelector(
            'lightning-button-icon'
        );
        buttonIconEl.click();

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

        const sectionEl = element.shadowRoot.querySelector('section');
        expect(sectionEl).not.toBeNull();

        // call toggle function to hide errorPopover element
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
