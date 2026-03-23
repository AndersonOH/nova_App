@echo off
echo ========================================
echo    MOBILE - NOVA APP (React Native)
echo ========================================
echo.

echo Verificando Node.js...
node --version
if %errorlevel% neq 0 (
    echo ERRO: Node.js nao encontrado.
    echo Baixe em: https://nodejs.org
    pause
    exit /b 1
)

echo.
echo Verificando npm...
npm --version
if %errorlevel% neq 0 (
    echo ERRO: npm nao encontrado.
    pause
    exit /b 1
)

echo.
echo Instalando dependencias...
cd mobile
npm install

echo.
echo Executando no Android...
echo Certifique-se de que o emulador esteja rodando
echo ou dispositivo conectado via USB
echo.
npx react-native run-android

pause