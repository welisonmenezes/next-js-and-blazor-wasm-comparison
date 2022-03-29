export const Action = {
    OPEN_MENU: "OPEN_MENU",
    CLOSE_MENU: "CLOSE_MENU",
    TOGGLE_SCROLL: "TOGGLE_SCROLL",
};

export const openMenuAction = () => {
    return {
        type: Action.OPEN_MENU,
    };
};

export const closeMenuAction = () => {
    return {
        type: Action.CLOSE_MENU,
    };
};

export const toggleScroll = (isScrolled) => {
    return {
        type: Action.TOGGLE_SCROLL,
        payload: isScrolled,
    };
};
