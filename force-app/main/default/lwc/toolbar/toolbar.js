import { LightningElement } from 'lwc';

export default class Toolbar extends LightningElement {
    links = [
        {
            value: 'https://www.salesforce.com',
            label: 'Salesforce'
        },
        {
            value: 'https://developer.salesforce.com',
            label: 'Devs'
        }
    ];

    handleInputChange(event) {
        // eslint-disable-next-line no-console
        console.log(event.target.value);
    }
}
