const API_URL = "https://www.omdbapi.com/?apikey=7a54ec1a";
const BACKEND_URL = "http://localhost:3000";

document.getElementById("searchForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const query = document.getElementById("searchInput").value.trim();
  if (!query) return;

  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = '<p class="text-center">Loading...</p>';

  try {
    const response = await fetch(`${API_URL}&s=${query}`);
    const data = await response.json();

    if (data.Response === "True") {
      renderResults(data.Search);
    } else {
      resultsContainer.innerHTML = `<p class="text-center text-danger">${data.Error}</p>`;
    }
  } catch (error) {
    resultsContainer.innerHTML =
      '<p class="text-center text-danger">Something went wrong. Please try again later.</p>';
  }
});

function renderResults(results) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  results.forEach((item) => {
    const card = document.createElement("div");
    card.className = "col-md-4";

    card.innerHTML = `
      <div class="card h-100">
        <img src="${
          item.Poster !== "N/A"
            ? item.Poster
            : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
        }" class="card-img-top" alt="${item.Title}">
        <div class="card-body">
          <h5 class="card-title">${item.Title}</h5>
          <p class="card-text">Year: ${item.Year}</p>
          <p class="card-text">Type: ${item.Type}</p>
          <button class="btn favorite-btn" onclick="saveFavorite('${
            item.imdbID
          }', '${item.Title}', '${item.Year}', '${item.Type}', '${
      item.Poster
    }')">Favorite</button>
        </div>
      </div>
    `;

    resultsContainer.appendChild(card);
  });
}

async function saveFavorite(id, title, year, type, poster) {
  try {
    console.log(id, title, year, type, poster);

    const response = await fetch(`${BACKEND_URL}/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ id, title, year, type, poster }),
    });

    if (response.ok) {
      alert(`'${title}' has been added to favorites!`);
    } else {
      alert("Failed to save favorite. Please try again.");
    }
  } catch (error) {
    alert("Error occurred while saving the favorite.");
  }
}
