document.addEventListener("DOMContentLoaded", () => {
  const audioContainers = document.querySelectorAll('.audio-container'); 

  audioContainers.forEach((container, index) => {
    const playButton = container.querySelector('.custom-play-button');
    const audioElement = container.querySelector('audio');
    const bubble = document.getElementById(`bubble${index}`);
    const text = document.getElementById(`text${index}`);
    const playIcon = container.querySelector('.play-icon');
    const imageLinks = {
      "play-icon": "https://raw.githubusercontent.com/Hessen108/AlchemyStars.archive/main/play.png",
      "stop-icon": "https://raw.githubusercontent.com/Hessen108/AlchemyStars.archive/main/stop.png"
    };

    playButton.addEventListener("click", () => {
      if (audioElement.paused) {
        audioElement.play();
        playIcon.src = imageLinks["stop-icon"];
        bubble.style.display = "flex";
        bubble.classList.remove("hidden"); // 페이드 인
        text.innerHTML = ""; 
        let i = 0;
        const interval = setInterval(() => {
          if (i < content.length) {
            text.innerHTML += content.charAt(i);
            i++;
          } else {
            clearInterval(interval);
          }
        }, 100);
      } else {
        audioElement.pause();
        playIcon.src = imageLinks["play-icon"];
        bubble.classList.add("hidden"); // 페이드 아웃
        setTimeout(() => {
          bubble.style.display = "none"; // 완전히 사라진 후 숨김 처리
        }, 2000);
      }
    });

    // 오디오 재생 종료 시 아이콘 변경 및 말풍선 페이드 아웃 처리
    audioElement.addEventListener("ended", () => {
      playIcon.src = imageLinks["play-icon"];
      setTimeout(() => {
        bubble.classList.add("hidden"); // 5초 후 페이드 아웃
      }, 5000);
      setTimeout(() => {
        bubble.style.display = "none"; // 페이드 아웃 후 완전히 숨김
      }, 7000); // 총 7초 (5초 대기 + 2초 페이드 아웃)
    });
  });
});
