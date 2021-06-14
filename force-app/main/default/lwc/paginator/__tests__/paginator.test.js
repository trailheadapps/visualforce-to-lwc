import { createElement } from 'lwc';
import Paginator from 'c/paginator';

describe('c-paginator', () => {
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

    it('sends "next" event on button click', async () => {
        // Create initial element
        const element = createElement('c-paginator', {
            is: Paginator
        });
        document.body.appendChild(element);

        // Mock handlers for child events
        const handlerNext = jest.fn();

        // Add event listener to catch child events
        element.addEventListener('next', handlerNext);

        // Click the next(>) button
        const nextButtonEl = element.shadowRoot.querySelector('.next');
        expect(nextButtonEl.disabled).toBeFalsy();
        nextButtonEl.click();

        // Wait for any asynchronous DOM updates
        await flushPromises();

        // Validate if mocked events got fired
        expect(handlerNext.mock.calls.length).toBe(1);
    });

    it('sends "previous" event on button click', async () => {
        // Create initial element
        const element = createElement('c-paginator', {
            is: Paginator
        });
        document.body.appendChild(element);

        // Mock handlers for child events
        const handlerPrevious = jest.fn();

        // Add event listener to catch child events
        element.addEventListener('previous', handlerPrevious);

        // Click the Previous(<) button
        const prevButtonEl = element.shadowRoot.querySelector('.previous');
        expect(prevButtonEl.disabled).toBeFalsy();
        prevButtonEl.click();

        // Wait for any asynchronous DOM updates
        await flushPromises();

        // Validate if mocked events got fired
        expect(handlerPrevious.mock.calls.length).toBe(1);
    });

    it('disables "next" button when attribute is set', async () => {
        // Create initial element
        const element = createElement('c-paginator', {
            is: Paginator
        });
        element.nextButtonDisabled = true;
        document.body.appendChild(element);

        // Wait for any asynchronous DOM updates
        await flushPromises();

        // Next button should be disabled
        const nextButtonEl = element.shadowRoot.querySelector('.next');
        expect(nextButtonEl.disabled).toBeTruthy();
    });

    it('disables "previous" button when attribute is set', async () => {
        // Create initial element
        const element = createElement('c-paginator', {
            is: Paginator
        });
        element.previousButtonDisabled = true;
        document.body.appendChild(element);

        // Wait for any asynchronous DOM updates
        await flushPromises();

        // Previous button should be disabled
        const prevButtonEl = element.shadowRoot.querySelector('.previous');
        expect(prevButtonEl.disabled).toBeTruthy();
    });

    it('is accessible', async () => {
        const element = createElement('c-paginator', {
            is: Paginator
        });

        document.body.appendChild(element);

        await expect(element).toBeAccessible();
    });
});
