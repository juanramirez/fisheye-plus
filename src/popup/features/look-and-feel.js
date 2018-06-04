const SKIN_NAME_STORAGE_AREA_KEY = "fisheye-plus-skin-name";
const FONT_SIZE_STORAGE_AREA_KEY = "fisheye-plus-font-size";

const skinDropdown = document.getElementById('skin-dropdown');
const fontSizeInput = document.getElementById('font-size-input');

chrome.storage.sync.get(SKIN_NAME_STORAGE_AREA_KEY, (result) => {
    if (SKIN_NAME_STORAGE_AREA_KEY in result) {
        skinDropdown.value = result[SKIN_NAME_STORAGE_AREA_KEY];
    }
});

chrome.storage.sync.get(FONT_SIZE_STORAGE_AREA_KEY, (result) => {
    if (FONT_SIZE_STORAGE_AREA_KEY in result) {
        fontSizeInput.value = result[FONT_SIZE_STORAGE_AREA_KEY];
    }
});

skinDropdown.addEventListener('change', () => {
    chrome.storage.sync.set({[SKIN_NAME_STORAGE_AREA_KEY]: skinDropdown.value});
});

fontSizeInput.addEventListener('change', () => {
    chrome.storage.sync.set({[FONT_SIZE_STORAGE_AREA_KEY]: fontSizeInput.value});
});