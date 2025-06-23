// VS Code 워치독 스크립트
const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

// 감시할 파일 목록
const filesToWatch = [
  'script.js',
  'index.html',
  'style.css'
];

// 각 파일의 마지막 수정 시간
const lastModifiedTimes = {};

// 로컬과 원본 폴더
const originalDir = __dirname;
const localDir = path.join(__dirname, 'localcopy');

// 파일 마지막 수정 시간 확인
function checkFileModificationTimes() {
  filesToWatch.forEach(file => {
    const originalPath = path.join(originalDir, file);
    const localPath = path.join(localDir, file);
    
    try {
      // 원본 파일이 존재하는지 확인
      if (fs.existsSync(originalPath)) {
        const originalStats = fs.statSync(originalPath);
        const originalMtime = originalStats.mtimeMs;
        
        // 로컬 파일이 존재하는지 확인
        if (fs.existsSync(localPath)) {
          const localStats = fs.statSync(localPath);
          const localMtime = localStats.mtimeMs;
          
          // 로컬 파일이 더 최신인 경우 원본으로 복사
          if (localMtime > originalMtime) {
            console.log(`로컬 ${file}이 더 최신입니다. 원본으로 복사합니다...`);
            fs.copyFileSync(localPath, originalPath);
          }
          // 원본 파일이 더 최신인 경우 로컬로 복사
          else if (originalMtime > localMtime) {
            console.log(`원본 ${file}이 더 최신입니다. 로컬로 복사합니다...`);
            fs.copyFileSync(originalPath, localPath);
          }
        } 
        // 로컬 파일이 없는 경우 생성
        else {
          console.log(`로컬 ${file}이 없습니다. 생성합니다...`);
          fs.copyFileSync(originalPath, localPath);
        }
      }
    } catch (error) {
      console.error(`파일 동기화 오류 (${file}):`, error);
    }
  });
}

// 로컬 작업 폴더가 없으면 생성
if (!fs.existsSync(localDir)) {
  console.log('로컬 작업 폴더가 없습니다. 생성합니다...');
  fs.mkdirSync(localDir);
}

// 초기 파일 복사 (최초 실행 시)
console.log('파일 초기 동기화 중...');
checkFileModificationTimes();

// 30초마다 파일 상태 확인
const CHECK_INTERVAL = 30 * 1000; // 30초
setInterval(checkFileModificationTimes, CHECK_INTERVAL);

console.log('VS Code 워치독 시스템이 시작되었습니다.');
console.log('로컬 작업 폴더와 원본 폴더 간 파일이 자동으로 동기화됩니다.');
console.log('30초마다 파일 변경 사항을 확인하여 최신 상태로 유지합니다.');
