import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getAccounts from '@salesforce/apex/ListControllerLwc.getAccounts';
import ACCOUNT_ID_FIELD from '@salesforce/schema/Account.Id';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_TYPE_FIELD from '@salesforce/schema/Account.Type';
import ACCOUNT_PHONE_FIELD from '@salesforce/schema/Account.Phone';
import ACCOUNT_EMPLOYEES_FIELD from '@salesforce/schema/Account.NumberOfEmployees';

const COLUMNS = [
    {
        label: 'Account Name',
        type: 'navigateToRecord',
        fieldName: ACCOUNT_ID_FIELD.fieldApiName,
        typeAttributes: {
            label: { fieldName: ACCOUNT_NAME_FIELD.fieldApiName }
        }
    },
    { label: 'Type', fieldName: ACCOUNT_TYPE_FIELD.fieldApiName, type: 'text' },
    {
        label: 'Phone',
        fieldName: ACCOUNT_PHONE_FIELD.fieldApiName,
        type: 'phone'
    },
    {
        label: 'Employees',
        fieldName: ACCOUNT_EMPLOYEES_FIELD.fieldApiName,
        type: 'number'
    }
];

export default class ListRecordLinks extends NavigationMixin(LightningElement) {
    columns = COLUMNS;

    @wire(getAccounts)
    accounts;
}
