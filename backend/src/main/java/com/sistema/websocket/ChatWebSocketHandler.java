package com.sistema.websocket;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import com.sistema.repository.MensagemRepository;
import com.sistema.model.Mensagem;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class ChatWebSocketHandler extends TextWebSocketHandler {
    private static Set<WebSocketSession> sessions = ConcurrentHashMap.newKeySet();
    private final MensagemRepository msgRepo;
    public ChatWebSocketHandler(MensagemRepository msgRepo) { this.msgRepo = msgRepo; }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        msgRepo.findAll().forEach(m -> {
            try { session.sendMessage(new TextMessage(m.getUsuario() + ": " + m.getTexto())); }
            catch (Exception e) {}
        });
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String[] partes = message.getPayload().split(": ", 2);
        if (partes.length == 2) { msgRepo.save(new Mensagem(partes[0], partes[1])); }
        for (WebSocketSession s : sessions) {
            if (s.isOpen()) s.sendMessage(message);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
    }
}