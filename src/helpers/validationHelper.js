export const validateSignupInput = oInput => {
    const EMAIL_MAX_LENGTH = 100;
    const PASSWORD_MIN_LENGTH = 6;
    const PASSWORD_MAX_LENGTH = 16;
    const oResult = {
        success: true,
        errorMessages: {}
    };

    const email = oInput.email && oInput.email.trim();
    if (!email || email.length === 0) {
        oResult.success = false;
        oResult.errorMessages.email = "Email is required";
    } else if (!isEmailValid(email)) {
        oResult.success = false;
        oResult.errorMessages.email = "Email format is invalid";
    } else if (email.length > EMAIL_MAX_LENGTH) {
        oResult.success = false;
        oResult.errorMessages.email = "Email is too long";
    }

    const password = oInput.password;
    if (!password || password.length === 0) {
        oResult.success = false;
        oResult.errorMessages.password = "Password is required";
    } else if (oInput.password.length < PASSWORD_MIN_LENGTH || oInput.password.length > PASSWORD_MAX_LENGTH) {
        oResult.success = false;
        oResult.errorMessages.password = "Password length must between " + PASSWORD_MIN_LENGTH + " and " + PASSWORD_MAX_LENGTH;
    }
    
    const confirmPassword = oInput.confirmPassword && oInput.confirmPassword.trim();
    if (!confirmPassword ||confirmPassword.length === 0) {
        oResult.success = false;
        oResult.errorMessages.confirmPassword = "Please confirm password";
    } else if (password !== confirmPassword) {
        oResult.success = false;
        oResult.errorMessages.confirmPassword = "Confirm password does not match";
    }

    return oResult;
};

const isEmailValid = sEmail => {
    const format = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const isValid = format.test(sEmail);
    return isValid;
};
