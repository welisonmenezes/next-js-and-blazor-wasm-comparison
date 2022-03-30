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

    const _GetCookie = function (c_name) {
        var i,
            x,
            y,
            ARRcookies = document.cookie.split(";");

        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");

            if (x == c_name) {
                const result = decodeURI(y).split("|")[0].replace("c%3D", "");
                return result;
            }
        }

        return "";
    };

    return {
        get: () => {
            return _GetCookie(".AspNetCore.Culture");
        },
        getCurrentUri: (culture) => {
            if (window.history.pushState) {
                var newurl =
                    window.location.pathname +
                    _GetNewQueriesString(culture) +
                    window.location.hash;
                return newurl;
            }
        },
    };
})();
