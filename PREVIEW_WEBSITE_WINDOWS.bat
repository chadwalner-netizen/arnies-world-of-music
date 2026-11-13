@echo off
cd /d "%~dp0"
echo Starting Arnie website preview at http://localhost:8765
start "" "http://localhost:8765/video-library.html"
py -3 -m http.server 8765
if errorlevel 1 python -m http.server 8765
pause
