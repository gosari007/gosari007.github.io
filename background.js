// 하단 이미지 처리 스크립트
document.addEventListener('DOMContentLoaded', function() {
  console.log("하단 이미지 처리 스크립트 실행");
  
  let gameBottomImageShown = false; // 이미지가 한 번 보여졌는지 추적
  let gameInProgress = false; // 게임 진행 상태 추적
  
  // 게임 하단 이미지 요소
  const gameBottomContainer = document.getElementById('gameBottomImageContainer');
  const gameBottomImage = document.getElementById('gameBottomImage');
  
  if (!gameBottomContainer || !gameBottomImage) {
    console.error("게임 하단 이미지 요소를 찾을 수 없음");
    return;
  }
  
  // 하단 이미지 표시 함수 (부드러운 애니메이션)
  function showBottomImage() {
    if (!gameBottomImageShown && gameInProgress) {
      console.log("첫 번째 폭발 - 하단 이미지 부드럽게 표시");
      
      // 컨테이너를 먼저 표시하고 애니메이션 클래스 추가
      gameBottomContainer.style.display = 'block';
      
      // 약간의 지연 후 애니메이션 시작 (브라우저가 스타일을 적용할 시간)
      setTimeout(() => {
        gameBottomContainer.classList.add('show');
      }, 10);
      
      gameBottomImageShown = true;
    }
  }
  
  // 하단 이미지 숨김 함수 (부드러운 애니메이션)
  function hideBottomImage() {
    console.log("게임 종료 - 하단 이미지 부드럽게 숨김");
    
    // 애니메이션 클래스 제거
    gameBottomContainer.classList.remove('show');
    
    // 애니메이션이 완료된 후 실제로 숨김
    setTimeout(() => {
      gameBottomContainer.style.display = 'none';
    }, 2000); // 2초 후
    
    gameBottomImageShown = false;
    gameInProgress = false;
  }
  
  // 게임 시작 감지
  function onGameStart() {
    console.log("게임 시작 감지");
    gameInProgress = true;
    gameBottomImageShown = false;
  }
  
  // 게임 관련 버튼 이벤트 리스너
  const startBtn = document.getElementById('startBtn');
  const stopBtn = document.getElementById('stopBtn');
  
  if (startBtn) {
    startBtn.addEventListener('click', onGameStart);
  }
  
  if (stopBtn) {
    stopBtn.addEventListener('click', hideBottomImage);
  }
  
  // 전역 함수로 노출 - 게임 스크립트에서 호출할 수 있도록
  window.showGameBottomImage = showBottomImage;
  window.hideGameBottomImage = hideBottomImage;
  window.onGameStart = onGameStart;
  
  // 이미지 변경 함수 (기존 기능 유지)
  window.changeBottomImage = function(imagePath) {
    console.log("하단 이미지 변경:", imagePath);
    if (gameBottomImage) {
      gameBottomImage.src = imagePath;
    } else {
      console.error("이미지 요소를 찾을 수 없음");
    }
  };
  
  // 편의 함수 - 번호로 이미지 변경
  window.setBottomImageByNumber = function(number) {
    const imagePath = `images/bottom/${number}.jpg`;
    console.log("📷 하단 이미지 번호로 변경:", number, "→", imagePath);
    window.changeBottomImage(imagePath);
  };
  
  console.log("하단 이미지 게임 연동 설정 완료");
});
