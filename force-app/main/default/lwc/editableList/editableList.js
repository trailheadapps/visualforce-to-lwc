import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/ListControllerLwc.getAccounts';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_TYPE_FIELD from '@salesforce/schema/Account.Type';
import ACCOUNT_PHONE_FIELD from '@salesforce/schema/Account.Phone';
import ACCOUNT_EMPLOYEES_FIELD from '@salesforce/schema/Account.NumberOfEmployees';

const COLUMNS = [
    {
        label: 'Account Name',
        fieldName: ACCOUNT_NAME_FIELD.fieldApiName,
        type: 'text',
        editable: 'true'
    },
    {
        label: 'Type',
        fieldName: ACCOUNT_TYPE_FIELD.fieldApiName,
        type: 'text',
        editable: 'true'
    },
    {
        label: 'Phone',
        fieldName: ACCOUNT_PHONE_FIELD.fieldApiName,
        type: 'phone',
        editable: 'true'
    },
    {
        label: 'Employees',
        fieldName: ACCOUNT_EMPLOYEES_FIELD.fieldApiName,
        type: 'number',
        editable: 'true'
    }
];

export default class List extends LightningElement {
    columns = COLUMNS;

    @wire(getAccounts)
    accounts;
}
