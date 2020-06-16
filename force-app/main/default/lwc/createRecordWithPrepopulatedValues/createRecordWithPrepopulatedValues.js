import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_TYPE_FIELD from '@salesforce/schema/Account.Type';
import ACCOUNT_PHONE_FIELD from '@salesforce/schema/Account.Phone';
import ACCOUNT_EMPLOYEES_FIELD from '@salesforce/schema/Account.NumberOfEmployees';

export default class CreateRecordWithPrepopulatedValues extends LightningElement {
    objectApiName = ACCOUNT_OBJECT;
    nameField = ACCOUNT_NAME_FIELD;
    typeField = ACCOUNT_TYPE_FIELD;
    phoneField = ACCOUNT_PHONE_FIELD;
    employeesField = ACCOUNT_EMPLOYEES_FIELD;

    handleSuccess(event) {
        const toastEvent = new ShowToastEvent({
            title: 'Account created',
            message: 'Record ID: ' + event.detail.id,
            variant: 'success'
        });
        this.dispatchEvent(toastEvent);
    }
}
