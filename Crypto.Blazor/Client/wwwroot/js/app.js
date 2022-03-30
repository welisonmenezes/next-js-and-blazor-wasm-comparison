window.HandleOnScroll = function () {
    const _DetectLayoutScrolling = function () {
        const diff = 50;
        const layout = document.querySelector(".MainLayout");
        if (window.scrollY > diff) {
            layout.classList.remove("is-not-scrolled");
            layout.classList.add("is-scrolled");
        } else if (window.scrollY <= diff) {
            layout.classList.add("is-not-scrolled");
            layout.classList.remove("is-scrolled");
        }
    };
    window.removeEventListener("scroll", _DetectLayoutScrolling);
    window.addEventListener("scroll", _DetectLayoutScrolling);
};

window.HandleOnCloseLocaleSwitcher = function (objRef) {
    const _HandleClose = function (event) {
        if (event.target.classList.contains("stop-propagation")) return;
        objRef.invokeMethodAsync("HandleOnCloseLocalSwitcher");
    };
    document.body.removeEventListener("click", _HandleClose);
    document.body.addEventListener("click", _HandleClose);
};

window.blazorCulture = (function () {
    const _GetNewQueriesString = function (culture) {
        let result = "";
        let hasCulture = false;
        let newQueryString = window.location.search.split("&").map((query) => {
            let newQuery = query.replace("?", "");
            if (newQuery.split("=")[0] === "culture") {
                newQuery = "culture=" + culture;
                hasCulture = true;
            }
            return newQuery;
        });
        if (!hasCulture) newQueryString.push("culture=" + culture);
        newQueryString = newQueryString.filter((query) => {
            return query !== "";
        });
        result = "?" + newQueryString.join("&");
        return result;
    };

    const _GetQueryCulture = () => {
        let queryCulture = "";
        window.location.search.split("&").map((query) => {
            const newQuery = query.replace("?", "");
            const splited = newQuery.split("=");
            if (splited[0] === "culture") queryCulture = splited[1];
        });
        return queryCulture;
    };

    return {
        get: () => {
            if (window.localStorage)
                return window.localStorage.getItem("BlazorCulture");
            return "";
        },
        set: (culture) => {
            if (window.localStorage)
                window.localStorage.setItem("BlazorCulture", culture);
        },
        getCurrentUri: (culture) => {
            if (window.history)
                return (newurl =
                    window.location.pathname +
                    _GetNewQueriesString(culture) +
                    window.location.hash);
        },
        haveToSetDefaultCulture: (supportedCulturesParam, defaultCulture) => {
            const supportedCultures = JSON.parse(supportedCulturesParam);
            const queryCulture = _GetQueryCulture();
            const savedCulture = window.localStorage.getItem("BlazorCulture");
            if (
                (queryCulture === "" && savedCulture !== defaultCulture) ||
                (queryCulture !== "" &&
                    !supportedCultures.includes(queryCulture)) ||
                (queryCulture !== "" && savedCulture != queryCulture)
            )
                return true;
            return false;
        },
        getQueryCulture: (supportedCulturesParam) => {
            const supportedCultures = JSON.parse(supportedCulturesParam);
            const queryCulture = _GetQueryCulture();
            if (!supportedCultures.includes(queryCulture)) return "";
            return queryCulture;
        },
    };
})();
