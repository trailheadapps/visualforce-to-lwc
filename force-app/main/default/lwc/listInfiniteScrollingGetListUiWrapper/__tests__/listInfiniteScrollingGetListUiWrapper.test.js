import { createElement } from 'lwc';
import ListInfiniteScrollingGetListUiWrapper from 'c/listInfiniteScrollingGetListUiWrapper';

// Mock exampleWrapper component so that accessibility tests don't expect the visualforce iframe to load
jest.mock('../../exampleWrapper/exampleWrapper');

describe('c-list-infinite-scrolling-get-list-ui-wrapper', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });
    it('shows inner component using c-example-wrapper', () => {
        // Create initial element
        const element = createElement(
            'c-list-infinite-scrolling-get-list-ui-wrapper',
            {
                is: ListInfiniteScrollingGetListUiWrapper
            }
        );
        document.body.appendChild(element);

        const exampleEl = element.shadowRoot.querySelector('c-example-wrapper');
        expect(exampleEl).not.toBeNull();

        const innerEl = exampleEl.querySelector(
            'c-list-infinite-scrolling-get-list-ui'
        );
        expect(innerEl).not.toBeNull();
    });

    it('is accessible', () => {
        const element = createElement(
            'c-list-infinite-scrolling-get-list-ui-wrapper',
            {
                is: ListInfiniteScrollingGetListUiWrapper
            }
        );

        document.body.appendChild(element);

        return Promise.resolve().then(() => expect(element).toBeAccessible());
    });
});
