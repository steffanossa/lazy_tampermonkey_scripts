// ==UserScript==
// @name         Stop Scroll Down On Player Bar Click
// @version      1.0
// @description  (Fix for sponsorblock: Adds MaxWidth to Youtube Chapters inside Player so that a click on Player Bar does not trigger scrolling down. Also adds Pointer indicating area that will proc scrolling)
// @author       steffanossa
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
        const css = '.ytp-chapter-container {max-width:fit-content;}';
        var style = document.createElement('style');

        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        document.getElementsByTagName('head')[0].appendChild(style);
})();
