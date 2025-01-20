const apiKey = 'ngla1dMXC72u5X6FNauhkgVwPSlAd47U';
let offset = 0;
const limit = 10;

function getRandomGif() {
    fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&rating=g`)
        .then(response => response.json())
        .then(data => {
            const gifUrl = data.data.images.original.url;
            document.getElementById('gif-container').innerHTML = `<img src="${gifUrl}" alt="Random GIF">`;
        })
        .catch(error => console.error('Error fetching random GIF:', error));
}

function searchGifs(newOffset) {
    const searchTerm = document.getElementById('search-term').value;
    offset = newOffset;
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=${limit}&offset=${offset}&rating=g`)
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('search-results');
            resultsContainer.innerHTML = '';
            data.data.forEach(gif => {
                const imgElement = document.createElement('img');
                imgElement.src = gif.images.fixed_height.url;
                resultsContainer.appendChild(imgElement);
            });
        })
        .catch(error => console.error('Error fetching search results:', error));
}

function nextPage() {
    offset += limit;
    searchGifs(offset);
}

function prevPage() {
    if (offset > 0) {
        offset -= limit;
        searchGifs(offset);
    }
}
