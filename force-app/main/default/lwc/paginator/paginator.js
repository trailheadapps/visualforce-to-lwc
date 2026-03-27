import { LightningElement, api } from 'lwc';

export default class Paginator extends LightningElement {
    @api previousButtonDisabled;
    @api nextButtonDisabled;
    @api pageNumber = 1;
    @api itemLabel = 'results';

    get statusLabel() {
        return `${this.pageNumber} ${this.itemLabel}`;
    }

    handlePrevious() {
        this.dispatchEvent(new CustomEvent('previous'));
    }

    handleNext() {
        this.dispatchEvent(new CustomEvent('next'));
    }
}
