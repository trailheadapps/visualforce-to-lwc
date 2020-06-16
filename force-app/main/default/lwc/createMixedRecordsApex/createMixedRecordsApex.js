import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { reduceErrors } from 'c/ldsUtils';
import createContactAndOpportunity from '@salesforce/apex/CreateMixedRecordsApexControllerLwc.createContactAndOpportunity';

export default class CreateMixedRecordsApex extends LightningElement {
    contactFirstName = 'Yan';
    contactLastName = 'Khang';
    opportunityName = 'Possible deal';

    handleContactFirstNameInputChange(event) {
        this.contactFirstName = event.detail.value;
    }

    handleContactLastNameInputChange(event) {
        this.contactLastName = event.detail.value;
    }

    handleOpportunityNameInputChange(event) {
        this.opportunityName = event.detail.value;
    }

    handleButtonClick() {
        createContactAndOpportunity({
            contactFirstName: this.contactFirstName,
            contactLastName: this.contactLastName,
            opportunityName: this.opportunityName,
            accountId: this.recordId
        })
            .then(() => {
                const evt = new ShowToastEvent({
                    title: 'Success',
                    message: 'Contact & Opportunity created correctly',
                    variant: 'success'
                });
                this.dispatchEvent(evt);
            })
            .catch((error) => {
                const evt = new ShowToastEvent({
                    title: 'Error',
                    message:
                        'Error creating records: ' +
                        reduceErrors(error).join(', '),
                    variant: 'error'
                });
                this.dispatchEvent(evt);
            });
    }
}
