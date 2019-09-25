export function isAuthenticated() {
    if (!window.localStorage.getItem("token")) {
        return false;
    } else {
        return true;
    }
};

export const doAuthentication = (history) => {
    if (!isAuthenticated()) {
        history.push("/login");
    }
};
