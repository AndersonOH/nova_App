@echo off
echo ========================================
echo    SISTEMA AVANCADO - NOVA APP
echo ========================================
echo.
echo Escolha uma opcao:
echo [1] Executar Backend (Spring Boot)
echo [2] Executar Mobile (React Native)
echo [3] Compilar Backend
echo [4] Limpar builds
echo [5] Sair
echo.

set /p choice="Digite sua escolha (1-5): "

if "%choice%"=="1" goto backend
if "%choice%"=="2" goto mobile
if "%choice%"=="3" goto build
if "%choice%"=="4" goto clean
if "%choice%"=="5" goto exit

echo Opcao invalida!
pause
goto start

:backend
echo.
echo Executando Backend...
call run.bat
goto end

:mobile
echo.
echo Executando Mobile...
call run-mobile.bat
goto end

:build
echo.
echo Compilando Backend...
cd backend
mvn clean package
echo.
echo Build concluido! Arquivo JAR em backend/target/
pause
goto end

:clean
echo.
echo Limpando builds...
cd backend
mvn clean
if exist mobile\node_modules rmdir /s /q mobile\node_modules
echo.
echo Limpeza concluida!
pause
goto end

:exit
echo Ate logo!
goto end

:end