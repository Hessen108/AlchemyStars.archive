document.addEventListener("DOMContentLoaded", () => {
  const audioContainers = document.querySelectorAll('.audio-container'); 
  const imageLinks = {
    "play-icon": "https://raw.githubusercontent.com/Hessen108/AlchemyStars.archive/main/play.png",
    "stop-icon": "https://raw.githubusercontent.com/Hessen108/AlchemyStars.archive/main/stop.png"
  };

  audioContainers.forEach((container, index) => {
    const playButton = container.querySelector('.custom-play-button');
    const audioElement = container.querySelector('audio');
    const bubble = document.getElementById(`bubble${index}`);
    const text = document.getElementById(`text${index}`);
    const playIcon = container.querySelector('.play-icon'); // img 선택자
    const content = container.getAttribute('data-content'); // content 정의
    playIcon.src = imageLinks["play-icon"];  // 초기 play 이미지 설정
    playIcon.alt = "Play Icon";
    playButton.appendChild(playIcon);


    playButton.addEventListener("click", () => {
      const audioElement = container.querySelector('audio');
      if (audioElement.paused) {
        audioElement.play();
        playIcon.src = imageLinks["stop-icon"];
        bubble.style.display = "flex";
        bubble.classList.remove("hidden");
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
        bubble.classList.add("hidden");
        setTimeout(() => {
          bubble.style.display = "none";
        }, 2000);
      }
    });

    audioElement.addEventListener("ended", () => {
      playIcon.src = imageLinks["play-icon"];
      setTimeout(() => {
        bubble.classList.add("hidden");
      }, 5000);
      setTimeout(() => {
        bubble.style.display = "none";
      }, 7000);
    });
  });
});
