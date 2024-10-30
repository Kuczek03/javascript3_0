document.addEventListener("DOMContentLoaded", function () {
    document
        .getElementById("searchForm")
        .addEventListener("submit", function (event) {
            event.preventDefault();
            const capital = document
                .getElementById("capitalInput")
                .value.trim();
            fetchCountriesByCapital(capital);
        });
});

function fetchCountriesByCapital(capital) {
    const url = `https://restcountries.com/v3.1/all`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const country = data.find(
                (country) =>
                    country.capital &&
                    country.capital[0].toLowerCase() === capital.toLowerCase(),
            );

            if (country) {
                displayCountryData(country);
            } else {
                showError("Country not found. Please try another capital.");
            }
        })
        .catch((error) => {
            showError("An error occurred while fetching data.");
            console.error("Error:", error);
        });
}

function displayCountryData(country) {
    document.getElementById("errorMessage").classList.add("hidden");
    document.getElementById("resultTable").classList.remove("hidden");

    const resultBody = document.getElementById("resultBody");
    resultBody.innerHTML = "";

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${country.name.common}</td>
        <td>${country.capital ? country.capital[0] : "N/A"}</td>
        <td>${country.population ? country.population.toLocaleString() : "N/A"}</td>
        <td>${country.region || "N/A"}</td>
        <td>${country.subregion || "N/A"}</td>
    `;
    resultBody.appendChild(row);
}

function showError(message) {
    document.getElementById("resultTable").classList.add("hidden");
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
}
