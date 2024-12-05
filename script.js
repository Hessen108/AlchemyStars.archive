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
    console.log(profileAndBubble);

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
    
    let interval; // 전역 변수로 선언하여 setInterval과 clearInterval 모두 참조 가능
    let i = 0; // 전역 변수로 인덱스를 관리
    
    playButton.addEventListener("click", () => {
      if (audioElement.paused) {
        audioElement.play();
        playIcon.src = imageLinks["stop-icon"];
        profileAndBubble.style.display = "flex";
        profileAndBubble.style.opacity = "1"; 
        profileAndBubble.style.height = "auto";

        text.innerHTML = "";
        i = 0;
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
	audioElement.currentTime = 0;
        playIcon.src = imageLinks["play-icon"];
        clearInterval(interval);
	 i = 0;
      setTimeout(() => {
        profileAndBubble.style.transition = "opacity 2s ease";
        profileAndBubble.style.opacity = "0";
	text.innerHTML = "";
      }, 2000);
	

      setTimeout(() => {
        profileAndBubble.style.transition = "height 2s ease";
        profileAndBubble.style.height = "0px";
      }, 4000);
      }
    });

    audioElement.addEventListener("ended", () => {
      playIcon.src = imageLinks["play-icon"];
      clearInterval(interval); // 애니메이션 종료
      i = 0; // 인덱스 초기화
      text.innerHTML = ""; // 텍스트 초기화

      setTimeout(() => {
        profileAndBubble.style.transition = "opacity 2s ease";
        profileAndBubble.style.opacity = "0";
      }, 5000);

      setTimeout(() => {
        profileAndBubble.style.transition = "height 2s ease";
        profileAndBubble.style.height = "0px";
      }, 7000);
    });
  });
});
