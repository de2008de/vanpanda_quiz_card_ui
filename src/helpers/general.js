export const debounce = (fnCallback, interval) => {
    var timeout;
    return (...args) => {
        const later = () => {
            timeout = null;
            fnCallback.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, interval);
    };
};
