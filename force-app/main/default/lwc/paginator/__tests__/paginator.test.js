import { createElement } from 'lwc';
import Paginator from 'c/paginator';

describe('c-paginator', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('sends "next" event on button click', () => {
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

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve().then(() => {
            // Validate if mocked events got fired
            expect(handlerNext.mock.calls.length).toBe(1);
        });
    });

    it('sends "previous" event on button click', () => {
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

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve().then(() => {
            // Validate if mocked events got fired
            expect(handlerPrevious.mock.calls.length).toBe(1);
        });
    });

    it('disables "next" button when attribute is set', () => {
        // Create initial element
        const element = createElement('c-paginator', {
            is: Paginator
        });
        element.nextButtonDisabled = true;
        document.body.appendChild(element);

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve().then(() => {
            // Next button should be disabled
            const nextButtonEl = element.shadowRoot.querySelector('.next');
            expect(nextButtonEl.disabled).toBeTruthy();
        });
    });

    it('disables "previous" button when attribute is set', () => {
        // Create initial element
        const element = createElement('c-paginator', {
            is: Paginator
        });
        element.previousButtonDisabled = true;
        document.body.appendChild(element);

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve().then(() => {
            // Previous button should be disabled
            const prevButtonEl = element.shadowRoot.querySelector('.previous');
            expect(prevButtonEl.disabled).toBeTruthy();
        });
    });
});
