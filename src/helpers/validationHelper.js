export const validateSignupInput = oInput => {
    const EMAIL_MAX_LENGTH = 100;
    const USERNAME_MIN_LENGTH = 4;
    const USERNAME_MAX_LENGTH = 16;
    const PASSWORD_MIN_LENGTH = 6;
    const PASSWORD_MAX_LENGTH = 16;
    const oResult = {
        success: true,
        errorMessages: {}
    };

    const email = oInput.email && oInput.email.trim();
    if (!email || email.length === 0) {
        oResult.success = false;
        oResult.errorMessages.email = "is required";
    } else if (!isEmailValid(email)) {
        oResult.success = false;
        oResult.errorMessages.email = "format is invalid";
    } else if (email.length > EMAIL_MAX_LENGTH) {
        oResult.success = false;
        oResult.errorMessages.email = "is too long";
    }

    const username = oInput.username && oInput.username.trim();
    if (!username || username.length === 0) {
        oResult.success = false;
        oResult.errorMessages.username = "is required";
    } else if (username.length < USERNAME_MIN_LENGTH || username.length > USERNAME_MAX_LENGTH) {
        oResult.success = false;
        oResult.errorMessages.username = "length must between " + USERNAME_MIN_LENGTH + " and " + USERNAME_MAX_LENGTH;
    } else if (!isUsernameValid(username)) {
        oResult.success = false;
        oResult.errorMessages.username = "alphanumeric only";
    }

    const password = oInput.password;
    if (!password || password.length === 0) {
        oResult.success = false;
        oResult.errorMessages.password = "is required";
    } else if (oInput.password.length < PASSWORD_MIN_LENGTH || oInput.password.length > PASSWORD_MAX_LENGTH) {
        oResult.success = false;
        oResult.errorMessages.password = "length must between " + PASSWORD_MIN_LENGTH + " and " + PASSWORD_MAX_LENGTH;
    }
    
    const confirmPassword = oInput.confirmPassword && oInput.confirmPassword.trim();
    if (!confirmPassword ||confirmPassword.length === 0) {
        oResult.success = false;
        oResult.errorMessages.confirmPassword = "please confirm password";
    } else if (password !== confirmPassword) {
        oResult.success = false;
        oResult.errorMessages.confirmPassword = "does not match";
    }

    return oResult;
};

const isEmailValid = sEmail => {
    const format = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const isValid = format.test(sEmail);
    return isValid;
};

const isUsernameValid = sUsername => {
    const format = /^[a-zA-Z0-9]+$/;
    const isValid = format.test(sUsername);
    return isValid;
};
