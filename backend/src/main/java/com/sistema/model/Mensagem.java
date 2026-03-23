package com.sistema.model;

import jakarta.persistence.*;

@Entity
public class Mensagem {
    @Id @GeneratedValue
    private Long id;
    private String usuario;
    private String texto;
    public Mensagem() {}
    public Mensagem(String usuario, String texto) { this.usuario = usuario; this.texto = texto; }
    // getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUsuario() { return usuario; }
    public void setUsuario(String usuario) { this.usuario = usuario; }
    public String getTexto() { return texto; }
    public void setTexto(String texto) { this.texto = texto; }
}