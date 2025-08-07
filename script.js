const movies = [
  {
    title: "Sự im lặng của bầy cừu",
    genre: ["Hành động", "Phiên lưu", "Tình cảm"],
    poster: "https://i.pinimg.com/736x/58/60/3d/58603dcfa57853b22b8b60b12d3b7dbc.jpg",
  },
  {
    title: "Sói hoang",
    genre: ["Hành động", "Kinh dị", "Viễn tưởng"],
    poster: "https://earthhour.org.vn/wp-content/uploads/2024/11/Anh-soi-co-doc-meme-la-gi.jpg",
  },
  
  {
    title: "oggy and the cockroaches",
    genre: ["Hành động", "Tình cảm"],
    poster: "https://xilam.com/wp-content/uploads/2017/11/Oggy_Catalogue_VA-1024x724.jpg",
  },
  {
    title: "Thế giới động vật",
    genre: ["Kinh dị", "Viễn tưởng"],
    poster: "https://q.vgt.vn/2025/3/25/miss-grand-thai-lan-nhu-ganh-hai-thi-sinh-bat-chap-lac-vao-the-gioi-dong-vat-052-7406034.webp",
  },
];

const movieList = document.getElementById("movie-list");

function displayMovies(data) {
  movieList.innerHTML = data
    .map(
      (movie) => `
      <div class="movie">
        <img src="${movie.poster}" alt="${movie.title}" />
        <div class="movie-title">${movie.title}</div>
        <div class="movie-genre">${movie.genre.join(", ")}</div>
      </div>
    `
    )
    .join("");
}

displayMovies(movies);

// Tìm kiếm phim theo từ khoá
const searchInput = document.getElementById("search");
const genreFilter = document.getElementById("genre-filter");

function filterMovies() {
  const keyword = searchInput.value.toLowerCase();
  const genre = genreFilter.value;
  const filtered = movies.filter((m) => {
    const matchTitle = m.title.toLowerCase().includes(keyword);
    const matchGenre = genre === "" || m.genre.includes(genre);
    return matchTitle && matchGenre;
  });
  displayMovies(filtered);
}

searchInput.addEventListener("input", filterMovies);
genreFilter.addEventListener("change", filterMovies);