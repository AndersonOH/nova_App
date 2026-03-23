# Sistema Avançado One-Click

Projeto cross-platform completo com:

- Backend Java Spring Boot + WebSockets + H2
- Front-end Web (HTML/JS)
- Mobile Android/iOS (React Native)
- Chat em tempo real
- Feed multimídia (texto, foto, vídeo, áudio)
- Chamadas de áudio/vídeo via WebRTC

---

## 0️⃣ Atalhos Rápidos (Windows)

Para facilitar futuras modificações e execuções:

- **`start.bat`**: Menu principal com opções
- **`run.bat`**: Executa o backend diretamente
- **`run-mobile.bat`**: Executa o mobile diretamente

**Como usar:**
1. Clique duplo em `start.bat`
2. Escolha a opção desejada
3. Pronto!

---

## 1️⃣ Pré-requisitos

- Java 17+
- Maven
- Node.js 18+ / npm
- Android Studio (para Android)
- Xcode (para iOS, macOS)
- Firewall liberado para WebSocket (porta 8080)

---

## 2️⃣ Rodar Backend

cd backend
mvn spring-boot:run

- Acesse http://localhost:8080 para frontend web.  
- Banco H2 embutido em ./data/sistema.  
- Endpoints disponíveis:
  - /api/login, /api/cadastro
  - /api/addItem, /api/remItem, /api/listItens
  - WebSockets: /chat, /postagem, /signaling

---

## 3️⃣ Rodar Front-end Web

1. Abra navegador em http://localhost:8080  
2. Funcionalidades:
   - Login/Cadastro
   - Chat em tempo real
   - Lista de itens
   - Feed multimídia (texto, foto, vídeo, áudio)
   - Chamadas de áudio/vídeo WebRTC

---

## 4️⃣ Rodar Mobile (React Native)

cd mobile
npm install
npx react-native run-android
npx react-native run-ios

> Substitua IP_DO_SERVIDOR no App.js pelo IP do computador onde o backend está rodando.

---

## 5️⃣ Feed e Chat em Tempo Real

- Todas as postagens e mensagens aparecem para todos os usuários conectados.  
- Postagens multimídia suportadas: texto, foto, vídeo, áudio.  
- Chamadas WebRTC entre Web, Android e iOS.

---

## 6️⃣ ZIP / Download

# Windows: Compress-Archive -Path * -DestinationPath nova_App_completo.zip
# Linux/Mac: zip -r nova_App_completo.zip .

---

## 7️⃣ Configuração para rede local

1. Descubra o IP do servidor (ipconfig / ifconfig)  
2. Substitua localhost nos WebSockets e API REST pelo IP do servidor  
3. Usuários na mesma rede poderão usar Web + Mobile simultaneamente.

---

## 8️⃣ Observações

- Backend usa H2, pode ser trocado por MySQL/Postgres para produção.  
- Front-end web e mobile compartilham mesmo backend e WebSockets.  
- WebRTC integrado permite chamadas cross-platform.
