import { LightningElement, api } from 'lwc';

export default class ErrorPopover extends LightningElement {
    @api errors;
    showPopover = true;

    handleCloseButtonIconClick() {
        this.showPopover = false;
    }

    @api
    toggle() {
        this.showPopover = !this.showPopover;
    }
}
