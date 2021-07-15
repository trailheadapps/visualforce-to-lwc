import { LightningElement } from 'lwc';

export default class Binding extends LightningElement {
    courseName = 'Default';

    handleChange(event) {
        this.courseName = event.target.value;
    }
}
