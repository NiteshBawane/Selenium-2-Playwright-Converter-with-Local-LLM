@echo off
TITLE Selenium 2 Playwright - Node Launcher
CLS

ECHO ==========================================================
ECHO      Node.js Stack Launcher (Frontend + Backend)
ECHO ==========================================================
ECHO.

:: Force Path update for this session
SET "PATH=C:\Users\nites\.gemini\antigravity\node-v24.13.0-win-x64;%PATH%"

:: Check for Node.js
node -v >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    ECHO [ERROR] Node.js is still not found!
    ECHO Tried adding: C:\Users\nites\.gemini\antigravity\node-v24.13.0-win-x64
    PAUSE
    EXIT /B
)

ECHO [INFO] Verified Node.js is installed.

:: Install Backend Deps
IF NOT EXIST "node_modules" (
    ECHO [INFO] Installing Backend Dependencies...
    call npm install
)

:: Install Frontend Deps
IF NOT EXIST "ui\node_modules" (
    ECHO [INFO] Installing Frontend Dependencies...
    cd ui
    call npm install
    cd ..
)

ECHO.
ECHO [INFO] Starting Backend Server...
start "S2P Backend" cmd /k "set PATH=C:\Users\nites\.gemini\antigravity\node-v24.13.0-win-x64;%PATH% && node server.js"

ECHO [INFO] Starting Frontend...
cd ui
start "S2P Frontend" cmd /k "set PATH=C:\Users\nites\.gemini\antigravity\node-v24.13.0-win-x64;%PATH% && npm run dev"

ECHO.
ECHO [SUCCESS] Both servers are launching in new windows!
ECHO.
PAUSE
