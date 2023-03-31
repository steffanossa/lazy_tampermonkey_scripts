// ==UserScript==
// @name         download HTML-table as .csv
// @version      1.0
// @description  looks for table elements and adds a button that enables downloading the table's content as *.csv
// @author       steffanossa
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // get table elements
    var tables = document.getElementsByTagName('table');

    // iterate over each table element
    for (var i = 0; i < tables.length; i++) {
        var table = tables[i];

        // create dl button
        var button = document.createElement('button');
        button.innerHTML = 'Download as CSV';
        button.style.marginLeft = '10px';
        button.addEventListener('click', function(table) {
            return function() {
                // table to csv
                var csv = [];
                var rows = table.getElementsByTagName('tr');
                for (var j = 0; j < rows.length; j++) {
                    var cells = rows[j].getElementsByTagName('td');
                    var row = [];
                    for (var k = 0; k < cells.length; k++) {
                        row.push(cells[k].innerText);
                    }
                    csv.push(row.join(','));
                }
                var csvString = csv.join('\n');

                // generate and click dl link
                var link = document.createElement('a');
                link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvString);
                link.download = 'table.csv';
                link.click();
            };
        }(table));

        // add dl button next to table
        table.parentNode.insertBefore(button, table.nextSibling);
    }
})();
