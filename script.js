const elementById = (id) => {
  return document.getElementById(id);
};

const handleSearch = () => {
  const keyword = elementById("keyword");
  const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${keyword.value}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showArtist(data));

  // clear
  keyword.value = "";
};

const showArtist = ({ artists }) => {
  const artistsContainer = document.getElementById("artists");
  artistsContainer.textContent = "";
  const albumContainer = elementById("albums");

  artists.forEach((artist) => {
    const div = document.createElement("div");
    div.classList.add("artist-card");
    div.innerHTML = `<div class="image-container">
    <div class="image-container-inner">
      <img
        src="${
          artist.strArtistThumb
            ? artist.strArtistThumb
            : "https://ruhul-amin-sujon-portfolio.netlify.app/static/media/ruhul_amin_sujon.db7d6807.png"
        }"
        alt=""
      />
    </div>
  </div>
  <div class="info-container">
    <h1>${artist.strArtist ? artist.strArtist : "Not Available"}</h1>
    <p>Country: ${artist.strCountry ? artist.strCountry : "Not Available"}</p>
    <p>Style: ${artist.strGenre ? artist.strGenre : "Not Available"}</p>
  </div>
  <button class="album-button">
    <i class="fa-solid fa-compact-disc"></i>
    <p onclick="fetchAlbums('${
      artist.idArtist
    }')" class="button-title">Albums</p>
  </button>`;
    artistsContainer.appendChild(div);
    albumContainer.innerHTML = "";
  });
};

const fetchAlbums = (id) => {
  const url = `https://theaudiodb.com/api/v1/json/2/album.php?i=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAlbum(data.album));
};

const showAlbum = (data) => {
  const albumContainer = elementById("albums");
  albumContainer.textContent = "";
  data.forEach((album) => {
    const div = document.createElement("div");
    div.classList.add("album");
    div.innerHTML = `
        <div class="album-image-container">
          <img
            src="${
              album.strAlbumThumb
                ? album.strAlbumThumb
                : "https://ruhul-amin-sujon-portfolio.netlify.app/static/media/ruhul_amin_sujon.db7d6807.png"
            }"
            alt=""
          />
        </div>
        <div class="album-name">
          <h3>${album.strAlbum}</h3>
        </div>
      `;
    albumContainer.appendChild(div);
  });
};
