// 문장 이미지 관련 함수
function showSentenceImage(sentenceIndex) {
  // 홀수 번호 문장만 이미지 표시 (실제 인덱스는 0부터 시작하므로 짝수 인덱스가 홀수 번호 문장임)
  const realSentenceNumber = sentenceIndex + 1; // 1부터 시작하는 실제 문장 번호
  
  // 새로운 홀수 번호 문장이 시작될 때 이전 이미지 숨기기
  if (realSentenceNumber % 2 === 1) {
    // 이전 이미지가 있다면 먼저 숨기기
    const sentenceImageContainer = document.getElementById('sentenceImageContainer');
    if (sentenceImageContainer && sentenceImageContainer.style.display === 'block') {
      hideSentenceImage();
      
      // 이미지가 완전히 사라진 후 새 이미지 표시
      setTimeout(() => {
        showNewSentenceImage(realSentenceNumber);
      }, 1600); // 1.5초 사라짐 애니메이션 + 0.1초 여유
    } else {
      // 이전 이미지가 없다면 바로 새 이미지 표시
      showNewSentenceImage(realSentenceNumber);
    }
  }
}

function showNewSentenceImage(realSentenceNumber) {
  const sentenceImageContainer = document.getElementById('sentenceImageContainer');
  const sentenceImage = document.getElementById('sentenceImage');
  
  if (sentenceImageContainer && sentenceImage) {
    // 기존 애니메이션 클래스 제거
    sentenceImage.classList.remove('show');
    
    // 이미지 경로 설정 (홀수 번호 이미지만 존재)
    sentenceImage.src = `images/${realSentenceNumber}.jpg`;
    
    // 이미지 로드 이벤트
    sentenceImage.onload = function() {
      // 추가적인 스타일 적용으로 테두리 제거
      sentenceImage.style.border = 'none';
      sentenceImage.style.outline = 'none';
      sentenceImageContainer.style.display = 'block';
      
      // 약간의 지연 후 애니메이션 시작 (브라우저가 DOM 변경을 인식할 시간 제공)
      setTimeout(() => {
        sentenceImage.classList.add('show');
      }, 50);
    };
    
    sentenceImage.onerror = function() {
      // 이미지가 없으면 컨테이너를 숨김
      console.log(`이미지 ${realSentenceNumber}.jpg를 찾을 수 없습니다.`);
      sentenceImageContainer.style.display = 'none';
    };
  }
}

function hideSentenceImage() {
  const sentenceImageContainer = document.getElementById('sentenceImageContainer');
  const sentenceImage = document.getElementById('sentenceImage');
  if (sentenceImageContainer && sentenceImage) {
    // 애니메이션 클래스 제거하여 사라지는 효과 적용
    sentenceImage.classList.remove('show');
    
    // 애니메이션 완료 후 컨테이너 숨기기
    setTimeout(() => {
      sentenceImageContainer.style.display = 'none';
    }, 1500); // 1.5초 후 완전히 숨김
  }
}

// 이미지 초기화
document.addEventListener('DOMContentLoaded', function() {
  hideSentenceImage();
});
