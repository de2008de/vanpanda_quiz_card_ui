const toggles = {
    CREDIT_PURCHASE_FEATURE: false
};

export const isToggleOn = name => {
    return toggles[name];
};
