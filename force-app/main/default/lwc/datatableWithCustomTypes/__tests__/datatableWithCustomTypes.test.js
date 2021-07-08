import DatatableWithCustomTypes from 'c/datatableWithCustomTypes';
import navigateToRecordTemplate from '../navigateToRecordTemplate.html';

describe('c-datatable-with-custom-types', () => {
    it('defines a navigateToRecord custom type for lightning-datatable', () => {
        expect(
            DatatableWithCustomTypes.customTypes.navigateToRecord.template
        ).toBe(navigateToRecordTemplate);
        expect(
            DatatableWithCustomTypes.customTypes.navigateToRecord.typeAttributes
                .length
        ).toBe(1);
        expect(
            DatatableWithCustomTypes.customTypes.navigateToRecord
                .typeAttributes[0]
        ).toBe('label');
    });
});
