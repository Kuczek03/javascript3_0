async function fetchClimateData() {
    const datasetid = document.getElementById("datasetid").value;
    const locationid = document.getElementById("locationid").value;
    const startdate = document.getElementById("startdate").value;
    const enddate = document.getElementById("enddate").value;
  
    if (!datasetid || !locationid || !startdate || !enddate) {
      console.error("Wszystkie pola muszą być uzupełnione!");
      document.getElementById("errorMessage").textContent =
        "Wszystkie pola muszą być uzupełnione!";
      document.getElementById("errorMessage").classList.remove("hidden");
      return;
    }
  
    document.getElementById("loading").classList.remove("hidden");
    document.getElementById("errorMessage").classList.add("hidden");
    document.getElementById("dataTable").classList.add("hidden");
  
    try {
      const response = await fetch(
        `https://www.ncei.noaa.gov/cdo-web/api/v2/data?datasetid=${datasetid}&locationid=${locationid}&startdate=${startdate}&enddate=${enddate}`,
        {
          method: "GET",
          headers: {
            token: "gjIFODuBxcHVaCuutjoOdRlCSNMGZOXS",
          },
        },
      );
  
      if (!response.ok) throw new Error("Failed to fetch data from NOAA API");
  
      const data = await response.json();
  
      if (
        data &&
        data.results &&
        Array.isArray(data.results) &&
        data.results.length > 0
      ) {
        const tableBody = document.getElementById("dataTableBody");
        tableBody.innerHTML = "";
  
        data.results.forEach((item) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${item.date || "N/A"}</td>
            <td>${item.station || "N/A"}</td>
            <td>${item.value || "N/A"}</td>
          `;
          tableBody.appendChild(row);
        });
  
        document.getElementById("dataTable").classList.remove("hidden");
      } else {
        throw new Error("No data found or data is in an unexpected format");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      document.getElementById("errorMessage").textContent = error.message;
      document.getElementById("errorMessage").classList.remove("hidden");
    } finally {
      document.getElementById("loading").classList.add("hidden");
    }
  }
  
  document
    .getElementById("dataForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      fetchClimateData();
    });
  