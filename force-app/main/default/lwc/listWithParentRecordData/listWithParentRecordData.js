import { LightningElement, wire } from 'lwc';
import { formatApexSObjects } from 'c/apexUtils';
import getAccounts from '@salesforce/apex/ListWithParentRecordDataControllerLwc.getAccounts';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_TYPE_FIELD from '@salesforce/schema/Account.Type';
import ACCOUNT_PHONE_FIELD from '@salesforce/schema/Account.Phone';
import ACCOUNT_OWNER_NAME_FIELD from '@salesforce/schema/Account.Owner.Name';

const COLUMNS = [
    {
        label: 'Account Name',
        fieldName: ACCOUNT_NAME_FIELD.fieldApiName,
        type: 'text'
    },
    { label: 'Type', fieldName: ACCOUNT_TYPE_FIELD.fieldApiName, type: 'text' },
    {
        label: 'Phone',
        fieldName: ACCOUNT_PHONE_FIELD.fieldApiName,
        type: 'phone'
    },
    {
        label: 'Owner Name',
        fieldName: ACCOUNT_OWNER_NAME_FIELD.fieldApiName,
        type: 'text'
    }
];

export default class ListWithParentRecordData extends LightningElement {
    columns = COLUMNS;

    @wire(getAccounts)
    accounts;

    // Needed only when bringing parent records data
    get formattedAccounts() {
        return this.accounts.data ? formatApexSObjects(this.accounts.data) : [];
    }
}
