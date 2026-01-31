@echo off
TITLE Push to GitHub
CLS

ECHO ==========================================================
ECHO      Pushing to GitHub Repository
ECHO ==========================================================
ECHO.

:: Try to find Git in common locations
SET "GIT_CMD=git"

:: Check if git is in PATH
git --version >nul 2>&1
IF %ERRORLEVEL% EQ 0 (
    ECHO [INFO] Git found in PATH
    GOTO :RUN_GIT
)

:: Try common installation paths
IF EXIST "C:\Program Files\Git\bin\git.exe" (
    SET "GIT_CMD=C:\Program Files\Git\bin\git.exe"
    ECHO [INFO] Git found at: C:\Program Files\Git\bin\git.exe
    GOTO :RUN_GIT
)

IF EXIST "C:\Program Files (x86)\Git\bin\git.exe" (
    SET "GIT_CMD=C:\Program Files (x86)\Git\bin\git.exe"
    ECHO [INFO] Git found at: C:\Program Files (x86)\Git\bin\git.exe
    GOTO :RUN_GIT
)

ECHO [ERROR] Git is NOT found!
ECHO.
ECHO Please either:
ECHO   1. Restart this terminal/PowerShell after installing Git
ECHO   2. Add Git to your PATH manually
ECHO   3. Or install Git from https://git-scm.com/downloads
ECHO.
PAUSE
EXIT /B

:RUN_GIT
ECHO.

:: Initialize repository
ECHO [1/5] Initializing Git repository...
"%GIT_CMD%" init

:: Add all files
ECHO [2/5] Adding files...
"%GIT_CMD%" add .

:: Commit
ECHO [3/5] Creating commit...
"%GIT_CMD%" commit -m "Initial commit: Selenium to Playwright converter with Local LLM (Qwen2.5:3b)"

:: Add remote (ignore error if already exists)
ECHO [4/5] Adding remote repository...
"%GIT_CMD%" remote add origin https://github.com/NiteshBawane/Selenium-2-Playwright-Converter-with-Local-LLM.git 2>nul

:: Push
ECHO [5/5] Pushing to GitHub...
"%GIT_CMD%" branch -M main
"%GIT_CMD%" push -u origin main

IF %ERRORLEVEL% EQ 0 (
    ECHO.
    ECHO ========================================
    ECHO [SUCCESS] Code pushed to GitHub! 🚀
    ECHO ========================================
    ECHO.
    ECHO View at: https://github.com/NiteshBawane/Selenium-2-Playwright-Converter-with-Local-LLM
) ELSE (
    ECHO.
    ECHO [WARNING] Push failed. This might be because:
    ECHO   - The repository already exists (try: git push -f origin main)
    ECHO   - You need to authenticate with GitHub
    ECHO   - Network issues
    ECHO.
    ECHO You can manually run:
    ECHO   "%GIT_CMD%" push -f origin main
)

ECHO.
PAUSE
