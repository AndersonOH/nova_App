package com.sistema.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Postagem {
    @Id @GeneratedValue
    private Long id;

    private String usuario;
    private String tipo;
    @Lob
    private String conteudo;
    private LocalDateTime timestamp;

    public Postagem() {}

    public Postagem(String usuario, String tipo, String conteudo) {
        this.usuario = usuario;
        this.tipo = tipo;
        this.conteudo = conteudo;
        this.timestamp = LocalDateTime.now();
    }

    // getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUsuario() { return usuario; }
    public void setUsuario(String usuario) { this.usuario = usuario; }
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    public String getConteudo() { return conteudo; }
    public void setConteudo(String conteudo) { this.conteudo = conteudo; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}