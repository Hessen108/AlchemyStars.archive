document.addEventListener("DOMContentLoaded", () => {
  // 각 오디오 파일에 대해 재생 버튼을 클릭하면 음성 재생 및 말풍선 표시
  const audioContainers = document.querySelectorAll('.audio-container'); // 모든 오디오 컨테이너 선택

  audioContainers.forEach((container, index) => {
    const playButton = container.querySelector('.custom-play-button');
    const audio = container.querySelector('audio'); // audio 태그 선택
    const bubble = document.getElementById(`bubble${index}`);
    const text = document.getElementById(`text${index}`);
    const profileImg = container.querySelector('.profile-img'); // 프로필 이미지

    // 각 컨테이너에서 data 속성 가져오기
    const title = container.getAttribute('data-title');
    const content = container.getAttribute('data-content');
    const audioId = container.getAttribute('data-id'); // E열에서 추출된 구글 드라이브 ID
    const profileImageURL = container.getAttribute('data-profile'); // G열에서 프로필 이미지 URL

    // 프로필 이미지 설정
    profileImg.style.backgroundImage = `url(${profileImageURL})`;

    playButton.addEventListener("click", () => {
      // 오디오 재생 시작
      if (audio.paused) {
        audio.play();
        playButton.innerHTML = "<span>■</span>"; // 버튼 변경 (정지 버튼)
        bubble.style.display = "flex"; // 말풍선 표시
        text.innerHTML = ""; // 텍스트 초기화
        const script = content;  // 대사 내용 가져오기
        let i = 0;
        const interval = setInterval(() => {
          if (i < script.length) {
            text.innerHTML += script.charAt(i);  // 한 글자씩 출력
            i++;
          } else {
            clearInterval(interval);  // 모든 글자가 출력되면 종료
          }
        }, 100);  // 100ms마다 한 글자씩 나타냄
      } else {
        audio.pause();  // 오디오 정지
        playButton.innerHTML = "<span>▶</span>";  // 버튼을 '▶'로 변경
        bubble.style.display = "none";  // 음성 정지 시 말풍선 숨김
      }
    });
  });
});
