document.addEventListener("DOMContentLoaded", () => {
  const audioContainers = document.querySelectorAll('.audio-container');
  const imageLinks = {
    "play-icon": "https://raw.githubusercontent.com/Hessen108/AlchemyStars.archive/main/play.png",
    "stop-icon": "https://raw.githubusercontent.com/Hessen108/AlchemyStars.archive/main/stop.png"
  };

  const profileImageLinks = {};

  audioContainers.forEach((container, index) => {
    const playButton = container.querySelector('.custom-play-button');
    const audioElement = container.querySelector('audio');
    const profileAndBubble = document.querySelector(`#profileAndBubble${index}`); // id로 선택
    const bubble = profileAndBubble.querySelector('.speech-bubble');
    const text = bubble.querySelector('.speech-text');
    let playIcon = playButton.querySelector('img');

    const content = container.getAttribute('data-content');
    const profileImageURL = container.getAttribute('data-profile');

    // 아이콘이 없을 때만 생성
    if (!playIcon) {
      playIcon = document.createElement('img');
      playButton.appendChild(playIcon);
    }
    playIcon.src = imageLinks["play-icon"];
    playIcon.alt = "Play Icon";

    // 프로필 이미지 미리 로드
    if (!profileImageLinks[profileImageURL]) {
      const profileImage = new Image();
      profileImage.src = profileImageURL;
      profileImageLinks[profileImageURL] = profileImage;
    }

    playButton.addEventListener("click", () => {
      if (audioElement.paused) {
        audioElement.play();
        playIcon.src = imageLinks["stop-icon"];
        profileAndBubble.style.display = "flex";
        profileAndBubble.style.opacity = "1"; 

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
          profileAndBubble.style.display = "none";
        }, 2000);
      }
    });

    audioElement.addEventListener("ended", () => {
      playIcon.src = imageLinks["play-icon"];
      bubble.classList.add("hidden");

      setTimeout(() => {
        profileAndBubble.style.transition = "opacity 2s ease";
        profileAndBubble.style.opacity = "0";
      }, 5000);

      setTimeout(() => {
        profileAndBubble.style.transition = "height 2s ease";
        profileAndBubble.style.height = "0px";
      }, 7000);

      setTimeout(() => {
        profileAndBubble.style.display = "none";
      }, 9500);
    });
  });
});
