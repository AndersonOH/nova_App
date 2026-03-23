import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, ScrollView, Image } from 'react-native';
import { RTCView, mediaDevices, RTCPeerConnection } from 'react-native-webrtc';

export default function App() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [msg, setMsg] = useState('');
  const [chat, setChat] = useState([]);
  const [feed, setFeed] = useState([]);
  const [wsChat, setWsChat] = useState(null);
  const [wsFeed, setWsFeed] = useState(null);
  const [wsSignaling, setWsSignaling] = useState(null);
  const [pc, setPc] = useState(null);
  const [localStream, setLocalStream] = useState(null);

  // Login / Cadastro
  const login = () => {
    fetch(`http://localhost:8080/api/login?user=${usuario}&pass=${senha}`)
      .then(r => r.text())
      .then(r => {
        if (r === "true") {
          conectarChat();
          conectarFeed();
          conectarSignaling();
          alert("Login OK");
        } else alert("Erro login");
      })
      .catch(e => alert("Erro de conexão: " + e.message));
  };

  const cadastro = () => {
    fetch(`http://localhost:8080/api/cadastro?user=${usuario}&pass=${senha}`)
      .then(r => r.text())
      .then(r => alert(r === "true" ? "Cadastrado" : "Usuário existe"));
  };

  // Chat
  const conectarChat = () => {
    try {
      const socket = new WebSocket('ws://localhost:8080/chat');
      socket.onopen = () => console.log('Chat conectado');
      socket.onerror = e => console.log('Erro chat:', e);
      socket.onmessage = e => setChat(c => [e.data, ...c]);
      setWsChat(socket);
    } catch (e) {
      alert('Erro ao conectar chat: ' + e.message);
    }
  };

  const enviarChat = () => {
    if (msg && wsChat) {
      wsChat.send(usuario + ": " + msg);
      setMsg('');
    }
  };

  // Feed
  const conectarFeed = () => {
    try {
      const socket = new WebSocket('ws://localhost:8080/postagem');
      socket.onopen = () => console.log('Feed conectado');
      socket.onerror = e => console.log('Erro feed:', e);
      socket.onmessage = e => {
        let partes = e.data.split("|", 3);
        let usuarioPost = partes[0], tipo = partes[1], conteudo = decodeURIComponent(partes[2]);
        setFeed(f => [{ usuario: usuarioPost, tipo, conteudo }, ...f]);
      };
      setWsFeed(socket);
    } catch (e) {
      alert('Erro ao conectar feed: ' + e.message);
    }
  };

  // Signaling
  const conectarSignaling = () => {
    try {
      const socket = new WebSocket('ws://localhost:8080/signaling');
      socket.onopen = () => console.log('Signaling conectado');
      socket.onerror = e => console.log('Erro signaling:', e);
      socket.onmessage = e => {
        try {
          const message = JSON.parse(e.data);
          if (pc) {
            if (message.type === 'offer') {
              pc.setRemoteDescription(new RTCSessionDescription(message));
              pc.createAnswer().then(answer => {
                pc.setLocalDescription(answer);
                socket.send(JSON.stringify({ type: 'answer', sdp: answer.sdp }));
              });
            } else if (message.type === 'answer') {
              pc.setRemoteDescription(new RTCSessionDescription(message));
            } else if (message.type === 'candidate') {
              pc.addIceCandidate(new RTCIceCandidate(message.candidate));
            }
          }
        } catch (err) {
          console.log('Erro ao processar signaling:', err);
        }
      };
      setWsSignaling(socket);
    } catch (e) {
      alert('Erro ao conectar signaling: ' + e.message);
    }
  };

  const postarTexto = (texto) => {
    if (texto && wsFeed) wsFeed.send(`${usuario}|texto|${encodeURIComponent(texto)}`);
  };

  // WebRTC
  const startCall = async () => {
    try {
      const pcLocal = new RTCPeerConnection();
      pcLocal.onicecandidate = e => {
        if (e.candidate && wsSignaling) {
          wsSignaling.send(JSON.stringify({ type: 'candidate', candidate: e.candidate }));
        }
      };
      const stream = await mediaDevices.getUserMedia({ audio: true, video: true });
      pcLocal.addStream(stream);
      setPc(pcLocal);
      setLocalStream(stream);

      // Create offer and send
      const offer = await pcLocal.createOffer();
      await pcLocal.setLocalDescription(offer);
      if (wsSignaling) {
        wsSignaling.send(JSON.stringify({ type: 'offer', sdp: offer.sdp }));
      }
    } catch (e) {
      alert('Erro ao iniciar chamada: ' + e.message);
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text>Login / Cadastro</Text>
      <TextInput placeholder="Usuário" onChangeText={setUsuario} value={usuario} />
      <TextInput placeholder="Senha" secureTextEntry onChangeText={setSenha} value={senha} />
      <Button title="Login" onPress={login} />
      <Button title="Cadastrar" onPress={cadastro} />

      <Text>Chat</Text>
      <TextInput placeholder="Mensagem" onChangeText={setMsg} value={msg} />
      <Button title="Enviar Chat" onPress={enviarChat} />
      <FlatList
        data={chat}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => <Text>{item}</Text>}
      />

      <Text>Feed de Postagens</Text>
      <TextInput placeholder="Mensagem" onSubmitEditing={(e) => postarTexto(e.nativeEvent.text)} />
      <FlatList
        data={feed}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => {
          if (item.tipo === "texto") return <Text>{item.usuario}: {item.conteudo}</Text>;
          if (item.tipo === "foto") return (
            <View>
              <Text>{item.usuario} postou uma foto:</Text>
              <Image source={{ uri: `data:image/*;base64,${item.conteudo}` }} style={{ width: 200, height: 200 }} />
            </View>
          );
          if (item.tipo === "video") return <Text>{item.usuario} postou um vídeo (não suportado ainda)</Text>;
          if (item.tipo === "audio") return <Text>{item.usuario} postou um áudio (não suportado ainda)</Text>;
          return <Text>{item.usuario}: {item.conteudo}</Text>;
        }}
      />

      <Button title="Iniciar Chamada" onPress={startCall} />
      {localStream && <RTCView streamURL={localStream.toURL()} style={{ width: 300, height: 300 }} />}
    </ScrollView>
  );
}