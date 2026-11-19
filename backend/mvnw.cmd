@echo off
setlocal
where mvn >nul 2>nul
if %ERRORLEVEL% EQU 0 (
  mvn %*
  exit /b %ERRORLEVEL%
)
set MAVEN_VERSION=3.9.9
set DIST_DIR=.mvn\wrapper\dists\apache-maven-%MAVEN_VERSION%
set MAVEN_BIN=%DIST_DIR%\bin\mvn.cmd
if not exist "%MAVEN_BIN%" (
  powershell -NoProfile -Command "New-Item -ItemType Directory -Force -Path '%DIST_DIR%' | Out-Null; Invoke-WebRequest -UseBasicParsing -Uri 'https://archive.apache.org/dist/maven/maven-3/%MAVEN_VERSION%/binaries/apache-maven-%MAVEN_VERSION%-bin.zip' -OutFile '.mvn\wrapper\maven.zip'; Expand-Archive -Force '.mvn\wrapper\maven.zip' '.mvn\wrapper\maven-temp'; Copy-Item -Recurse -Force '.mvn\wrapper\maven-temp\apache-maven-%MAVEN_VERSION%\*' '%DIST_DIR%'"
)
"%MAVEN_BIN%" %*
