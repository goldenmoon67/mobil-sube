exports.filterSearchField = (query_paramater, isString, value) => {
    switch (query_paramater) {
        case "eq":
            return isString ? value : parseFloat(value);
        case "lt":
            return { $lt: (isString ? value : parseFloat(value)) };
        case "gt":
            return { $gt: (isString ? value : parseFloat(value)) };
        default:
            break;
    }

};
