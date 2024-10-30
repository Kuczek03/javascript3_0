document.addEventListener("DOMContentLoaded", function () {
    const apiToken = "gjIFODuBxcHVaCuutjoOdRlCSNMGZOXS";
    const stationsTable = document.getElementById("stationsTable");
    const stationsTableBody = document.getElementById("stationsTableBody");
    const loadingMessage = document.getElementById("loading");
    const errorMessage = document.getElementById("errorMessage");
    fetchStations();
  
    function fetchStations() {
      loadingMessage.classList.remove("hidden");
      fetch("https://www.ncei.noaa.gov/cdo-web/api/v2/stations", {
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
          displayStations(data.results);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          showError("Failed to load data. Please try again later.");
        });
    }
  
    function displayStations(stations) {
      stationsTable.classList.remove("hidden");
      stations.forEach((station) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${station.id}</td>
          <td>${station.name || "N/A"}</td>
          <td>${station.state || "N/A"}</td>
          <td>${station.latitude || "N/A"}</td>
          <td>${station.longitude || "N/A"}</td>
        `;
        stationsTableBody.appendChild(row);
      });
    }
  
    function showError(message) {
      errorMessage.textContent = message;
      errorMessage.classList.remove("hidden");
    }
  });
  