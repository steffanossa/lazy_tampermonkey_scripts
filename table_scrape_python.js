// ==UserScript==
// @name         Scrape HTML Table with Python
// @version      1.0
// @description  get python code to scrape table contents
// @author       steffanossa
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // get table elements
    var tables = document.getElementsByTagName('table');

    // iterate over table elements
    for (var i = 0; i < tables.length; i++) {
        var table = tables[i];

        // Create the generate Python code button element
        var button = document.createElement('button');
        button.innerHTML = 'Get Py Scrape Code';
        button.style.marginTop = '10px';
        button.addEventListener('click', function(table) {
            return function() {
                // generate the python code
                var pythonCode = 'from bs4 import BeautifulSoup\nimport requests\n\nurl = \'' + window.location.href + '\'\nresponse = requests.get(url)\nsoup = BeautifulSoup(response.content, \'html.parser\')\n\n# Find the table element and extract the data\ntable = soup.find_all(\'table\')[' + Array.prototype.indexOf.call(tables, table) + ']\ndata = []\nfor row in table.find_all(\'tr\'):\n    cells = [cell.text.strip() for cell in row.find_all(\'td\')]\n    data.append(cells)\nprint(data)';

                // to clipboard
                var dummy = document.createElement('textarea');
                document.body.appendChild(dummy);
                dummy.value = pythonCode;
                dummy.select();
                document.execCommand('copy');
                document.body.removeChild(dummy);

                // show notificatoin
                var notification = document.createElement('div');
                notification.innerHTML = 'Python code has been copied to the clipboard.';
                notification.style.position = 'fixed';
                notification.style.bottom = '10px';
                notification.style.left = '50%';
                notification.style.transform = 'translateX(-50%)';
                notification.style.backgroundColor = '#4CAF50';
                notification.style.color = 'white';
                notification.style.padding = '10px';
                notification.style.borderRadius = '5px';
                document.body.appendChild(notification);
                setTimeout(function() {
                    document.body.removeChild(notification);
                }, 3000);
            };
        }(table));

        // add the button
        table.parentNode.insertBefore(button, table.nextSibling);
    }
})();
