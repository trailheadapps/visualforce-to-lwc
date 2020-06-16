import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { reduceErrors } from 'c/ldsUtils';
import callApex from '@salesforce/apex/PageMessagesControllerLwc.callApex';

export default class PageMessagesToast extends LightningElement {
    handleButtonClick() {
        callApex()
            .then(() => {
                // Handle successful result
            })
            .catch((error) => {
                const evt = new ShowToastEvent({
                    title: 'Error',
                    message: reduceErrors(error).join(', '),
                    variant: 'error'
                });
                this.dispatchEvent(evt);
            });
    }
}
