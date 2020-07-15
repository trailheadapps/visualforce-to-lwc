import { createElement } from 'lwc';
import ExampleWrapper from 'c/exampleWrapper';

describe('c-example-wrapper', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders c-example-wrapper component', () => {
        const TITLE = 'example';
        const ICON_NAME = 'utility:error';
        const RECORD_ID = '0019A00000E8zAWQAZ';
        const LWC = 'c-example';
        const VISUALFORCE = 'example';
        const VF_HEIGHT = '400';

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

        //check lightning layout element exists
        const lightningLayoutEl = element.shadowRoot.querySelector(
            'lightning-layout'
        );
        expect(lightningLayoutEl).not.toBeNull();

        // check for the lightning layout item element
        const lightningLayoutItemEls = element.shadowRoot.querySelectorAll(
            'lightning-layout-item'
        );
        expect(lightningLayoutItemEls[0]).not.toBeNull();
        expect(lightningLayoutItemEls[0].size).toBe('6');
        expect(lightningLayoutItemEls[0].largeDeviceSize).toBe('6');
        expect(lightningLayoutItemEls[0].mediumDeviceSize).toBe('12');
        expect(lightningLayoutItemEls[0].smallDeviceSize).toBe('12');
        expect(lightningLayoutItemEls[0].padding).toBe('horizontal-medium');

        // check if iframe exists
        const iframeEl = element.shadowRoot.querySelector('iframe');
        expect(iframeEl).not.toBeNull();
        expect(iframeEl.src).toContain(`/apex/${VISUALFORCE}?id=${RECORD_ID}`);
        expect(iframeEl.height).toBe(VF_HEIGHT);

        // check if vf-lwc-source is rendered
        const vfLwcSourceEl = element.shadowRoot.querySelector(
            'c-view-vf-lwc-source'
        );
        expect(vfLwcSourceEl).not.toBeNull();
        expect(vfLwcSourceEl.visualforceSource).toBe(
            `pages/${VISUALFORCE}.page`
        );
        expect(vfLwcSourceEl.lwcSource).toBe(`lwc/${LWC}`);
    });

    it('renders visualforce url without recordId', () => {
        const TITLE = 'example';
        const ICON_NAME = 'utility:error';
        const LWC = 'c-example';
        const VISUALFORCE = 'example';
        const VF_HEIGHT = '400';

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
});
