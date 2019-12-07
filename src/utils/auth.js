import jwt_decode from "jwt-decode";

export function isAuthenticated() {
    const token = window.localStorage.getItem("token");
    if (!token) {
        return false;
    }
    if (isTokenExpired(token)) {
        window.localStorage.removeItem("token");
        return false;
    }
    return true;
};

export const doAuthentication = (history) => {
    if (!isAuthenticated()) {
        history.push("/login");
        return false;
    }
    return true;
};

export const isTokenExpired = (token) => {
    const decoded_jwt = jwt_decode(token);
    const expireTime = decoded_jwt.exp;
    // Divide by 1000 to get epoch time in seconds
    const currentTime = Math.floor(new Date().getTime() / 1000);
    if (currentTime > expireTime) {
        return true;
    } else {
        return false;
    }
};

export const getUserIdFromToken = token => {
    const decoded_jwt = jwt_decode(token);
    const userId = parseInt(decoded_jwt.aud);
    return userId;
};
