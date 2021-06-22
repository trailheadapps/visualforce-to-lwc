import { createElement } from 'lwc';
import SingleRecords from 'c/singleRecords';
import { getNavigateCalledWith } from 'lightning/navigation';
import getSingleAccountViaSOQL from '@salesforce/apex/RecordPagesController.getSingleAccountViaSOQL';

const mockGetSingleAccountViaSOQL = require('./data/getRecord.json');

describe('c-single-records', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }

        // Ensure mocks are cleared out each time we finish a test
        jest.clearAllMocks();
    });

    // Helper function to wait until the microtask queue is empty.
    // Used to wait for asynchronous DOM updates.
    async function flushPromises() {
        return Promise.resolve();
    }

    it('renders UI with record', async () => {
        // Create initial element
        const element = createElement('c-single-records', {
            is: SingleRecords
        });
        document.body.appendChild(element);

        // Emit record from @wire adapter to make it available to the component
        getSingleAccountViaSOQL.emit(mockGetSingleAccountViaSOQL);

        // Wait for any asynchronous DOM updates
        await flushPromises();

        // Select elements for validation
        const buttonEl = element.shadowRoot.querySelector('lightning-button');
        expect(buttonEl).not.toBeNull();
    });

    it('Navigates to Account page when Take me there! button is clicked', async () => {
        // Identify test values
        const INPUT_OBJECT = 'Account';
        const INPUT_TYPE = 'standard__recordPage';
        const ACTION_NAME = 'view';
        const RECORD_ID = mockGetSingleAccountViaSOQL.Id;

        //; Create initial element
        const element = createElement('c-single-records', {
            is: SingleRecords
        });
        document.body.appendChild(element);

        // Emit record from @wire adapter to make it available to the component
        getSingleAccountViaSOQL.emit(mockGetSingleAccountViaSOQL);

        // Wait for any asynchronous DOM updates
        await flushPromises();

        // Get button from the DOM and simulate user click
        const buttonEl = element.shadowRoot.querySelector('lightning-button');
        buttonEl.click();

        const { pageReference } = getNavigateCalledWith();

        // Verify the page reference is invoked with correct attributes
        // according to test values above.
        expect(pageReference.type).toBe(INPUT_TYPE);
        expect(pageReference.attributes.objectApiName).toBe(INPUT_OBJECT);
        expect(pageReference.attributes.recordId).toBe(RECORD_ID);
        expect(pageReference.attributes.actionName).toBe(ACTION_NAME);
    });

    describe('getSingleContact @wire error', () => {
        it('shows error panel element', async () => {
            const ERROR = { message: 'An error message' };

            // Create initial element
            const element = createElement('c-single-records', {
                is: SingleRecords
            });
            document.body.appendChild(element);

            // Emit error from @wire
            getSingleAccountViaSOQL.error(ERROR);

            // Wait for any asynchronous DOM updates
            await flushPromises();

            const errorPanelEl =
                element.shadowRoot.querySelector('c-error-panel');
            // Ensure the error panel appears when there is an error state
            expect(errorPanelEl).not.toBeNull();
            expect(errorPanelEl.errors.body).toStrictEqual(ERROR);
        });
    });

    it('is accessible when data is returned', async () => {
        // Create initial element
        const element = createElement('c-single-records', {
            is: SingleRecords
        });
        document.body.appendChild(element);

        // Emit record from @wire adapter to make it available to the component
        getSingleAccountViaSOQL.emit(mockGetSingleAccountViaSOQL);

        // Wait for any asynchronous DOM updates
        await flushPromises();

        await expect(element).toBeAccessible();
    });

    it('is accessible when error is returned', async () => {
        const ERROR = { message: 'An error message' };

        // Create initial element
        const element = createElement('c-single-records', {
            is: SingleRecords
        });
        document.body.appendChild(element);

        // Emit error from @wire
        getSingleAccountViaSOQL.error(ERROR);

        // Emit record from @wire adapter to make it available to the component
        getSingleAccountViaSOQL.emit(mockGetSingleAccountViaSOQL);

        // Wait for any asynchronous DOM updates
        await flushPromises();

        await expect(element).toBeAccessible();
    });
});
