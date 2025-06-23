@echo off
echo 로컬 작업본을 원본 폴더로 복사합니다...

xcopy "g:\내 드라이브\vswork테스트\gpt31\localcopy\script.js" "g:\내 드라이브\vswork테스트\gpt31\" /Y
xcopy "g:\내 드라이브\vswork테스트\gpt31\localcopy\index.html" "g:\내 드라이브\vswork테스트\gpt31\" /Y
xcopy "g:\내 드라이브\vswork테스트\gpt31\localcopy\style.css" "g:\내 드라이브\vswork테스트\gpt31\" /Y
xcopy "g:\내 드라이브\vswork테스트\gpt31\localcopy\settings.json" "g:\내 드라이브\vswork테스트\gpt31\" /Y

echo 복사 완료!
echo 변경사항이 원본 폴더에 적용되었습니다.

pause
