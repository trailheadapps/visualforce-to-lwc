import { createElement } from 'lwc';
import PageMessagesForm from 'c/pageMessagesForm';
import createCity from '@salesforce/apex/PageMessagesFormControllerLwc.createCity';

// Mocking imperative Apex method call
jest.mock(
    '@salesforce/apex/PageMessagesFormControllerLwc.createCity',
    () => {
        return {
            default: jest.fn()
        };
    },
    { virtual: true }
);

const MOCK_CITY_NAME = 'mockCityName';
const MOCK_ERROR = { message: 'mockError' };

describe('c-page-messages-form', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        // Prevent data saved on mocks from leaking between tests
        jest.clearAllMocks();
    });

    // Helper function to wait until the microtask queue is empty.
    // Used to wait for asynchronous DOM updates.
    async function flushPromises() {
        return Promise.resolve();
    }

    it('displays no error by default', async () => {
        // Create initial element
        const element = createElement('c-page-messages-form', {
            is: PageMessagesForm
        });
        document.body.appendChild(element);

        // Check that error popover is not rendered
        const listEl = element.shadowRoot.querySelector('c-error-popover');
        expect(listEl).toBeNull();
    });

    it('updates city name when input changes', async () => {
        // Create initial element
        const element = createElement('c-page-messages-form', {
            is: PageMessagesForm
        });
        document.body.appendChild(element);

        // Trigger input change
        const inputEl = element.shadowRoot.querySelector('lightning-input');
        inputEl.dispatchEvent(
            new CustomEvent('change', { detail: { value: MOCK_CITY_NAME } })
        );

        // Wait for any asynchronous DOM updates
        await flushPromises();

        expect(inputEl.value).toBe(MOCK_CITY_NAME);
    });

    it('clears city name when cancel button clicked', async () => {
        // Create initial element
        const element = createElement('c-page-messages-form', {
            is: PageMessagesForm
        });
        document.body.appendChild(element);

        // Set an initial input value
        const inputEl = element.shadowRoot.querySelector('lightning-input');
        inputEl.value = MOCK_CITY_NAME;

        // Click the cancel button
        element.shadowRoot.querySelector('.cancel').click();

        // Wait for any asynchronous DOM updates
        await flushPromises();

        expect(inputEl.value).toBe('');
    });

    describe('createCity Apex calls', () => {
        it('creates city when save button clicked', async () => {
            // Create initial element
            const element = createElement('c-page-messages-form', {
                is: PageMessagesForm
            });
            document.body.appendChild(element);

            // Set an initial input value
            const inputEl = element.shadowRoot.querySelector('lightning-input');
            inputEl.dispatchEvent(
                new CustomEvent('change', { detail: { value: MOCK_CITY_NAME } })
            );

            // Mock create city Apex call result
            createCity.mockResolvedValue(null);

            // Wait for any asynchronous DOM updates
            await flushPromises();

            // Click the save button
            element.shadowRoot.querySelector('.save').click();

            // Wait for any asynchronous DOM updates
            await flushPromises();

            // Validate parameters of mocked Apex call
            expect(createCity).toHaveBeenCalledWith({
                cityName: MOCK_CITY_NAME
            });
        });

        it('displays errors when create city fails', async () => {
            // Create initial element
            const element = createElement('c-page-messages-form', {
                is: PageMessagesForm
            });
            document.body.appendChild(element);

            // Mock create city Apex error
            createCity.mockRejectedValue(MOCK_ERROR);

            // Wait for any asynchronous DOM updates
            await flushPromises();

            // Click the save button
            element.shadowRoot.querySelector('.save').click();

            // Wait for any asynchronous DOM updates
            await flushPromises();

            // Validate that error is showing up
            const errorButtonIconEl = element.shadowRoot.querySelector(
                'lightning-button-icon'
            );
            expect(errorButtonIconEl).not.toBeNull();

            const errorPopoverEl =
                element.shadowRoot.querySelector('c-error-popover');
            expect(errorPopoverEl).not.toBeNull();
        });
    });

    it('is accessible', async () => {
        // Create initial element
        const element = createElement('c-page-messages-form', {
            is: PageMessagesForm
        });
        document.body.appendChild(element);

        // Mock create city Apex error
        createCity.mockRejectedValue(MOCK_ERROR);

        // Wait for any asynchronous DOM updates
        await flushPromises();

        await expect(element).toBeAccessible();
    });
});
