@echo off
echo VS Code 편집을 위한 로컬 작업본 생성...
echo 기존 파일을 로컬 작업 폴더에 복사합니다...

xcopy "g:\내 드라이브\vswork테스트\gpt31\script.js" "g:\내 드라이브\vswork테스트\gpt31\localcopy\" /Y
xcopy "g:\내 드라이브\vswork테스트\gpt31\index.html" "g:\내 드라이브\vswork테스트\gpt31\localcopy\" /Y
xcopy "g:\내 드라이브\vswork테스트\gpt31\style.css" "g:\내 드라이브\vswork테스트\gpt31\localcopy\" /Y
xcopy "g:\내 드라이브\vswork테스트\gpt31\settings.json" "g:\내 드라이브\vswork테스트\gpt31\localcopy\" /Y

echo 로컬 작업본 생성 완료!
echo "localcopy" 폴더 안의 파일을 편집하세요.
echo 편집 완료 후 "copy-back.bat"을 실행하여 원본 폴더로 복사하세요.

pause
