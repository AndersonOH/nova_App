package com.sistema.websocket;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import com.sistema.repository.PostagemRepository;
import com.sistema.model.Postagem;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class PostagemWebSocketHandler extends TextWebSocketHandler {

    private static Set<WebSocketSession> sessions = ConcurrentHashMap.newKeySet();
    private final PostagemRepository postagemRepo;

    public PostagemWebSocketHandler(PostagemRepository postagemRepo) {
        this.postagemRepo = postagemRepo;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        postagemRepo.findAllByOrderByTimestampDesc().forEach(p -> {
            try {
                session.sendMessage(new TextMessage(serialize(p)));
            } catch (Exception e) {}
        });
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String[] partes = message.getPayload().split("\\|", 3);
        if (partes.length == 3) {
            String usuario = partes[0];
            String tipo = partes[1];
            String conteudo = partes[2];

            Postagem p = new Postagem(usuario, tipo, conteudo);
            postagemRepo.save(p);

            for (WebSocketSession s : sessions) {
                if (s.isOpen()) s.sendMessage(new TextMessage(serialize(p)));
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
    }

    private String serialize(Postagem p) {
        return p.getUsuario() + "|" + p.getTipo() + "|" + p.getConteudo();
    }
}