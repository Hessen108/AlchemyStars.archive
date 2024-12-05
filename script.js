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
    const profileAndBubble = document.querySelector(`#profileAndBubble${index}`); 
    const bubble = profileAndBubble.querySelector('.speech-bubble');
    const text = bubble.querySelector('.speech-text');
    let playIcon = playButton.querySelector('img');

    const content = container.getAttribute('data-content');
    const profileImageURL = container.getAttribute('data-profile');

    if (!playIcon) {
      playIcon = document.createElement('img');
      playButton.appendChild(playIcon);
    }
    playIcon.src = imageLinks["play-icon"];
    playIcon.alt = "Play Icon";

    if (!profileImageLinks[profileImageURL]) {
      const profileImage = new Image();
      profileImage.src = profileImageURL;
      profileImageLinks[profileImageURL] = profileImage;
    }
    
    let interval;
    let i = 0;

    playButton.addEventListener("click", () => {
      if (audioElement.paused) {
        audioElement.play();
        playIcon.src = imageLinks["stop-icon"];
        profileAndBubble.style.display = "flex";
        profileAndBubble.style.opacity = "1"; 
        profileAndBubble.style.height = "auto";

        i = 0;
        text.innerHTML = "";
        interval = setInterval(() => {
          if (i < content.length) {
            text.innerHTML += content.charAt(i);
            i++;
          } else {
            clearInterval(interval);
          }
        }, 100);
      } else {
        audioElement.pause();
        audioElement.currentTime = 0;
        playIcon.src = imageLinks["play-icon"];
        clearInterval(interval);
        
        setTimeout(() => {
          profileAndBubble.style.transition = "opacity 2s ease";
          profileAndBubble.style.opacity = "0";

          setTimeout(() => {
            profileAndBubble.style.transition = "height 2s ease";
            profileAndBubble.style.height = "0px";

            setTimeout(() => {
              i = 0;
              text.innerHTML = "";
            }, 2000);
          }, 2000);
        }, 2000);
      }
    });

    audioElement.addEventListener("ended", () => {
      playIcon.src = imageLinks["play-icon"];
      clearInterval(interval);

      setTimeout(() => {
        profileAndBubble.style.transition = "opacity 2s ease";
        profileAndBubble.style.opacity = "0";

        setTimeout(() => {
          profileAndBubble.style.transition = "height 2s ease";
          profileAndBubble.style.height = "0px";

          setTimeout(() => {
            i = 0;
            text.innerHTML = "";
          }, 2000);
        }, 2000);
      }, 5000);
    });
  });
});
