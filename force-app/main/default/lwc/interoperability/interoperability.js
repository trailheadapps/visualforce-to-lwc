import { LightningElement, api } from 'lwc';

export default class Interoperability extends LightningElement {
    @api label;
    message = 'LWC Method invoked 0 times';
    timesInvoked = 1;

    handleClick() {
        this.dispatchEvent(
            new CustomEvent('buttonclicked', { bubbles: true, composed: true })
        );
    }

    @api
    doWhatever() {
        this.message = `LWC Method invoked ${this.timesInvoked} times`;
        this.timesInvoked++;
    }
}
