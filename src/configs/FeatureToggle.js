const toggles = {
    CREDIT_PURCHASE_FEATURE: false,
    SEARCH: false
};

export const isToggleOn = name => {
    return toggles[name];
};
