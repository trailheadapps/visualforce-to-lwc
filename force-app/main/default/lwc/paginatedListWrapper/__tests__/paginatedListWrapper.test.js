import { createElement } from 'lwc';
import PaginatedListWrapper from 'c/paginatedListWrapper';

describe('c-page-messages-toast-wrapper', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('shows inner component using c-example-wrapper', () => {
        // Create initial element
        const element = createElement('c-paginated-list-wrapper', {
            is: PaginatedListWrapper
        });
        document.body.appendChild(element);

        const exampleEl = element.shadowRoot.querySelector('c-example-wrapper');
        expect(exampleEl).not.toBeNull();

        const innerEl = exampleEl.querySelector('c-paginated-list');
        expect(innerEl).not.toBeNull();
    });

    it('is accessible', () => {
        const element = createElement('c-paginated-list-wrapper', {
            is: PaginatedListWrapper
        });

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            expect(element).toBeAccessible();
        });
    });
});
