import { LightningElement, api } from 'lwc';

export default class Interoperability extends LightningElement {
    @api label = 'This label property has its initial value';
    timesInvoked = 0;

    handleClick() {
        this.dispatchEvent(
            new CustomEvent('buttonclicked', { bubbles: true, composed: true })
        );
    }

    @api
    doWhatever() {
        this.timesInvoked++;
    }

    get message() {
        return `LWC Method invoked ${this.timesInvoked} times`;
    }
}
