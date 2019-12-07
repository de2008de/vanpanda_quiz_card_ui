import axios from "axios";

export const debounce = (fnCallback, interval) => {
    var timeout;
    return (...args) => {
        const later = () => {
            timeout = null;
            fnCallback.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, interval);
        return timeout;
    };
};

export const getAxioCancelTokenSource = () => {
    return axios.CancelToken.source();
};
