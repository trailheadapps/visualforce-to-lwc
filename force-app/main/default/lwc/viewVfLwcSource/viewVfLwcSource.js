import { LightningElement, api } from 'lwc';

export default class ViewSource extends LightningElement {
    _baseURL =
        'https://github.com/trailheadapps/visualforce-to-lwc/tree/master/force-app/main/default/';

    @api lwcSource;
    @api visualforceSource;

    get lwcSourceURL() {
        return this._baseURL + this.lwcSource;
    }

    get visualforceSourceURL() {
        return this._baseURL + this.visualforceSource;
    }
}
