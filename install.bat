@echo off

REM Execute npm install
npm install

REM Check if npm install was successful
IF %ERRORLEVEL% NEQ 0 (
    echo npm install failed. Exiting.
    exit /b %ERRORLEVEL%
)

REM Execute npm build
npm run build

REM Check if npm build was successful
IF %ERRORLEVEL% NEQ 0 (
    echo npm build failed. Exiting.
    exit /b %ERRORLEVEL%
)

REM Execute npm start
npm start