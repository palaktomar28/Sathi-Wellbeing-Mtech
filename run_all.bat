@echo off
setlocal
title saathi-wellbeing (Full-Stack Launch)

echo ======================================================================
echo   saathi-wellbeing - Launching Full-Stack Platform
echo   1. FastAPI ML Server: http://127.0.0.1:8000
echo   2. React + Vite Frontend: http://127.0.0.1:5173
echo ======================================================================
echo.

set "PATH=C:\Program Files\nodejs;%PATH%"

:: 1. Start Backend in separate window
start "saathi-wellbeing Backend" cmd /k "cd /d "%~dp0" && run_app.bat"

:: 2. Wait 2 seconds for backend initialization
timeout /t 2 /nobreak >nul

:: 3. Start Frontend in separate window
start "saathi-wellbeing Frontend" cmd /k "cd /d "%~dp0frontend" && npm run dev -- --host 127.0.0.1"

:: 4. Open Vite App in Browser
timeout /t 2 /nobreak >nul
start "" http://127.0.0.1:5173

echo.
echo [✓] Both servers launched!
echo     Vite Frontend: http://127.0.0.1:5173
echo     FastAPI Backend: http://127.0.0.1:8000
echo.
pause

