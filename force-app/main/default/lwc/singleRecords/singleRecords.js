import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getSingleAccountViaSOQL from '@salesforce/apex/RecordPagesController.getSingleAccountViaSOQL';

export default class SingleRecords extends NavigationMixin(LightningElement) {
    @wire(getSingleAccountViaSOQL) account;

    handleButtonClick() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.account.data.Id,
                objectApiName: 'Account',
                actionName: 'view'
            }
        });
    }
}
