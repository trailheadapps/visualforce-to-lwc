import { formatApexSObjects } from 'c/apexUtils';

// Realistic data after a calling SOQL in Apex
const soqlData = require('./data/soqlData.json');

describe('c-apex-utils', () => {
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

    it('is accessible', () => {
        const element = createElement('c-apex-utils', {
            is: ApexUtils
        });

        document.body.appendChild(element);

        return Promise.resolve().then(() => expect(element).toBeAccessible());
    });
});
