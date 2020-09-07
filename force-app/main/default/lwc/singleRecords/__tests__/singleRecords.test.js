import { createElement } from 'lwc';
import SingleRecords from 'c/singleRecords';
import { registerApexTestWireAdapter } from '@salesforce/sfdx-lwc-jest';
import { getNavigateCalledWith } from 'lightning/navigation';
import getSingleAccountViaSOQL from '@salesforce/apex/RecordPagesController.getSingleAccountViaSOQL';

const mockGetSingleAccountViaSOQL = require('./data/getRecord.json');

const getSingleAccountViaSOQLAdapter = registerApexTestWireAdapter(
    getSingleAccountViaSOQL
);

describe('c-single-records', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }

        // Ensure mocks are cleared out each time we finish a test
        jest.clearAllMocks();
    });

    it('renders UI with record', () => {
        // Create initial element
        const element = createElement('c-single-records', {
            is: SingleRecords
        });
        document.body.appendChild(element);

        // Emit record from @wire adapter to make it available to the component
        getSingleAccountViaSOQLAdapter.emit(mockGetSingleAccountViaSOQL);

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve().then(() => {
            // Select elements for validation
            const buttonEl = element.shadowRoot.querySelector(
                'lightning-button'
            );
            expect(buttonEl).not.toBeNull();
        });
    });

    it('Navigates to Account page when Take me there! button is clicked', () => {
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
        getSingleAccountViaSOQLAdapter.emit(mockGetSingleAccountViaSOQL);

        // Return a promise to wait for any asynchronous DOM updates. Jest
        // will automatically wait for the Promise chain to complete before
        // ending the test and fail the test if the promise rejects.
        return Promise.resolve().then(() => {
            // Get button from the DOM and simulate user click
            const buttonEl = element.shadowRoot.querySelector(
                'lightning-button'
            );
            buttonEl.click();

            const { pageReference } = getNavigateCalledWith();

            // Verify the page reference is invoked with correct attributes
            // according to test values above.
            expect(pageReference.type).toBe(INPUT_TYPE);
            expect(pageReference.attributes.objectApiName).toBe(INPUT_OBJECT);
            expect(pageReference.attributes.recordId).toBe(RECORD_ID);
            expect(pageReference.attributes.actionName).toBe(ACTION_NAME);
        });
    });

    describe('getSingleContact @wire error', () => {
        it('shows error panel element', () => {
            const ERROR = { message: 'An error message' };

            // Create initial element
            const element = createElement('c-single-records', {
                is: SingleRecords
            });
            document.body.appendChild(element);

            // Emit error from @wire
            getSingleAccountViaSOQLAdapter.error(ERROR);

            // Return a promise to wait for any asynchronous DOM updates. Jest
            // will automatically wait for the Promise chain to complete before
            // ending the test and fail the test if the promise rejects.
            return Promise.resolve().then(() => {
                const errorPanelEl = element.shadowRoot.querySelector(
                    'c-error-panel'
                );
                // Ensure the error panel appears when there is an error state
                expect(errorPanelEl).not.toBeNull();
                expect(errorPanelEl.errors.body).toStrictEqual(ERROR);
            });
        });
    });

    it('is accessible', () => {
        const element = createElement('c-single-records', {
            is: SingleRecords
        });

        document.body.appendChild(element);

        return Promise.resolve().then(() => expect(element).toBeAccessible());
    });
});
