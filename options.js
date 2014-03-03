/*
 * options.js
 * Translate This! Google Chrome extension
 * Options page script
 *
 * Created by Jayanth Chennamangalam
 */

/* save options to local storage */
function saveOptions() {
    var selectFrom = document.getElementById("langFrom");
    var langFrom = selectFrom.children[selectFrom.selectedIndex].value;
    localStorage["langFrom"] = langFrom;

    var selectTo = document.getElementById("langTo");
    var langTo = selectTo.children[selectTo.selectedIndex].value;
    localStorage["langTo"] = langTo;

    /* display confirmation message */
    var status = document.getElementById("status");
    status.innerHTML = "Source language is "
                       + selectFrom.children[selectFrom.selectedIndex].text
                       + ", target language is "
                       + selectTo.children[selectTo.selectedIndex].text
                       + ".";
}

/* restore saved value to the selection menu */
function restoreOptions() {
    var langFrom = localStorage["langFrom"];
    if (!langFrom) {
        /* should not fail, instead set to default language */
        langFrom = DefaultLangFrom;
    }
    var langTo = localStorage["langTo"];
    if (!langTo) {
        /* should not fail, instead set to default language */
        langTo = DefaultLangTo;
    }

    var select = document.getElementById("langFrom");
    for (var i = 0; i < select.children.length; i++) {
        var child = select.children[i];
        if (child.value == langFrom) {
            child.selected = "true";
            break;
        }
    }
    select = document.getElementById("langTo");
    for (var i = 0; i < select.children.length; i++) {
        var child = select.children[i];
        if (child.value == langTo) {
            child.selected = "true";
            break;
        }
    }
}

window.addEventListener("load", restoreOptions);

/* NOTE: window.addEventListener() seems to be asynchronous, so to make
         sure that the onClick event listener is called only after
         everything is loaded */
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("buttonSave").addEventListener("click",
                                                           saveOptions);
});

