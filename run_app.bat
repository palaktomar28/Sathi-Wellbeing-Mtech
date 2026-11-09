@echo off
setlocal enabledelayedexpansion
title saathi-wellbeing -- A LITTLE SPACE FOR YOU

echo ======================================================================
echo   saathi-wellbeing - A LITTLE SPACE FOR YOU
echo   Student Mental Health Screening (Indian Universities & DAVV Indore)
echo ======================================================================
echo.

:: 1. Search for available Python executable
set PYTHON_CMD=

:: Check py launcher
where py >nul 2>&1
if %ERRORLEVEL% equ 0 (
    py -c "import uvicorn, fastapi" >nul 2>&1
    if !ERRORLEVEL! equ 0 (
        set "PYTHON_CMD=py"
        goto :FOUND
    )
)

:: Check standard python in PATH
where python >nul 2>&1
if %ERRORLEVEL% equ 0 (
    python -c "import uvicorn, fastapi" >nul 2>&1
    if !ERRORLEVEL! equ 0 (
        set "PYTHON_CMD=python"
        goto :FOUND
    )
)

:: Check Anaconda
if exist "C:\ProgramData\anaconda3\python.exe" (
    "C:\ProgramData\anaconda3\python.exe" -c "import uvicorn, fastapi" >nul 2>&1
    if !ERRORLEVEL! equ 0 (
        set "PYTHON_CMD=C:\ProgramData\anaconda3\python.exe"
        goto :FOUND
    )
)

:: Check PythonCore in AppData
if exist "%LOCALAPPDATA%\Python\pythoncore-3.14-64\python.exe" (
    "%LOCALAPPDATA%\Python\pythoncore-3.14-64\python.exe" -c "import uvicorn, fastapi" >nul 2>&1
    if !ERRORLEVEL! equ 0 (
        set "PYTHON_CMD=%LOCALAPPDATA%\Python\pythoncore-3.14-64\python.exe"
        goto :FOUND
    )
)

:: If uvicorn/fastapi not found, attempt install
echo [*] Missing dependencies detected. Installing requirements...
where py >nul 2>&1
if %ERRORLEVEL% equ 0 (
    py -m pip install -r requirements.txt
    set "PYTHON_CMD=py"
    goto :FOUND
)

where python >nul 2>&1
if %ERRORLEVEL% equ 0 (
    python -m pip install -r requirements.txt
    set "PYTHON_CMD=python"
    goto :FOUND
)

echo [!] Could not locate a working Python installation.
echo     Please install Python 3.10+ from python.org or run with Anaconda.
pause
exit /b 1

:FOUND
echo [*] Using Python: %PYTHON_CMD%
echo [*] Starting saathi-wellbeing on http://127.0.0.1:8000 ...
echo [*] Press Ctrl+C in this terminal to stop the server.
echo.

:: Open browser
start "" http://127.0.0.1:8000

:: Start server
"%PYTHON_CMD%" main.py

pause
