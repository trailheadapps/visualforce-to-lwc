/**
 * Formats a list of sObjects returned by an Apex method call
 * @param {SObject[]} sObjects
 * @return {Object[]} formattedObjects, ready to use by lightning-datatable
 */
export function formatApexSObjects(sObjects) {
    try {
        return sObjects.map(formatApexSObject);
    } catch (err) {
        return [];
    }
}

function formatApexSObject(sObject) {
    return flatten(sObject, '');
}

function flatten(source, prefix) {
    const target = {};
    Object.keys(source).forEach((key) => {
        const value = source[key];
        const field = `${prefix}${key}`;
        if (typeof value === 'object') {
            const nested = flatten(value, `${field}.`);
            Object.assign(target, nested);
        } else {
            target[field] = value;
        }
    });
    return target;
}
