import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { reduceErrors } from 'c/ldsUtils';
import createContactAndOpportunity from '@salesforce/apex/CreateMixedRecordsApexControllerLwc.createContactAndOpportunity';

export default class CreateMixedRecordsApex extends LightningElement {
    contactFirstName = 'Yan';
    contactLastName = 'Khang';
    opportunityName = 'Possible deal';

    handleContactFirstNameInputChange(event) {
        this.contactFirstName = event.target.value;
    }

    handleContactLastNameInputChange(event) {
        this.contactLastName = event.target.value;
    }

    handleOpportunityNameInputChange(event) {
        this.opportunityName = event.target.value;
    }

    handleButtonClick() {
        createContactAndOpportunity({
            contactFirstName: this.contactFirstName,
            contactLastName: this.contactLastName,
            opportunityName: this.opportunityName
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
