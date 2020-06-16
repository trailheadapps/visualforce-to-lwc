import { LightningElement, api } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_TYPE_FIELD from '@salesforce/schema/Account.Type';
import ACCOUNT_PHONE_FIELD from '@salesforce/schema/Account.Phone';
import ACCOUNT_EMPLOYEES_FIELD from '@salesforce/schema/Account.NumberOfEmployees';

export default class ViewRecord extends LightningElement {
    @api recordId;
    objectApiName = ACCOUNT_OBJECT;

    fields = [
        ACCOUNT_NAME_FIELD,
        ACCOUNT_TYPE_FIELD,
        ACCOUNT_PHONE_FIELD,
        ACCOUNT_EMPLOYEES_FIELD
    ];
}
