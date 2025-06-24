// 문장 미디어(이미지/비디오) 관련 함수
function showSentenceImage(sentenceIndex) {
  // 홀수 번호 문장만 미디어 표시 (실제 인덱스는 0부터 시작하므로 짝수 인덱스가 홀수 번호 문장임)
  const realSentenceNumber = sentenceIndex + 1; // 1부터 시작하는 실제 문장 번호
  
  // 새로운 홀수 번호 문장이 시작될 때 이전 미디어 숨기기
  if (realSentenceNumber % 2 === 1) {
    // 이전 미디어가 있다면 먼저 숨기기
    const sentenceImageContainer = document.getElementById('sentenceImageContainer');
    if (sentenceImageContainer && sentenceImageContainer.style.display === 'block') {
      hideSentenceImage();
      
      // 미디어가 완전히 사라진 후 새 미디어 표시
      setTimeout(() => {
        showNewSentenceMedia(realSentenceNumber);
      }, 1600); // 1.5초 사라짐 애니메이션 + 0.1초 여유
    } else {
      // 이전 미디어가 없다면 바로 새 미디어 표시
      showNewSentenceMedia(realSentenceNumber);
    }
  }
}

async function showNewSentenceMedia(realSentenceNumber) {
  const sentenceImageContainer = document.getElementById('sentenceImageContainer');
  const sentenceImage = document.getElementById('sentenceImage');
  const sentenceVideo = document.getElementById('sentenceVideo');
  
  if (!sentenceImageContainer || !sentenceImage || !sentenceVideo) {
    console.error('필요한 DOM 요소를 찾을 수 없습니다.');
    return;
  }

  // 지원되는 파일 확장자 목록 (우선순위 순)
  const extensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.mp4', '.webm', '.mov'];
  
  // 모든 미디어 요소 초기화
  sentenceImage.classList.remove('show');
  sentenceVideo.classList.remove('show');
  sentenceImage.style.display = 'none';
  sentenceVideo.style.display = 'none';
  
  // 파일 존재 여부 확인 함수
  function checkFileExists(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }

  // 비디오 파일 존재 여부 확인 함수
  function checkVideoExists(url) {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.onloadedmetadata = () => resolve(true);
      video.onerror = () => resolve(false);
      video.src = url;
    });
  }

  // 각 확장자를 순서대로 확인
  for (const ext of extensions) {
    const filePath = `images/${realSentenceNumber}${ext}`;
    
    let fileExists = false;
    
    // 이미지 파일인지 비디오 파일인지 확인
    if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
      fileExists = await checkFileExists(filePath);
      
      if (fileExists) {
        // 이미지 표시
        showImageMedia(sentenceImage, sentenceImageContainer, filePath);
        return;
      }
    } else if (['.mp4', '.webm', '.mov'].includes(ext)) {
      fileExists = await checkVideoExists(filePath);
      
      if (fileExists) {
        // 비디오 표시
        showVideoMedia(sentenceVideo, sentenceImageContainer, filePath);
        return;
      }
    }
  }
  
  // 어떤 미디어도 찾지 못한 경우
  console.log(`문장 ${realSentenceNumber}에 해당하는 미디어 파일을 찾을 수 없습니다.`);
  sentenceImageContainer.style.display = 'none';
}

function showImageMedia(imageElement, container, filePath) {
  imageElement.src = filePath;
  
  imageElement.onload = function() {
    // 스타일 적용
    imageElement.style.border = 'none';
    imageElement.style.outline = 'none';
    imageElement.style.display = 'block';
    container.style.display = 'block';
    
    // 애니메이션 시작
    setTimeout(() => {
      imageElement.classList.add('show');
    }, 50);
  };
  
  imageElement.onerror = function() {
    console.error(`이미지 로드 실패: ${filePath}`);
    container.style.display = 'none';
  };
}

function showVideoMedia(videoElement, container, filePath) {
  videoElement.src = filePath;
  
  videoElement.onloadedmetadata = function() {
    // 스타일 적용
    videoElement.style.border = 'none';
    videoElement.style.outline = 'none';
    videoElement.style.display = 'block';
    container.style.display = 'block';
    
    // 애니메이션 시작
    setTimeout(() => {
      videoElement.classList.add('show');
    }, 50);
  };
  
  videoElement.onerror = function() {
    console.error(`비디오 로드 실패: ${filePath}`);
    container.style.display = 'none';
  };
}

function hideSentenceImage() {
  const sentenceImageContainer = document.getElementById('sentenceImageContainer');
  const sentenceImage = document.getElementById('sentenceImage');
  const sentenceVideo = document.getElementById('sentenceVideo');
  
  if (sentenceImageContainer && sentenceImage && sentenceVideo) {
    // 애니메이션 클래스 제거하여 사라지는 효과 적용
    sentenceImage.classList.remove('show');
    sentenceVideo.classList.remove('show');
    
    // 비디오 정지
    if (!sentenceVideo.paused) {
      sentenceVideo.pause();
    }
    
    // 애니메이션 완료 후 컨테이너 숨기기
    setTimeout(() => {
      sentenceImageContainer.style.display = 'none';
      sentenceImage.style.display = 'none';
      sentenceVideo.style.display = 'none';
    }, 1500); // 1.5초 후 완전히 숨김
  }
}

// 미디어 초기화
document.addEventListener('DOMContentLoaded', function() {
  hideSentenceImage();
});
