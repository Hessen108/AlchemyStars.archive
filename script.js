document.addEventListener("DOMContentLoaded", () => {
  // 각 오디오 파일에 대해 재생 버튼을 클릭하면 음성 재생 및 말풍선 표시
  const audioContainers = document.querySelectorAll('.audio-container'); // 모든 오디오 컨테이너 선택

  audioContainers.forEach((container, index) => {
    const playButton = container.querySelector('.custom-play-button');
    const iframe = container.querySelector('iframe'); // iframe을 통해 구글 드라이브 음성 파일 재생
    const bubble = document.getElementById(`bubble${index}`);
    const text = document.getElementById(`text${index}`);

    // 각 컨테이너에서 data 속성 가져오기
    const title = container.getAttribute('data-title');
    const content = container.getAttribute('data-content');
    const audioLink = container.getAttribute('data-link'); // 음성 파일 링크

    playButton.addEventListener("click", () => {
      // 버튼이 재생 중일 때
      if (iframe.style.display === 'none' || iframe.paused) {
        iframe.style.display = 'block'; // iframe 표시
        const driveId = extractDriveId(audioLink);
        if (driveId) {
          iframe.src = `https://drive.google.com/file/d/${driveId}/preview`; // 구글 드라이브 음성 파일 링크 업데이트
        } else {
          console.error("구글 드라이브 ID 추출 실패");
        }
        playButton.innerHTML = "<span>■</span>";  // 버튼을 '■'로 변경

        // 구글 드라이브 제공 재생 버튼도 클릭
        const googlePlayButton = iframe.contentWindow.document.querySelector('.goog-imageless-button'); // 구글 재생 버튼 찾기
        if (googlePlayButton) {
          googlePlayButton.click();  // 구글 재생 버튼 클릭
        }

        // 말풍선 표시
        bubble.style.display = "flex";
        text.innerHTML = ""; // 텍스트 초기화

        // 타이핑 효과
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
        iframe.style.display = 'none';  // 음성 정지 시 iframe 숨김
        playButton.innerHTML = "<span>▶</span>";  // 버튼을 '▶'로 변경
        bubble.style.display = "none";  // 음성 정지 시 말풍선 숨김
      }
    });
  });
});

// 구글 드라이브 링크에서 파일 ID 추출 함수
function extractDriveId(link) {
  const regex = /(?:\/d\/|\/files\/)(.*?)(?:\/|$)/;
  const match = link.match(regex);
  return match ? match[1] : null;
}
