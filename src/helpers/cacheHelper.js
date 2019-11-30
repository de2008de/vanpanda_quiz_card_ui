export const cacheSearchState = state => {
    const stringifiedState = JSON.stringify(state);
    window.sessionStorage.setItem("search_state", stringifiedState);
};

export const getCachedSearchState = () => {
    return JSON.parse(window.sessionStorage.getItem("search_state"));
};

export const clearCachedSearchState = () => {
    window.sessionStorage.removeItem("search_state");
};

export const cacheVerticalScrollPosition = () => {
    const ScrollableContainer = ".AppShell";
    window.sessionStorage.setItem("scroll_y", document.querySelector(ScrollableContainer).scrollTop);
};

export const getCachedVerticalScrollPosition = () => {
    return window.sessionStorage.getItem("scroll_y");
};

export const clearCachedVerticalScrollPosition = () => {
    window.sessionStorage.removeItem("scroll_y");
};
