import LightningDatatable from 'lightning/datatable';
import navigateToRecordTemplate from './navigateToRecordTemplate.html';

export default class DatatableWithCustomTypes extends LightningDatatable {
    static customTypes = {
        navigateToRecord: {
            template: navigateToRecordTemplate,
            typeAttributes: ['label']
        }
    };
}
