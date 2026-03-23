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
          alert("Login OK");
        } else alert("Erro login");
      });
  };

  const cadastro = () => {
    fetch(`http://localhost:8080/api/cadastro?user=${usuario}&pass=${senha}`)
      .then(r => r.text())
      .then(r => alert(r === "true" ? "Cadastrado" : "Usuário existe"));
  };

  // Chat
  const conectarChat = () => {
    const socket = new WebSocket('ws://localhost:8080/chat');
    socket.onmessage = e => setChat(c => [e.data, ...c]);
    setWsChat(socket);
  };

  const enviarChat = () => {
    if (msg && wsChat) {
      wsChat.send(usuario + ": " + msg);
      setMsg('');
    }
  };

  // Feed
  const conectarFeed = () => {
    const socket = new WebSocket('ws://localhost:8080/postagem');
    socket.onmessage = e => {
      let partes = e.data.split("|", 3);
      let usuarioPost = partes[0], tipo = partes[1], conteudo = decodeURIComponent(partes[2]);
      setFeed(f => [{ usuario: usuarioPost, tipo, conteudo }, ...f]);
    };
    setWsFeed(socket);
  };

  const postarTexto = (texto) => {
    if (texto && wsFeed) wsFeed.send(`${usuario}|texto|${encodeURIComponent(texto)}`);
  };

  // WebRTC
  const startCall = async () => {
    const pcLocal = new RTCPeerConnection();
    pcLocal.onaddstream = e => setLocalStream(e.stream);
    const stream = await mediaDevices.getUserMedia({ audio: true, video: true });
    pcLocal.addStream(stream);
    setPc(pcLocal);
    setLocalStream(stream);
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