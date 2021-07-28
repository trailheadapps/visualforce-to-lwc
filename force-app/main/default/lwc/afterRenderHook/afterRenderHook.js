import { LightningElement } from 'lwc';

export default class AfterRenderHook extends LightningElement {
    courses = [];
    rendered = false;

    renderedCallback() {
        if (!this.rendered) {
            this.courses = ['Irrigation Systems', 'Soils', 'Organic Crops'];
            this.rendered = true;
        }
    }
}
