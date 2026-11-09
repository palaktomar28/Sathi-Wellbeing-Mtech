@echo off
setlocal
title saathi-wellbeing -- Vite React Frontend (Port 5173)

echo ======================================================================
echo   saathi-wellbeing - Vite React Frontend Dev Server
echo   Running on: http://127.0.0.1:5173
echo ======================================================================
echo.

set "PATH=C:\Program Files\nodejs;%PATH%"

cd /d "%~dp0frontend"
npm run dev -- --host 127.0.0.1
pause

