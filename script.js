document.getElementById("audio1").addEventListener("play", function() {
    const bubble = document.getElementById("bubble0");  // 말풍선
    const text = document.getElementById("text0");  // 대사 텍스트

    // 말풍선 표시
    bubble.style.display = "flex";
    text.innerHTML = ""; // 텍스트 초기화

    // 이미 HTML에 포함된 음성 메시지 내용
    const script = text.innerHTML;  // 대사 텍스트 내용 가져오기
    let i = 0;

    // 음성 내용 표시 (시간차로)
    const interval = setInterval(() => {
        if (i < script.length) {
            text.innerHTML += script.charAt(i);  // 한 글자씩 출력
            i++;
        } else {
            clearInterval(interval);  // 모든 글자가 출력되면 종료
        }
    }, 100); // 100ms마다 한 글자씩 나타냄
});
