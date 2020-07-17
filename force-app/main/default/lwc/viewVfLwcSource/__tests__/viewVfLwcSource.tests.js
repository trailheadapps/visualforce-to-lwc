import { createElement } from 'lwc';
import ViewVfLwcSource from 'c/viewVfLwcSource';

const BASE_URL =
    'https://github.com/trailheadapps/visualforce-to-lwc/tree/master/force-app/main/default/';

describe('c-view-vf-lwc-source', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('shows always the repository Visualforce URL with label', () => {
        const VF_URL = '/somevfurl';
        const FULL_URL = BASE_URL + VF_URL;
        const LABEL = 'View Visualforce source';

        // Create initial element
        const element = createElement('c-view-vf-lwc-source', {
            is: ViewVfLwcSource
        });

        element.visualforceSource = VF_URL;

        document.body.appendChild(element);

        const urlEl = element.shadowRoot.querySelector(
            'lightning-formatted-url'
        );
        expect(urlEl).not.toBeNull();
        expect(urlEl.value).toBe(FULL_URL);
        expect(urlEl.label).toBe(LABEL);
    });

    it('shows the repository LWC URL with label when a LWC source is provided', () => {
        const LWC_URL = '/somelwcurl';
        const FULL_URL = BASE_URL + LWC_URL;
        const LABEL = 'View LWC source';

        // Create initial element
        const element = createElement('c-view-vf-lwc-source', {
            is: ViewVfLwcSource
        });

        element.lwcSource = LWC_URL;

        document.body.appendChild(element);

        const urlEls = element.shadowRoot.querySelectorAll(
            'lightning-formatted-url'
        );
        expect(urlEls.length).toBe(2);
        expect(urlEls[1].value).toBe(FULL_URL);
        expect(urlEls[1].label).toBe(LABEL);
    });
});
