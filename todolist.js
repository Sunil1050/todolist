let userInput = document.getElementById('searchInput');
let searchResults = document.getElementById('searchResults');
let spinnerEle = document.getElementById('spinner');

function createAndAppendSearchResults(result) {

    let resultContainer = document.createElement('div');
    resultContainer.classList.add('result-item');
    searchResults.appendChild(resultContainer);

    let titleEle = document.createElement('a');
    titleEle.classList.add('result-title');
    titleEle.textContent = result.title;
    titleEle.setAttribute('href', result.link);
    titleEle.target = "_blank";
    resultContainer.appendChild(titleEle);

    let lineBreak = document.createElement('br');
    resultContainer.appendChild(lineBreak);

    let linkEle = document.createElement('a');
    linkEle.classList.add('result-url');
    linkEle.textContent = result.link;
    resultContainer.appendChild(linkEle);

    let linkDesc = document.createElement('p');
    linkDesc.classList.add('link-description');
    linkDesc.textContent = result.description;
    resultContainer.appendChild(linkDesc);


}

function dispalyResults(searchResults) {
    spinner.classList.toggle('d-none');
    for (let item of searchResults) {
        let result = item;
        createAndAppendSearchResults(result)
    }
}

function searchWikiPedia(event) {

    if (event.key === "Enter") {
        searchResults.textContent = "";
        spinner.classList.toggle('d-none');
        let userInputVal = userInput.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + userInputVal;
        let options = {
            method: "GET"
        }
        fetch(url, options)
            .then(function(response) {
                return response.json()
            })
            .then(function(jsondata) {
                console.log(jsondata);
                let {
                    search_results
                } = jsondata;
                dispalyResults(search_results);
            })
    }
}

userInput.addEventListener('keydown', searchWikiPedia);