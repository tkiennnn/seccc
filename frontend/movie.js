window.onload = function() {
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

  const showBtn = document.getElementById('show-video-btn');
  const videoContainer = document.getElementById('video-container');
  const videoFrame = document.getElementById('video-frame');

  showBtn.onclick = function() {
    // TikTok case
    if (movie.tiktok && movie.tiktok.username && movie.tiktok.videoId) {
      const tiktokUrl = `https://www.tiktok.com/@${movie.tiktok.username}/video/${movie.tiktok.videoId}`;
      videoContainer.innerHTML = `
        <blockquote class="tiktok-embed" cite="${tiktokUrl}" data-video-id="${movie.tiktok.videoId}" style="max-width: 605px;min-width: 325px;">
          <section>
            <a target="_blank" href="${tiktokUrl}">Xem trên TikTok</a>
          </section>
        </blockquote>
      `;
      var script = document.createElement('script');
      script.src = "https://www.tiktok.com/embed.js";
      script.async = true;
      videoContainer.appendChild(script);

      videoContainer.style.display = "block";
      showBtn.style.display = "none";
      return;
    }

    // TikTok link (cũ)
    if (movie.video && movie.video.includes('tiktok.com')) {
      const matches = movie.video.match(/@([a-zA-Z0-9._-]+)\/video\/(\d+)/);
      if (matches && matches[1] && matches[2]) {
        const username = matches[1];
        const videoId = matches[2];
        videoContainer.innerHTML = `
          <blockquote class="tiktok-embed" cite="${movie.video}" data-video-id="${videoId}" style="max-width: 605px;min-width: 325px;">
            <section>
              <a target="_blank" href="${movie.video}">Xem trên TikTok</a>
            </section>
          </blockquote>
        `;
        var script = document.createElement('script');
        script.src = "https://www.tiktok.com/embed.js";
        script.async = true;
        videoContainer.appendChild(script);

        videoContainer.style.display = "block";
        showBtn.style.display = "none";
        return;
      } else {
        videoContainer.innerHTML = "<p>Không phát được video TikTok!</p>";
        videoContainer.style.display = "block";
        showBtn.style.display = "none";
        return;
      }
    }

    // YouTube case
    if (movie.video && (movie.video.includes('youtube.com') || movie.video.includes('youtu.be'))) {
      // Lấy videoId từ link YouTube
      let videoId = '';
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = movie.video.match(regExp);
      if (match && match[2].length === 11) {
        videoId = match[2];
      }
      if (videoId) {
        videoContainer.innerHTML = `
          <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" 
            title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen></iframe>
        `;
        videoContainer.style.display = "block";
        showBtn.style.display = "none";
        return;
      } else {
        videoContainer.innerHTML = "<p>Không phát được video YouTube!</p>";
        videoContainer.style.display = "block";
        showBtn.style.display = "none";
        return;
      }
    }

    // Video thông thường (mp4, link trực tiếp)
    if (movie.video) {
      videoFrame.src = movie.video;
      videoContainer.style.display = "block";
      showBtn.style.display = "none";
      return;
    }

    // Không có video
    videoContainer.innerHTML = "<p>Không có video!</p>";
    videoContainer.style.display = "block";
    showBtn.style.display = "none";
  };
};