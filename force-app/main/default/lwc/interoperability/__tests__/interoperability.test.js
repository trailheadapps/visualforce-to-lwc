import { createElement } from 'lwc';
import Interoperability from 'c/interoperability';

describe('c-interoperability', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }

        jest.clearAllMocks();
    });

    // Helper function to wait until the microtask queue is empty.
    // Used to wait for asynchronous DOM updates.
    async function flushPromises() {
        return Promise.resolve();
    }

    it('shows interoperability component correctly initialized', () => {
        // Create initial element
        const element = createElement('c-interoperability', {
            is: Interoperability
        });
        element.label = 'My label';
        document.body.appendChild(element);

        const pEl = element.shadowRoot.querySelector('p.label');
        expect(pEl).not.toBeNull();
        expect(pEl.textContent).toStrictEqual(element.label);

        const pEl2 = element.shadowRoot.querySelector('p.message');
        expect(pEl2).not.toBeNull();
        expect(pEl2.textContent).toStrictEqual('LWC Method invoked 0 times');
    });

    it('increments counter when doWhatever called', async () => {
        // Create initial element
        const element = createElement('c-interoperability', {
            is: Interoperability
        });
        document.body.appendChild(element);

        element.doWhatever();

        // Wait for any asynchronous DOM updates
        await flushPromises();

        const pEl = element.shadowRoot.querySelector('p.message');
        expect(pEl).not.toBeNull();
        expect(pEl.textContent).toStrictEqual('LWC Method invoked 1 times');
    });

    it('updates paragraph when property set', async () => {
        // Create initial element
        const element = createElement('c-interoperability', {
            is: Interoperability
        });
        document.body.appendChild(element);

        element.label = 'new label';

        // Wait for any asynchronous DOM updates
        await flushPromises();

        const pEl = element.shadowRoot.querySelector('p.label');
        expect(pEl).not.toBeNull();
        expect(pEl.textContent).toStrictEqual(element.label);
    });

    it('dispatches buttonclicked event when button clicked', async () => {
        // Create initial element
        const element = createElement('c-interoperability', {
            is: Interoperability
        });
        document.body.appendChild(element);

        // Mock handler for toast event
        const handler = jest.fn();
        // Add event listener to catch toast event
        element.addEventListener('buttonclicked', handler);

        const buttonEl = element.shadowRoot.querySelector('lightning-button');
        buttonEl.click();

        // Check if toast event has been fired
        expect(handler).toHaveBeenCalled();
    });

    it('is accessible', async () => {
        const element = createElement('c-interoperability', {
            is: Interoperability
        });

        document.body.appendChild(element);

        await expect(element).toBeAccessible();
    });
});
