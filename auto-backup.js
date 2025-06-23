// 고급 자동 백업 스크립트
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// 백업할 중요 파일 목록과 체크섬 정보
const filesToBackup = [
  'script.js',
  'index.html',
  'style.css',
  'settings.json'
];

// 파일 체크섬 저장
const checksums = {};

// 백업 폴더 생성 - 숨김 폴더로 사용
const backupDir = path.join(__dirname, '.backup');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir);
}

// 파일 체크섬 계산
function calculateChecksum(filePath) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const hashSum = crypto.createHash('sha256');
    hashSum.update(fileBuffer);
    return hashSum.digest('hex');
  } catch (error) {
    console.error(`체크섬 계산 실패: ${filePath}`, error);
    return '';
  }
}

// 백업 함수 - 변경된 파일만 백업
function backupFiles() {
  const timestamp = new Date().toISOString().replace(/[:\.T]/g, '-').slice(0, -5);
  let backupCount = 0;
  
  filesToBackup.forEach(file => {
    const sourcePath = path.join(__dirname, file);
    
    // 파일이 존재하는 경우만 백업 체크
    if (fs.existsSync(sourcePath)) {
      // 현재 체크섬 계산
      const currentChecksum = calculateChecksum(sourcePath);
      
      // 파일이 변경된 경우에만 백업
      if (currentChecksum && (!checksums[file] || checksums[file] !== currentChecksum)) {
        // 백업 파일 경로 설정
        const fileDir = path.join(backupDir, path.basename(file, path.extname(file)));
        if (!fs.existsSync(fileDir)) {
          fs.mkdirSync(fileDir);
        }
        
        const backupFileName = `${path.basename(file, path.extname(file))}_${timestamp}${path.extname(file)}`;
        const backupPath = path.join(fileDir, backupFileName);
        
        // 파일 복사
        try {
          fs.copyFileSync(sourcePath, backupPath);
          checksums[file] = currentChecksum;
          console.log(`백업 완료: ${file} -> ${backupFileName}`);
          backupCount++;
          
          // 최근 10개 파일만 유지
          cleanupOldBackups(fileDir, 10);
        } catch (error) {
          console.error(`백업 실패: ${file}`, error);
        }
      }
    }
  });
  
  if (backupCount === 0) {
    console.log(`${new Date().toLocaleTimeString()} - 변경된 파일 없음. 백업 불필요.`);
  } else {
    console.log(`${new Date().toLocaleTimeString()} - ${backupCount}개 파일 백업 완료.`);
  }
}

// 오래된 백업 파일 정리
function cleanupOldBackups(directory, maxFiles) {
  try {
    const files = fs.readdirSync(directory)
      .filter(file => fs.statSync(path.join(directory, file)).isFile())
      .sort((a, b) => {
        return fs.statSync(path.join(directory, b)).mtime.getTime() - 
               fs.statSync(path.join(directory, a)).mtime.getTime();
      });
    
    if (files.length > maxFiles) {
      files.slice(maxFiles).forEach(file => {
        fs.unlinkSync(path.join(directory, file));
        console.log(`오래된 백업 파일 삭제: ${file}`);
      });
    }
  } catch (error) {
    console.error(`백업 파일 정리 실패: ${directory}`, error);
  }
}

// 2분마다 백업 실행
const BACKUP_INTERVAL = 2 * 60 * 1000; 
setInterval(backupFiles, BACKUP_INTERVAL);

// 처음 시작할 때 한번 실행
backupFiles();

// 비정상 종료 시에도 백업 실행
process.on('SIGINT', () => {
  console.log('프로그램 종료 감지, 마지막 백업 실행...');
  backupFiles();
  process.exit();
});

console.log('고급 자동 백업 시스템 시작됨 - 2분마다 변경된 파일 자동 백업');
console.log('백업 저장 위치: ' + backupDir);
