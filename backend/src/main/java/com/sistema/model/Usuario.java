package com.sistema.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Usuario {
    @Id
    private String username;
    private String senha;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Item> itens;

    public Usuario() {}
    public Usuario(String username, String senha) {
        this.username = username;
        this.senha = senha;
    }
    // getters and setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
    public List<Item> getItens() { return itens; }
    public void setItens(List<Item> itens) { this.itens = itens; }
}