document.querySelectorAll(".custom-play-button").forEach((button, index) => {
    const audio = document.getElementById(`audio${index}`);
    const bubble = document.getElementById(`bubble${index}`);
    const text = document.getElementById(`text${index}`);
    
    // 버튼 클릭 이벤트
    button.addEventListener("click", function () {
        if (audio.paused) {
            audio.play();
            button.innerHTML = "■"; // 재생 중일 때 버튼 모양 변경
            bubble.style.display = "flex"; // 말풍선 표시
            text.innerHTML = ""; // 텍스트 초기화

            // 스크립트 애니메이션
            const script = text.getAttribute("data-script") || text.innerHTML;
            let i = 0;
            const interval = setInterval(() => {
                if (i < script.length) {
                    text.innerHTML += script.charAt(i);
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, 100); // 100ms마다 한 글자씩 표시
        } else {
            audio.pause();
            button.innerHTML = "▶"; // 정지 시 버튼 모양 변경
            bubble.style.display = "none"; // 말풍선 숨기기
        }
    });

    // 재생 종료 시 이벤트
    audio.addEventListener("ended", function () {
        button.innerHTML = "▶"; // 재생 완료 후 버튼 초기화
        bubble.style.display = "none"; // 말풍선 숨기기
    });
});

