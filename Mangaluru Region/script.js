function searchPage() {
    const searchInput = document.getElementById('search-input').value;
    const searchResults = document.querySelector('.search-results');
    
    if (searchInput) {
        const regex = new RegExp(searchInput, 'gi');
        const elementsToHighlight = document.querySelectorAll("body *");
        
        const highlightedRows = [];
        
        elementsToHighlight.forEach((element) => {
            if (element.tagName !== 'SCRIPT' && element.tagName !== 'STYLE') {
                const innerHTML = element.innerHTML;
                const highlightedHTML = innerHTML.replace(regex, (match) => `<span class="highlight">${match}</span>`);
                if (innerHTML !== highlightedHTML) {
                    element.innerHTML = highlightedHTML;
                    if (element.closest('tr')) {
                        highlightedRows.push(element.closest('tr'));
                    }
                }
            }
        });

        clearHighlights();
        
        const table = document.getElementById('bus-table');
        const tbody = table.querySelector('tbody');
        
        highlightedRows.forEach((row) => {
            tbody.insertBefore(row, tbody.firstChild);
        });
    } else {
        clearHighlights();
    }
}

function clearSearch() {
    document.getElementById('search-input').value = '';
    clearHighlights();
}

function clearHighlights() {
    const elementsToClear = document.querySelectorAll('.highlight');
    elementsToClear.forEach((element) => {
        element.outerHTML = element.innerHTML;
    });
}

fetch("data.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    let placeholder = document.querySelector("#data-output");
    let out = "";
    for (let datas of data) {
      out += `
        <tr>
          <td>${datas.busNumber}</td>
          <td>${datas.from}</td>
          <td>${datas.to}</td>
          <td>${datas.routes.join(", ")}</td>
        </tr>
      `;
    }
    placeholder.innerHTML = out;
  });

const refreshButton = document.getElementById("clear");
refreshButton.addEventListener("click", function() {
    location.reload();
});