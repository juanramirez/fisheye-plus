const SKIN_CSS_STORAGE_AREA_KEY = "fisheye-plus-skin-css";
const FONT_SIZE_STORAGE_AREA_KEY = "fisheye-plus-font-size";
const SKIN_STYLE_ELEMENT_ID = "fisheye-plus-skin";
const FONT_SIZE_ELEMENT_ID = "fisheye-plus-font";

const setCss = (elementId, skinCss) => {
    try {
        // Clear previous skin
        if (document.getElementById(elementId)) {
            document.head.removeChild(document.getElementById(elementId));
        }

        const style = document.createElement("style");

        style.type = "text/css";
        style.id = elementId;
        style.innerHTML = skinCss;
        document.head.appendChild(style);
    } catch (error) {
        console.error("Error when trying to set skin: " + error);
    }
};

const setSkin = (skinCss) => {
    setCss(SKIN_STYLE_ELEMENT_ID, skinCss);
};

const setFontSize = (fontSize) => {
    const css = ".sourceLine .lineContent {font-size: " + fontSize.toString() + "px;}";
    setCss(FONT_SIZE_ELEMENT_ID, css);
};

const readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);

        chrome.storage.sync.get(SKIN_CSS_STORAGE_AREA_KEY, (result) => {
            setSkin(result[SKIN_CSS_STORAGE_AREA_KEY]);
        });

        chrome.storage.sync.get(FONT_SIZE_STORAGE_AREA_KEY, (result) => {
            setFontSize(result[FONT_SIZE_STORAGE_AREA_KEY]);
        });

        chrome.storage.onChanged.addListener((changes, namespace) => {
            for (let key in changes) {
                if (key === SKIN_CSS_STORAGE_AREA_KEY) {
                    const change = changes[key];
                    if (change.newValue !== change.oldValue) {
                        setSkin(change.newValue);
                    }
                }
                if (key === FONT_SIZE_STORAGE_AREA_KEY) {
                    const change = changes[key];
                    if (change.newValue !== change.oldValue) {
                        setFontSize(change.newValue);
                    }
                }
            }
        });
    }
}, 10);