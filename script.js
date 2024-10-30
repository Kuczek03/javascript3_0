document.addEventListener("DOMContentLoaded", function () {
    const apiToken = "gjIFODuBxcHVaCuutjoOdRlCSNMGZOXS";
    const datasetsTable = document.getElementById("datasetsTable");
    const datasetsTableBody = document.getElementById("datasetsTableBody");
    const loadingMessage = document.getElementById("loading");
    const errorMessage = document.getElementById("errorMessage");
    fetchDatasets();
    function fetchDatasets() {
      loadingMessage.classList.remove("hidden");
      fetch("https://www.ncei.noaa.gov/cdo-web/api/v2/datasets", {
        headers: {
          token: apiToken,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          loadingMessage.classList.add("hidden");
          displayDatasets(data.results);
        })
        .catch((error) => {
          loadingMessage.classList.add("hidden");
          console.error("Error fetching data:", error);
          showError("Failed to load data. Please try again later.");
        });
    }
  
    function displayDatasets(datasets) {
      datasetsTable.classList.remove("hidden");
  
      datasets.forEach((dataset) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${dataset.id}</td>
          <td>${dataset.name || "N/A"}</td>
          <td>${dataset.description || "N/A"}</td>
        `;
        datasetsTableBody.appendChild(row);
      });
    }
  
    function showError(message) {
      errorMessage.textContent = message;
      errorMessage.classList.remove("hidden");
    }
  });
  