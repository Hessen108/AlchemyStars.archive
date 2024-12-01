document.addEventListener("DOMContentLoaded", () => {
  // 각 오디오 파일에 대해 재생 버튼을 클릭하면 음성 재생 및 말풍선 표시
  characterData.forEach((data, index) => {
    const playButton = document.getElementById(`playButton${index}`);
    const audio = document.getElementById(`audio${index}`);
    const bubble = document.getElementById(`bubble${index}`);
    const text = document.getElementById(`text${index}`);

    playButton.addEventListener("click", () => {
      // 버튼이 재생 중일 때
      if (audio.paused) {
        audio.play();
        playButton.innerHTML = "<span>■</span>";  // 버튼을 '■'로 변경

        // 말풍선 표시
        bubble.style.display = "flex";
        text.innerHTML = ""; // 텍스트 초기화

        // 타이핑 효과
        const script = data.content;  // 대사 내용 가져오기
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
        audio.pause();
        playButton.innerHTML = "<span>▶</span>";  // 버튼을 '▶'로 변경
        bubble.style.display = "none";  // 음성 정지 시 말풍선 숨김
      }
    });
  });
});
