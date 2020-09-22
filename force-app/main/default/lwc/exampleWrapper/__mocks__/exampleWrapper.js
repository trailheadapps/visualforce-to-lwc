import { LightningElement, api } from 'lwc';
import exampleWrapper from './exampleWrapperTemplate.html';

export default class ExampleWrapper extends LightningElement {
    @api iconName;
    @api lwc;
    @api recordId;
    @api title;
    @api visualforce;
    @api visualforceHeight;

    render() {
        return exampleWrapper;
    }
}
