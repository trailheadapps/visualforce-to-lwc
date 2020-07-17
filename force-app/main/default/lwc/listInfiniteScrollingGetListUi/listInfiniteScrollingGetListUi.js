import { LightningElement, wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import { formatGetListUiSObjects } from 'c/ldsUtils';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_TYPE_FIELD from '@salesforce/schema/Account.Type';
import ACCOUNT_PHONE_FIELD from '@salesforce/schema/Account.Phone';
import ACCOUNT_EMPLOYEES_FIELD from '@salesforce/schema/Account.NumberOfEmployees';

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
        label: 'Employees',
        fieldName: ACCOUNT_EMPLOYEES_FIELD.fieldApiName,
        type: 'number'
    }
];
const PAGE_SIZE = 5;

export default class ListInfiniteScrollingGetListUi extends LightningElement {
    columns = COLUMNS;
    error;
    records = [];
    _currentPageToken = 0;
    _nextPageToken = PAGE_SIZE;

    @wire(getListUi, {
        objectApiName: ACCOUNT_OBJECT,
        listViewApiName: 'All_Accounts',
        pageSize: PAGE_SIZE,
        pageToken: '$_currentPageToken'
    })
    wiredAccounts({ data, error }) {
        if (data && data.records) {
            this.records = this.records.concat(formatGetListUiSObjects(data));
            this._nextPageToken = data.records.nextPageToken;
        } else if (error) {
            this.error = error;
        }
    }

    loadMoreData() {
        if (this._nextPageToken) {
            this._currentPageToken = this._nextPageToken;
        }
    }
}
