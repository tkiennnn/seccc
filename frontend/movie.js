window.onload = function() {
  // Lấy dữ liệu phim từ localStorage
  const movie = JSON.parse(localStorage.getItem('selectedMovie'));
  if (!movie) {
    document.getElementById('movie-detail').innerHTML = "<p>Không tìm thấy phim!</p>";
    document.getElementById('movie-player').style.display = "none";
    return;
  }
  document.getElementById('detail-img').src = movie.img;
  document.getElementById('detail-title').textContent = movie.title;
  document.getElementById('detail-genre').textContent = "Thể loại: " + movie.genre;
  document.getElementById('detail-desc').textContent = movie.desc;

  // Nút xem phim
  const showBtn = document.getElementById('show-video-btn');
  const videoContainer = document.getElementById('video-container');
  const videoFrame = document.getElementById('video-frame');
  showBtn.onclick = function() {
    const videoUrl = movie.video.include("rel=0") ? movie.video : movie.video + "&rel=0";
    videoFrame.src = movie.video || "";
    videoContainer.style.display = "block";
    showBtn.style.display = "none";
  };
};