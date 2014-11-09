function validateProperty(propertyName, propertyValue){
    if (propertyValue === null || propertyValue === undefined) {
        throw new Error(propertyName + ' should be non-empty');
    }
}