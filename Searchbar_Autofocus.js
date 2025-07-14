// ==UserScript==
// @name         Searchbar Autofocus
// @version      0.2
// @description  Focus the search bars with Ctrl + Space, blur with Escape.
// @author       steffanossa
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';


  window.addEventListener("keydown", function(e) {
    if (e.ctrlKey && e.key === " ") {
      const searchInput = findAndGetSearchElement();
      if (searchInput) {
        searchInput.select();
        searchInput.focus();
      }
    }
    if (e.key === "Escape") {
      const searchInput = findAndGetSearchElement();
      if (searchInput) {
        searchInput.blur();
      }
    }
  }, true);

  function findAndGetSearchElement() {
    const textInpEls = document.querySelectorAll("input, textarea");
    if (textInpEls.length === 0) return null;

    const findSearchInput = (element) => {
    if (!element || !(element.type === "text" || element.type === "search")) {
      return null;
    }
    for (const attribute of element.attributes) {
      const formatAttr = attribute.value.toLowerCase();
      if (formatAttr.includes("disabled") || formatAttr.includes("hidden")) {
        continue;
      }
      if (formatAttr.includes("search") || formatAttr === "q" || formatAttr.includes("such") || formatAttr.includes("cherch") || formatAttr.includes("busca")) {
        return element;
      }
    }
    return null;
  };

  for (const input of textInpEls) {
    const searchInput = findSearchInput(input);
    if (searchInput) return searchInput;
  }

  return document.querySelector("input[type='search']") || textInpEls[0];
  }
})();
