// ==UserScript==
// @name         Redirect URLs
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Redirect specified URLs
// @author       steffanossa
// @match        https://openai.com/*
// @match        https://www1.sflix.watch/homepage/*
// @match        https://fmovies.to/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const redirects = {
        'https://openai.com/': 'https://chat.openai.com/chat/',
        'https://www1.sflix.watch/homepage/': 'https://www1.sflix.watch/home/',
        'https://fmovies.to/': 'https://fmovies.to/home',
    };

    const currentUrl = window.location.href;

    for (const [sourceUrl, targetUrl] of Object.entries(redirects)) {
        if (currentUrl === sourceUrl || currentUrl.startsWith(sourceUrl)) {
            window.location.replace(targetUrl);
            break;
        }
    }
})();
