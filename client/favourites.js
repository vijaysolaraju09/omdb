const BACKEND_URL = "http://localhost:3000";

async function loadFavourites() {
  const favouritesContainer = document.getElementById("favourites");
  favouritesContainer.innerHTML = '<p class="text-center">Loading...</p>';

  try {
    const response = await fetch(`${BACKEND_URL}/favorites`);
    const data = await response.json();

    if (data.length > 0) {
      renderFavourites(data);
    } else {
      favouritesContainer.innerHTML =
        '<p class="text-center text-muted">No favourites added yet.</p>';
    }
  } catch (error) {
    favouritesContainer.innerHTML =
      '<p class="text-center text-danger">Failed to load favourites. Try again later.</p>';
  }
}

function renderFavourites(favourites) {
  const favouritesContainer = document.getElementById("favourites");
  favouritesContainer.innerHTML = "";

  favourites.forEach((item) => {
    const card = document.createElement("div");
    card.className = "col-md-4";

    card.innerHTML = `
      <div class="card h-100">
        <img src="${item.poster}" class="card-img-top" alt="${item.title}">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <p class="card-text">Year: ${item.year}</p>
          <p class="card-text">Type: ${item.type}</p>
        </div>
      </div>
    `;

    favouritesContainer.appendChild(card);
  });
}

loadFavourites();
