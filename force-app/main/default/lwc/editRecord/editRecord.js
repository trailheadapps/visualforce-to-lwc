import { LightningElement, api } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_TYPE_FIELD from '@salesforce/schema/Account.Type';
import ACCOUNT_PHONE_FIELD from '@salesforce/schema/Account.Phone';
import ACCOUNT_EMPLOYEES_FIELD from '@salesforce/schema/Account.NumberOfEmployees';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class EditRecord extends LightningElement {
    @api recordId;
    objectApiName = ACCOUNT_OBJECT;

    fields = [
        ACCOUNT_NAME_FIELD,
        ACCOUNT_TYPE_FIELD,
        ACCOUNT_PHONE_FIELD,
        ACCOUNT_EMPLOYEES_FIELD
    ];

    // Only use if custom behavior needed
    handleSuccess() {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: this.recordId ? 'Account updated' : 'Account created',
                variant: 'success'
            })
        );
    }

    // Only use if custom behavior needed
    handleError() {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error',
                message: this.recordId
                    ? 'Error updating Account'
                    : 'Error creating Account',
                variant: 'error'
            })
        );
    }
}
