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
        if (event.target.classList.contains("stop-propagation")) {
            return;
        }
        objRef.invokeMethodAsync("HandleOnCloseLocalSwitcher");
    };
    document.body.removeEventListener("click", _HandleClose);
    document.body.addEventListener("click", _HandleClose);
};

window.blazorCulture = (function () {
    const _GetNewQueriesString = function (culture) {
        let ret = "";
        let hasLang = false;

        let newQueryString = window.location.search.split("&").map((query) => {
            let newQuery = query.replace("?", "");
            if (newQuery.split("=")[0] === "culture") {
                newQuery = "culture=" + culture;
                hasLang = true;
            }
            return newQuery;
        });

        if (!hasLang) {
            newQueryString.push("culture=" + culture);
        }

        newQueryString = newQueryString.filter((query) => {
            return query !== "";
        });

        ret = "?" + newQueryString.join("&");

        return ret;
    };

    const publicMethods = {
        get: () => {
            if (!window.localStorage) return "";
            return localStorage.getItem("BlazorCulture");
        },
        set: (culture) => {
            if (window.localStorage) {
                localStorage.setItem("BlazorCulture", culture);
            }
        },
        setOnServer: (url) => {
            if (window.fetch) {
                fetch(url);
            }
        },
        pushOnRoute: (culture) => {
            if (window.history.pushState) {
                var newurl =
                    window.location.protocol +
                    "//" +
                    window.location.host +
                    window.location.pathname +
                    _GetNewQueriesString(culture) +
                    window.location.hash;
                window.history.pushState({ path: newurl }, "", newurl);
            }
        },
    };
    
    return publicMethods;
})();
