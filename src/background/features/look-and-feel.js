import '../../lib/less.min.js';

const FONT_SIZE_STORAGE_AREA_KEY = "fisheye-plus-font-size";
const SKIN_NAME_STORAGE_AREA_KEY = "fisheye-plus-skin-name";
const SKIN_CSS_STORAGE_AREA_KEY = "fisheye-plus-skin-css";

const DEFAULT_FONT_SIZE = 12;
const DEFAULT_SKIN_NAME = 'default';

chrome.storage.sync.get(FONT_SIZE_STORAGE_AREA_KEY, (result) => {
    if (!(FONT_SIZE_STORAGE_AREA_KEY in result)) {
        chrome.storage.sync.set({[FONT_SIZE_STORAGE_AREA_KEY]: DEFAULT_FONT_SIZE});
    }
});

chrome.storage.sync.get(SKIN_NAME_STORAGE_AREA_KEY, (result) => {
    if (!(SKIN_NAME_STORAGE_AREA_KEY in result)) {
        chrome.storage.sync.set({[SKIN_NAME_STORAGE_AREA_KEY]: DEFAULT_SKIN_NAME});
    }
});

// Function for writing the CSS to the storage.
export const sendSkinCss = (skinName) => {
    chrome.runtime.getPackageDirectoryEntry(function(root) {
        root.getFile('src/background/features/skins/' + skinName + '.less', {}, function(fileEntry) {
            fileEntry.file(function(file) {
                const reader = new FileReader();
                reader.onloadend = function() {
                    less.render(this.result, (err, result) => {
                        chrome.storage.sync.set({[SKIN_CSS_STORAGE_AREA_KEY]: result.css});
                    });
                };
                reader.readAsText(file);
            });
        });
    });
};

// Create listener for skin name changes
chrome.storage.onChanged.addListener((changes) => {
    for (let key in changes) {
        if (key === SKIN_NAME_STORAGE_AREA_KEY) {
            const change = changes[key];
            if (change.newValue !== change.oldValue) {
                sendSkinCss(change.newValue)
            }
        }
    }
});