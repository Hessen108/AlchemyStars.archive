document.addEventListener("DOMContentLoaded", () => {
  const audioContainers = document.querySelectorAll('.audio-container'); 
  const imageLinks = {
    "play-icon": "https://raw.githubusercontent.com/Hessen108/AlchemyStars.archive/main/play.png",
    "stop-icon": "https://raw.githubusercontent.com/Hessen108/AlchemyStars.archive/main/stop.png"
  };

  // 프로필 이미지를 미리 불러오기
  const profileImageLinks = {};

  audioContainers.forEach((container, index) => {
    const playButton = container.querySelector('.custom-play-button');
    const audioElement = container.querySelector('audio');
    const profileAndBubble = container.querySelector('.profile-and-bubble'); // profile-and-bubble 선택
    const bubble = profileAndBubble.querySelector('.speech-bubble');
    const text = bubble.querySelector('.speech-text'); // bubble 안에 있는 텍스트
    const playIcon = container.querySelector('.play-icon'); // img 선택자
    const content = container.getAttribute('data-content'); // content 정의
    const profileImageURL = container.getAttribute('data-profile'); // 프로필 이미지 URL 가져오기
    
    // 프로필 이미지가 이미 로드되지 않았다면, 미리 로드
    if (!profileImageLinks[profileImageURL]) {
      const profileImage = new Image();
      profileImage.src = profileImageURL;
      profileImageLinks[profileImageURL] = profileImage; // 이미지를 캐시
    }

    // play 아이콘 설정
    playIcon.src = imageLinks["play-icon"];  // 초기 play 이미지 설정
    playIcon.alt = "Play Icon";
    playButton.appendChild(playIcon);

    // 프로필 이미지 설정
    const profileImgDiv = bubble.querySelector('.profile-img');
    const profileImg = document.createElement('img');
    profileImg.src = profileImageLinks[profileImageURL].src; // 캐시된 프로필 이미지 사용
    profileImg.alt = "Profile Image";
    profileImg.style.width = "40px"; // 원하는 크기 조정
    profileImg.style.height = "40px"; // 원하는 크기 조정
    profileImg.style.borderRadius = "50%"; // 원형으로 만들기
    profileImgDiv.appendChild(profileImg);

    playButton.addEventListener("click", () => {
      if (audioElement.paused) {
        audioElement.play();
        playIcon.src = imageLinks["stop-icon"];
        
        // 프로필과 말풍선 표시
        profileAndBubble.style.display = "flex"; // profile-and-bubble을 flex로 표시
        bubble.classList.remove("hidden"); // hidden 클래스 제거

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
          profileAndBubble.style.display = "none"; // 오디오가 일시정지되면 profile-and-bubble을 숨김
        }, 2000);
      }
    });

    audioElement.addEventListener("ended", () => {
      playIcon.src = imageLinks["play-icon"];
      bubble.classList.add("hidden");

      // 5초 후에 opacity가 0으로 바뀌기 시작
      setTimeout(() => {
        profileAndBubble.style.transition = "opacity 2s ease";
        profileAndBubble.style.opacity = "0"; // 흐려지기
      }, 5000);

      // opacity가 0으로 흐려진 후에 height를 0으로 줄이기
      setTimeout(() => {
        profileAndBubble.style.transition = "height 2s ease";
        profileAndBubble.style.height = "0px"; // 세로 길이를 0으로 줄임
      }, 7000); // opacity 변경 후 7초 뒤에 height 변경

      // 2초 후에 profile-and-bubble을 완전히 숨기기
      setTimeout(() => {
        profileAndBubble.style.display = "none";
      }, 9500); // 2초 후에 완전히 숨겨짐
    });
  });
});
