import { formatApexSObjects } from 'c/apexUtils';

// Realistic data after a calling SOQL in Apex
const soqlData = require('./data/soqlData.json');

describe('c-apex-utils', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });
    it('flattens apex sobjects', () => {
        // Create initial element
        const result = formatApexSObjects(soqlData);

        result.forEach((record, index) => {
            // Record fields remain the same
            expect(record.Name).toBe(soqlData[index].Name);
            // Related record fields are flatenned
            expect(record['Owner.Id']).toBe(soqlData[index].Owner.Id);
            expect(record['Owner.Name']).toBe(soqlData[index].Owner.Name);
        });
    });
});
