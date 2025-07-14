// ==UserScript==
// @name        Tab Focus through Google Search Results Fork
// @description Use the tab key to navigate through Google and DuckDuckGo search results (+ cycle through results and searchbar - duckduckgo support)
// @version     1.1.3-steffanossa.1
// @match       *://*/search*
// @include     *://*.google.*/search*
// match       *://*.duckduckgo.com/*
// @grant       none
// @author      original: szupie szupie@gmail.com, fork: steffanossa
// @namespace   szupie
// downloadURL https://update.greasyfork.org/scripts/433135/Tab%20Focus%20through%20Google%20Search%20Results.user.js
// updateURL https://update.greasyfork.org/scripts/433135/Tab%20Focus%20through%20Google%20Search%20Results.meta.js
// ==/UserScript==
(function () {
'use strict';

let selectors;

function init() {
	const results = document.querySelectorAll(selectors['resultTitle']);
  console.log(results);
  let realResults = [];
  let searchTextArea = document.querySelector("#APjFqb");

	for (let i=0; i<results.length; i++) {
		const linkNode = results[i].closest('a');
    if (linkNode) {
      realResults.push(linkNode);
		  linkNode.setAttribute('tabindex', "1");
    }
	}

  searchTextArea.addEventListener("focus", e => {
    const onExitSearchTextAreaViaTab = event => {
      if (event.key === "Tab") {
        e.target.blur();
        const firstResultNode = realResults[0];
        firstResultNode?.focus();
      }
    };
    searchTextArea.addEventListener("keydown", onExitSearchTextAreaViaTab);
  });


	// capture focus changes on results list to scroll entire result into view
	document.querySelector(selectors['resultsDiv']).addEventListener("focus", e => {
		// only perform scroll if newly focused element is result link
		if (e.target.getAttribute('tabindex') === '1') {
      console.log(`e ${e}`);
			const resultNode = e.target.closest(selectors['resultNode']);
      if (resultNode) {
        const bounds = resultNode.getBoundingClientRect();
        // scroll item to top if it extends past viewport top,
			  // or to bottom if it extends past viewport bottom
        if (bounds.top < 0) {
          resultNode.scrollIntoView();
        } else if (bounds.bottom > window.innerHeight) {
          resultNode.scrollIntoView(false);
        }
      }
		}
	}, true);
  if (!document.getElementById("tab-focus-results")) {
    const styleNode = document.createElement('style');
    styleNode.type = 'text/css';
    styleNode.innerHTML = css;
    styleNode.id = 'tab-focus-results';
    document.getElementsByTagName('head')[0].appendChild(styleNode);
  }
  const nextPageElement = document.querySelector(selectors['nextPageElement']);
  if (nextPageElement) {
    nextPageElement.setAttribute("tabindex", "1");
    nextPageElement.addEventListener("focus", e => {
      const onKeyDown = event => {
        if (event.key === "Tab") {
          event.preventDefault();
          //const firstResultNode = realResults[0];
          e.target.blur();
          //firstResultNode.focus();
          window.scrollTo(0,0);
          searchTextArea?.focus();
          searchTextArea?.select();
        }
      };
      nextPageElement.addEventListener("keydown", onKeyDown);

      nextPageElement.addEventListener("blur", () => {
        nextPageElement.removeEventListener("keydown", onKeyDown);
      }, {once: true});
    });
  }
}

// CSS selectors
selectors = {
	'resultTitle': '.LC20lb',
	'resultsDiv': '#res',
  'resultNode': '.srKDX',
  'resultNode': '.MjjYud',
  'nextPageElement': "#pnnext"
};

const ddgSelectors = {
  'resultTitle': '.eVNpHGjtxRBq_gLOfGDr.LQNqh2U1kzYxREs65IJu',
	'resultsDiv': '.gSXOPxXJQAIpv4HDaDFd',
	'resultNode': '.wLL07_0Xnd1QZpzpfR4W',
  'nextPageElement': "#more-results"
}


// Style to indicate focus
const css =`
a[tabindex="1"]:focus h3 {
	/*outline: 2px solid;
  border-radius: 8px;*/
}

a[tabindex="1"]:focus {
	outline: none;
}

/* for duckduckgo */
a.result__a[tabindex="1"]:focus::after {
	margin-top: 0.25em;
	margin-right: 0;
}

/*google*/
.N54PNb.BToiNc:has( a[tabindex="1"]:focus h3),
.srKDX:has( a[tabindex="1"]:focus h3),
.PmEWq.wHYlTd.vt6azd.Ww4FFb:has( a[tabindex="1"]:focus h3) {
  border-radius: 8px;
  outline: 1px solid;
}

/* next page */
#pnnext:focus,
#more-results:focus {
  border-radius: 8px;
  outline: 2px solid;
}

#pnnext:focus .oeN89d {
  font-size: 24px;
  font-weight: 700;
}
`;

if (document.querySelector(selectors['resultTitle'])) {
	init();
} else {
	window.addEventListener('load', init);
}


})();
