/**
 * Reduces one or more LDS errors into a string[] of error messages.
 * @param {FetchResponse|FetchResponse[]} errors
 * @return {String[]} Error messages
 */
export function reduceErrors(errors) {
    if (!Array.isArray(errors)) {
        errors = [errors];
    }

    return (
        errors
            // Remove null/undefined items
            .filter((error) => !!error)
            // Extract an error message
            .map((error) => {
                // UI API read errors
                if (Array.isArray(error.body)) {
                    return error.body.map((e) => e.message);
                }
                // UI API DML, Apex and network errors
                else if (error.body && typeof error.body.message === 'string') {
                    return error.body.message;
                }
                // JS errors
                else if (typeof error.message === 'string') {
                    return error.message;
                }
                // Unknown error shape so try HTTP status text
                return error.statusText;
            })
            // Flatten
            .reduce((prev, curr) => prev.concat(curr), [])
            // Remove empty strings
            .filter((message) => !!message)
    );
}

/**
 * Formats a list of sObjects returned by a call to getListUi adapter
 * so that it can be used in lightning-datatable
 * @param {List UI} List UI in User Interface API
 * @return {Object[]} formattedObjects
 */
export function formatGetListUiSObjects(sObjects) {
    const formattedObjects = [];
    sObjects.records.records.forEach((sObject) => {
        formattedObjects.push(formatGetListUiSObject(sObject));
    });
    return formattedObjects;
}

function formatGetListUiSObject(sObject) {
    const formattedObject = {};
    Object.keys(sObject.fields).forEach((key) => {
        formattedObject[key] = sObject.fields[key].value;
    });
    return formattedObject;
}
