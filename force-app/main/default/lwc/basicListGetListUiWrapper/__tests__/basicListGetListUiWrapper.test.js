import { createElement } from 'lwc';
import BasicListGetListUiWrapper from 'c/basicListGetListUiWrapper';

// Mock inner component, as it uses a wire adapter and crashes
jest.mock('../../basicListGetListUi/basicListGetListUi');

// Mock exampleWrapper component so that accessibility tests don't expect the visualforce iframe to load
jest.mock('../../exampleWrapper/exampleWrapper');

describe('c-basic-list-get-list-ui-wrapper', () => {
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
    it('shows inner component using c-example-wrapper', () => {
        // Create initial element
        const element = createElement('c-basic-list-get-list-ui-wrapper', {
            is: BasicListGetListUiWrapper
        });
        document.body.appendChild(element);

        const exampleEl = element.shadowRoot.querySelector('c-example-wrapper');
        expect(exampleEl).not.toBeNull();

        const innerEl = exampleEl.querySelector('c-basic-list-get-list-ui');
        expect(innerEl).not.toBeNull();
    });

    it('is accessible', async () => {
        const element = createElement('c-basic-list-get-list-ui-wrapper', {
            is: BasicListGetListUiWrapper
        });

        document.body.appendChild(element);

        // Wait for any asynchronous DOM updates
        await flushPromises();

        await expect(element).toBeAccessible();
    });
});
