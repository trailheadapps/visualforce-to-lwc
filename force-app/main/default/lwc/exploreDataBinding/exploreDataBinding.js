import { LightningElement } from 'lwc';

export default class ExploreDataBinding extends LightningElement {
    greeting = 'Hello World';

    handleChange(event){
        this.greeting = event.target.value;
        // eslint-disable-next-line no-console
        console.log(this.greeting);
    }
}