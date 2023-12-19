export const formatQueryParamsClassifications = (classifications) => {
    return classifications.reduce(
        (current, classification) => current += `${classification},`,
        '&classifications='
    );
};
