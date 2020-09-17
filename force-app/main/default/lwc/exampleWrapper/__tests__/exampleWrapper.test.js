import { createElement } from 'lwc';
import ExampleWrapper from 'c/exampleWrapper';

describe('c-example-wrapper', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    const TITLE = 'example';
    const ICON_NAME = 'utility:error';
    const RECORD_ID = '0019A00000E8zAWQAZ';
    const LWC = 'c-example';
    const VISUALFORCE = 'example';
    const VF_HEIGHT = '400';

    it('renders c-example-wrapper component', () => {
        const element = createElement('c-example-wrapper', {
            is: ExampleWrapper
        });
        element.iconName = ICON_NAME;
        element.lwc = LWC;
        element.recordId = RECORD_ID;
        element.title = TITLE;
        element.visualforce = VISUALFORCE;
        element.visualforceHeight = VF_HEIGHT;
        document.body.appendChild(element);

        const lightningCardEl = element.shadowRoot.querySelector(
            'lightning-card'
        );
        expect(lightningCardEl).not.toBeNull();
        expect(lightningCardEl.title).toBe(TITLE);
        expect(lightningCardEl.iconName).toBe(ICON_NAME);

        // check if iframe exists
        const iframeEl = lightningCardEl.querySelector('iframe');
        expect(iframeEl).not.toBeNull();
        expect(iframeEl.src).toContain(`/apex/${VISUALFORCE}?id=${RECORD_ID}`);
        expect(iframeEl.height).toBe(VF_HEIGHT);

        // check if vf-lwc-source is rendered
        const vfLwcSourceEl = lightningCardEl.querySelector(
            'c-view-vf-lwc-source'
        );
        expect(vfLwcSourceEl).not.toBeNull();
        expect(vfLwcSourceEl.visualforceSource).toBe(
            `pages/${VISUALFORCE}.page`
        );
        expect(vfLwcSourceEl.lwcSource).toBe(`lwc/${LWC}`);
    });

    it('renders visualforce url without recordId', () => {
        const element = createElement('c-example-wrapper', {
            is: ExampleWrapper
        });
        element.iconName = ICON_NAME;
        element.lwc = LWC;
        element.title = TITLE;
        element.visualforce = VISUALFORCE;
        element.visualforceHeight = VF_HEIGHT;
        document.body.appendChild(element);

        // check if iframe exists
        const iframeEl = element.shadowRoot.querySelector('iframe');
        expect(iframeEl).not.toBeNull();
        expect(iframeEl.src).toContain(`/apex/${VISUALFORCE}`);
    });

    it('is accessible', () => {
        const element = createElement('c-example-wrapper', {
            is: ExampleWrapper
        });

        document.body.appendChild(element);

        // Remove iframe so that it is not tested by axe
        const iframeEl = element.shadowRoot.querySelector('iframe');
        iframeEl.remove();

        return Promise.resolve().then(() => expect(element).toBeAccessible());
    });
});
