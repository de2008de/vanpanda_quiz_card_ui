export const addParametersToUrl = (url, oParams) => {
    let key;
    url = url + "?";
    for (key in oParams) {
        url = url + "&" + key + "=" + oParams[key];
    }
    return url;
}
