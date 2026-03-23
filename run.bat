@echo off
echo ========================================
echo    SISTEMA AVANCADO - NOVA APP
echo ========================================
echo.

echo Verificando Java...
java -version
if %errorlevel% neq 0 (
    echo ERRO: Java nao encontrado. Instale Java 17+ primeiro.
    pause
    exit /b 1
)

echo.
echo Verificando Maven...
mvn --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERRO: Maven nao encontrado.
    echo Baixe em: https://maven.apache.org/download.cgi
    echo Extraia e adicione ao PATH
    pause
    exit /b 1
)

echo.
echo Iniciando Backend Spring Boot...
echo Acesse: http://localhost:8080
echo Console H2: http://localhost:8080/h2-console
echo.

cd backend
mvn spring-boot:run

pause