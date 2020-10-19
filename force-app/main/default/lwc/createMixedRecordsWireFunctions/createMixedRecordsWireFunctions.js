import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
import { reduceErrors } from 'c/ldsUtils';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import CONTACT_FIRST_NAME_FIELD from '@salesforce/schema/Contact.FirstName';
import CONTACT_LAST_NAME_FIELD from '@salesforce/schema/Contact.LastName';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import OPPORTUNITY_NAME_FIELD from '@salesforce/schema/Opportunity.Name';
import OPPORTUNITY_STAGENAME_FIELD from '@salesforce/schema/Opportunity.StageName';
import OPPORTUNITY_CLOSEDATE_FIELD from '@salesforce/schema/Opportunity.CloseDate';

export default class CreateMixedRecordsWireFunctions extends LightningElement {
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
        this.createContact();
        this.createOpportunity();
    }

    createContact() {
        // Note: In this example we generate the record input structure from scratch for simplicity.
        // Consider to use the generateRecordInputForCreate() function instead.
        // The function will create the record input for you, including only fields that are createable.
        // Check https://developer.salesforce.com/docs/component-library/documentation/en/50.0/lwc/reference_generate_record_input_update
        const recordInput = {
            apiName: CONTACT_OBJECT.objectApiName,
            fields: {
                [CONTACT_FIRST_NAME_FIELD.fieldApiName]: this.contactFirstName,
                [CONTACT_LAST_NAME_FIELD.fieldApiName]: this.contactLastName
            }
        };

        createRecord(recordInput)
            .then((result) => this.handleSuccess(result.id, 'Contact'))
            .catch((error) => this.handleErrors(error));
    }

    createOpportunity() {
        // Note: In this example we generate the record input structure from scratch for simplicity.
        // Consider to use the generateRecordInputForCreate() function instead.
        // The function will create the record input for you, including only fields that are createable.
        // Check https://developer.salesforce.com/docs/component-library/documentation/en/50.0/lwc/reference_generate_record_input_update
        const recordInput = {
            apiName: OPPORTUNITY_OBJECT.objectApiName,
            fields: {
                [OPPORTUNITY_NAME_FIELD.fieldApiName]: this.opportunityName,
                [OPPORTUNITY_STAGENAME_FIELD.fieldApiName]: 'Prospecting',
                [OPPORTUNITY_CLOSEDATE_FIELD.fieldApiName]: new Date(2025, 1, 1)
            }
        };

        createRecord(recordInput)
            .then((result) => this.handleSuccess(result.id, 'Opportunity'))
            .catch((error) => this.handleErrors(error));
    }

    handleSuccess(recordId, object) {
        const evt = new ShowToastEvent({
            title: 'Success',
            message: `${object} created with Id: ${recordId}`,
            variant: 'success'
        });
        this.dispatchEvent(evt);
    }

    handleErrors(error) {
        const evt = new ShowToastEvent({
            title: 'Error',
            message: `Error creating records: ${reduceErrors(error).join(
                ', '
            )}`,
            variant: 'error'
        });
        this.dispatchEvent(evt);
    }
}
