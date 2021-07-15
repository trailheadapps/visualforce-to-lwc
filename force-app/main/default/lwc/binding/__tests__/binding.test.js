import { createElement } from 'lwc';
import Binding from 'c/binding';

describe('c-binding', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    // Helper function to wait until the microtask queue is empty.
    // Used to wait for asynchronous DOM updates.
    async function flushPromises() {
        return Promise.resolve();
    }

    it('displays lightning-input with default value', async () => {
        const element = createElement('c-binding', {
            is: Binding
        });
        document.body.appendChild(element);

        const inputEl = element.shadowRoot.querySelector('lightning-input');
        expect(inputEl).not.toBeNull();
        expect(inputEl.value).toStrictEqual('Default');
    });

    it('displays new course name from lightning-input on change', async () => {
        const element = createElement('c-binding', {
            is: Binding
        });
        document.body.appendChild(element);

        const NEW_COURSE_NAME = 'New course name';

        const inputEl = element.shadowRoot.querySelector('lightning-input');
        inputEl.value = NEW_COURSE_NAME;
        inputEl.dispatchEvent(new CustomEvent('change'));

        // Wait for any asynchronous DOM updates
        await flushPromises();

        // Validate parameters of mocked Apex call
        const pEl = element.shadowRoot.querySelector('p.course-name');
        expect(pEl.textContent).toContain(NEW_COURSE_NAME);
    });

    it('is accessible', async () => {
        const element = createElement('c-binding', {
            is: Binding
        });
        document.body.appendChild(element);

        await expect(element).toBeAccessible();
    });
});
