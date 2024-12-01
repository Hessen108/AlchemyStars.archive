document.addEventListener("DOMContentLoaded", () => {
  // 각 오디오 파일에 대해 재생 버튼을 클릭하면 음성 재생 및 말풍선 표시
  const audioContainers = document.querySelectorAll('.audio-container'); // 모든 오디오 컨테이너 선택

  audioContainers.forEach((container, index) => {
    const playButton = container.querySelector('.custom-play-button');
    const iframe = container.querySelector('iframe'); // iframe을 통해 구글 드라이브 음성 파일 재생
    const bubble = document.getElementById(`bubble${index}`);
    const text = document.getElementById(`text${index}`);
    const profileImg = container.querySelector('.profile-img'); //프로필 이미지

    // 각 컨테이너에서 data 속성 가져오기
    const title = container.getAttribute('data-title');
    const content = container.getAttribute('data-content');
    const audioId = container.getAttribute('data-id'); // E열에서 추출된 구글 드라이브 ID
    const profileImageURL = container.getAttribute('data-profile'); // G열에서 프로필 이미지 URL

    // 프로필 이미지 설정
    profileImg.style.backgroundImage = `url(${profileImageURL})`;

 playButton.addEventListener("click", () => {
    iframe.src = `https://drive.google.com/uc?export=download&id=${audioId}`;
    iframe.style.display = "none"; // iframe 숨기기 유지
    const iframeContent = iframe.contentWindow || iframe.contentDocument;
    
    if (iframeContent) {
        iframeContent.document.querySelector('button').click(); // iframe 내부의 재생 버튼을 클릭
        playButton.innerHTML = "<span>■</span>"; // 버튼 변경
        bubble.style.display = "flex";
        text.innerHTML = ""; // 텍스트 초기화
        const script = content;  // 대사 내용 가져오기
        startTypingEffect(text, content); // 타이핑 효과 시작
    } else {
        console.error("iframe content could not be loaded.");
        audio.pause();
        playButton.innerHTML = "<span>▶</span>";  // 버튼을 '▶'로 변경
        bubble.style.display = "none";  // 음성 정지 시 말풍선 숨김
      }
    });
  });
});

function startTypingEffect(element, text) {
    element.innerHTML = ""; // 텍스트 초기화
    let i = 0;

    const interval = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i); // 한 글자씩 추가
            i++;
        } else {
            clearInterval(interval); // 타이핑 완료 시 반복 종료
        }
    }, 100); // 100ms마다 한 글자 출력
}