document.addEventListener("DOMContentLoaded", () => {
    const audioContainers = document.querySelectorAll('.audio-container');

    audioContainers.forEach((container, index) => {
        const playButton = container.querySelector('.custom-play-button');
        const iframe = container.querySelector('iframe');
        const bubble = document.getElementById(`bubble${index}`);
        const text = document.getElementById(`text${index}`);
        const profileImg = container.querySelector('.profile-img');

        // 데이터 속성 가져오기
        const content = container.getAttribute('data-content');
        const audioId = container.getAttribute('data-id');
        const profileImageURL = container.getAttribute('data-profile');

        // 프로필 이미지 설정
        profileImg.style.backgroundImage = `url(${profileImageURL})`;

        playButton.addEventListener("click", () => {
            iframe.src = `https://drive.google.com/uc?export=download&id=${audioId}`;
            iframe.style.display = "none";

            // Google Drive iframe은 CORS 문제로 내부 요소 접근이 불가능합니다.
            // iframe의 autoplay 속성을 사용하는 방법이 권장됩니다.
            if (iframe) {
                playButton.innerHTML = "<span>■</span>";
                bubble.style.display = "flex";
                startTypingEffect(text, content);
            } else {
                console.error("iframe content could not be loaded.");
            }
        });
    });
});

function startTypingEffect(element, text) {
    element.innerHTML = "";
    let i = 0;

    const interval = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
        }
    }, 100);
}
