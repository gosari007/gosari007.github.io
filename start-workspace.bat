@echo off
echo VS Code 작업 환경 최적화 시작...

echo 1. 자동 백업 시스템 시작...
start /b node auto-backup.js

echo 2. 워치독 시스템 시작...
start /b node watchdog.js

echo 3. 로컬 작업본 준비...
if not exist "localcopy" mkdir localcopy
xcopy "script.js" "localcopy\" /Y
xcopy "index.html" "localcopy\" /Y
xcopy "style.css" "localcopy\" /Y
xcopy "settings.json" "localcopy\" /Y

echo.
echo ====================================
echo VS Code 작업 환경이 준비되었습니다!
echo.
echo - 자동 백업: 2분마다 실행 (.backup 폴더)
echo - 워치독: 30초마다 파일 동기화
echo - 로컬 작업본: localcopy 폴더에 준비됨
echo.
echo localcopy 폴더 내의 파일을 편집하세요.
echo 변경사항은 자동으로 원본 폴더와 동기화됩니다.
echo ====================================
echo.

pause
