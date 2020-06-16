import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/PageMessagesDataRetrievalControllerLwc.getAccounts';

export default class PageMessagesDataRetrieval extends LightningElement {
    @wire(getAccounts)
    accounts;
}
