import { LightningElement } from 'lwc';
import { reduceErrors } from 'c/ldsUtils';
import createCity from '@salesforce/apex/PageMessagesFormControllerLwc.createCity';

export default class PageMessagesForm extends LightningElement {
    errors;
    cityName;

    handleSaveButtonClick() {
        createCity({ cityName: this.cityName })
            .then(() => {
                // Handle successful result
            })
            .catch((error) => {
                this.errors = reduceErrors(error).join(', ');
                // Optionally highlight fields errors
                this.template
                    .querySelector('lightning-input')
                    .setCustomValidity('Incorrect input');
                this.template.querySelector('lightning-input').reportValidity();
            });
    }

    handleInputChange(event) {
        this.cityName = event.detail.value;
    }

    handleCancelButtonClick() {
        this.cityName = '';
    }

    handleErrorButtonIconClick() {
        this.template.querySelector('c-error-popover').toggle();
    }
}
