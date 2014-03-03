/*
 * translatethis.js
 * Translate This! Google Chrome extension
 * Installs a context menu item to translate selected text to the configured
 * language, using Google Translate
 *
 * Created by Jayanth Chennamangalam on 2011.01.02
 */

var menuItem = "Translate This!";
chrome.contextMenus.create({"title": menuItem,
                            "contexts":["selection"],
                            "id": "translateThis"});
chrome.contextMenus.onClicked.addListener(translateThis);

function translateThis(info)
{
    /* get the language to be translated from and to, from local storage */
    var langFrom = localStorage["langFrom"];
    if (!langFrom)
    {
        langFrom = DefaultLangFrom;
    }
    var langTo = localStorage["langTo"];
    if (!langTo)
    {
        langTo = DefaultLangTo;
    }

    /* build the query string */
    var queryString = "http://translate.google.com/#"
                      + langFrom + "|" + langTo + "|"
                      + info.selectionText;

    /* get the index of the current tab and open the Google Translate tab
       right next to it */
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.create({"index": tab.index + 1,
                            "url": queryString,
                            "selected": true});
    });
}

