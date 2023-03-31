// ==UserScript==
// @name         YouTube Search Box Autofocus
// @version      1.0
// @description  Focus the youtube search bar. time saved  is time saved.
// @author       me
// @match        https://www.youtube.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.querySelector('#search-input input').focus();

})();
