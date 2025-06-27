# 📁 미디어 파일 구조 가이드

## 📂 새로운 폴더 구조 (명확하게 구분)

```
images/
├── top/                      ← 상단 미디어 (게임 화면 위쪽)
│   ├── 1.jpg, 3.jpg...       ← 상단 이미지들
│   └── 1.mp4, 3.mp4...       ← 상단 동영상들 (홀수 번호만)
├── bottom/                   ← 하단 미디어 (게임 화면 아래쪽)
│   ├── 1.jpg, 2.jpg...       ← 하단 이미지들
│   └── 1.mp4, 2.mp4...       ← 하단 동영상들
└── (기타 파일들: 총알, 적, 배경 등)
```

## 🎯 **간단 정리**

### ✅ **새로운 방식 (명확함)**
- **상단 미디어**: `images/top/` 폴더에 넣기
  - `images/top/1.jpg`, `images/top/3.mp4` 등
- **하단 미디어**: `images/bottom/` 폴더에 넣기  
  - `images/bottom/1.jpg`, `images/bottom/1.mp4` 등

### 📋 **파일 배치 방법**

1. **상단용 파일들** → `images/top/` 폴더에 복사
   ```
   images/top/1.jpg     ← 문장 1번용 이미지
   images/top/3.jpg     ← 문장 3번용 이미지  
   images/top/1.mp4     ← 문장 1번용 동영상
   images/top/3.mp4     ← 문장 3번용 동영상
   ```

2. **하단용 파일들** → `images/bottom/` 폴더에 복사
   ```
   images/bottom/1.jpg   ← 하단 첫 번째 이미지
   images/bottom/1.mp4   ← 하단 첫 번째 동영상
   images/bottom/2.mp4   ← 하단 두 번째 동영상
   ```

## 🎮 JavaScript 사용법

### 하단 미디어 제어

```javascript
// 📷 하단 이미지 변경
setBottomImageByNumber(1)     // images/bottom/1.jpg 사용
setBottomImageByNumber(2)     // images/bottom/2.jpg 사용

// 🎬 하단 동영상 변경
setBottomVideoByNumber(1)     // images/bottom/1.mp4 사용
setBottomVideoByNumber(2)     // images/bottom/2.mp4 사용

// 📂 직접 경로 지정도 가능
changeBottomImage('images/bottom/special.jpg')
changeBottomVideo('images/bottom/special.mp4')
```

### 하단 동영상 제어

```javascript
playBottomVideo()           // 재생
pauseBottomVideo()          // 정지
toggleBottomVideoMute()     // 음소거 토글
getCurrentBottomMediaType() // 현재 타입 확인 ('image' 또는 'video')
```

### 상단 미디어 (자동 처리됨)

```javascript
// ⚠️ 상단 미디어는 게임에서 자동으로 처리됨
// 파일만 올바른 위치에 넣으면 됨:
// images/top/1.jpg  ← 문장 1번 이미지
// images/top/3.mp4  ← 문장 3번 동영상 (홀수 번호만)
```

**주의사항:**
- 상단 미디어는 문장 번호와 연동됨 (1.jpg = 문장1, 3.mp4 = 문장3)
- 동영상은 홀수 번호 문장에만 사용됨 (1, 3, 5, 7...)
- 파일명은 반드시 번호.확장자 형식 (1.jpg, 3.mp4)

## 📝 파일 이름 규칙

1. **상단**: `images/top/1.jpg`, `images/top/3.mp4` (문장 번호와 동일)
2. **하단**: `images/bottom/1.jpg`, `images/bottom/2.mp4` (자유롭게 번호 부여)
3. **확장자**: 이미지 `.jpg`, `.png` / 동영상 `.mp4`, `.webm`

## 🔄 동작 원리

- **상단**: 게임의 문장 번호와 자동 연동 (`sentenceImage.js`에서 처리)
  - 문장 1번 → `images/top/1.jpg` 또는 `images/top/1.mp4`
  - 문장 3번 → `images/top/3.jpg` 또는 `images/top/3.mp4`
- **하단**: 독립적인 미디어 (첫 번째 폭발 후 나타남, `background.js`에서 처리)
- **독립성**: 상단과 하단 동영상은 서로 영향을 주지 않음
- **터치 제어**: 각각 별도로 터치/클릭으로 제어 가능

## 🎯 실제 사용 예시

### 파일 배치 (새로운 구조)
```
images/
├── top/
│   ├── 1.jpg          ← 게임 문장 1번에서 자동 표시
│   ├── 3.mp4          ← 게임 문장 3번에서 자동 표시  
│   └── 5.jpg          ← 게임 문장 5번에서 자동 표시
└── bottom/
    ├── 1.mp4          ← 하단 동영상 1번
    └── 2.jpg          ← 하단 이미지 2번
```

### JavaScript 제어
```javascript
// 게임 시작 전에 하단 동영상 설정
setBottomVideoByNumber(1)  // bottom/1.mp4 사용

// 게임 중에 하단 이미지로 변경  
setBottomImageByNumber(2)  // bottom/2.jpg 사용
```
