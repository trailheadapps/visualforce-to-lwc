import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_TYPE_FIELD from '@salesforce/schema/Account.Type';
import ACCOUNT_PHONE_FIELD from '@salesforce/schema/Account.Phone';
import ACCOUNT_OWNER_NAME_FIELD from '@salesforce/schema/Account.Owner.Name';

export default class ViewRecordWithParentRecordData extends LightningElement {
    @api recordId;

    accountObject = ACCOUNT_OBJECT;
    accountNameField = ACCOUNT_NAME_FIELD;
    accountTypeField = ACCOUNT_TYPE_FIELD;
    accountPhoneField = ACCOUNT_PHONE_FIELD;

    @wire(getRecord, {
        recordId: '$recordId',
        fields: [ACCOUNT_OWNER_NAME_FIELD]
    })
    record;

    get ownerNameValue() {
        return this.record && this.record.data
            ? getFieldValue(this.record.data, ACCOUNT_OWNER_NAME_FIELD)
            : '';
    }
}
