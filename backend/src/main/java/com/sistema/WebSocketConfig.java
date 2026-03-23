package com.sistema;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    private final ChatWebSocketHandler chatHandler;
    private final PostagemWebSocketHandler postagemHandler;
    private final SignalingWebSocketHandler signalingHandler;

    public WebSocketConfig(ChatWebSocketHandler chatHandler, PostagemWebSocketHandler postagemHandler, SignalingWebSocketHandler signalingHandler) {
        this.chatHandler = chatHandler;
        this.postagemHandler = postagemHandler;
        this.signalingHandler = signalingHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(chatHandler, "/chat").setAllowedOrigins("*");
        registry.addHandler(postagemHandler, "/postagem").setAllowedOrigins("*");
        registry.addHandler(signalingHandler, "/signaling").setAllowedOrigins("*");
    }
}