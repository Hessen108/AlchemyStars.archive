document.addEventListener("DOMContentLoaded", () => {
  const audioContainers = document.querySelectorAll('.audio-container'); 
  const imageLinks = {
    "play-icon": "https://raw.githubusercontent.com/Hessen108/AlchemyStars.archive/main/play.png",
    "stop-icon": "https://raw.githubusercontent.com/Hessen108/AlchemyStars.archive/main/stop.png"
  };

  // 프로필 이미지 사전 로드
  const profileImageLinks = {};

  audioContainers.forEach((container, index) => {
    const playButton = container.querySelector('.custom-play-button');
    const audioElement = container.querySelector('audio');
    const bubble = document.getElementById(`bubble${index}`);
    const text = document.getElementById(`text${index}`);
    const playIcon = container.querySelector('.play-icon');
    const profileAndBubble = document.querySelectorAll('.profile-and-bubble')[index]; // 수정된 부분
    const profileImageURL = container.getAttribute('data-profile');
    
    // 프로필 이미지 미리 로드
    if (!profileImageLinks[profileImageURL]) {
      const profileImage = new Image();
      profileImage.src = profileImageURL;
      profileImageLinks[profileImageURL] = profileImage;
    }

    playIcon.src = imageLinks["play-icon"];
    playIcon.alt = "Play Icon";

    const profileImg = profileAndBubble.querySelector('.profile-img');
    profileImg.src = profileImageLinks[profileImageURL].src;

    playButton.addEventListener("click", () => {
      if (audioElement.paused) {
        audioElement.play();
        playIcon.src = imageLinks["stop-icon"];
        profileAndBubble.style.display = "flex";
        profileAndBubble.style.opacity = "1";
        profileAndBubble.style.height = "auto";
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
