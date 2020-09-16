import { LightningElement, api } from 'lwc';

export default class ExampleWrapper extends LightningElement {
    @api iconName;
    @api lwc;
    @api recordId;
    @api title;
    @api visualforce;
    @api visualforceHeight;

    get lwcSource() {
        return `lwc/${this.lwc}`;
    }

    get visualforceSource() {
        return `pages/${this.visualforce}.page`;
    }

    get visualforceUrl() {
        if (this.recordId)
            return `/apex/${this.visualforce}?id=${this.recordId}`;
        return `/apex/${this.visualforce}`;
    }

    get visualforceIframeTitle() {
        return `Wrapper for ${this.visualforce} page`;
    }
}
