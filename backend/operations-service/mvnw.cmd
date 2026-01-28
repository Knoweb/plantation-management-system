@echo off
setlocal

set MAVEN_PROJECTBASEDIR=%~dp0
if "%MAVEN_PROJECTBASEDIR:~-1%"=="\" set MAVEN_PROJECTBASEDIR=%MAVEN_PROJECTBASEDIR:~0,-1%

set MAVEN_DIR=.mvn
set WRAPPER_JAR=%MAVEN_DIR%\wrapper\maven-wrapper.jar
set WRAPPER_LAUNCHER=org.apache.maven.wrapper.MavenWrapperMain

set JAVA_EXE=java.exe
%JAVA_EXE% -version >NUL 2>&1
if "%ERRORLEVEL%"=="0" goto execute

echo Error: JAVA_HOME is not defined correctly.
echo   We cannot execute %JAVA_EXE%
goto fail

:execute
SET MAVEN_JAVA_EXE="%JAVA_EXE%"
set WRAPPER_URL="https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.3.2/maven-wrapper-3.3.2.jar"

if exist "%WRAPPER_JAR%" goto run
echo Downloading Maven Wrapper...
powershell -Command "(New-Object Net.WebClient).DownloadFile('%WRAPPER_URL%', '%WRAPPER_JAR%')"

:run
%MAVEN_JAVA_EXE% --enable-native-access=ALL-UNNAMED -Dmaven.multiModuleProjectDirectory="%MAVEN_PROJECTBASEDIR%" -Dstyle.color=never -Dmaven.color=false -classpath "%WRAPPER_JAR%" %WRAPPER_LAUNCHER% %*

:fail
exit /b 1
