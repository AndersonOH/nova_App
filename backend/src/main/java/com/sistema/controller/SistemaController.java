package com.sistema.controller;

import org.springframework.web.bind.annotation.*;
import com.sistema.repository.UsuarioRepository;
import com.sistema.repository.ItemRepository;
import com.sistema.model.Usuario;
import com.sistema.model.Item;
import java.util.*;

@RestController
@RequestMapping("/api")
public class SistemaController {
    private final UsuarioRepository usuarioRepo;
    private final ItemRepository itemRepo;
    public SistemaController(UsuarioRepository u, ItemRepository i) {
        usuarioRepo = u;
        itemRepo = i;
    }

    @PostMapping("/login")
    public boolean login(@RequestParam String user, @RequestParam String pass) {
        return usuarioRepo.findById(user).map(u -> u.getSenha().equals(pass)).orElse(false);
    }

    @PostMapping("/cadastro")
    public boolean cadastro(@RequestParam String user, @RequestParam String pass) {
        if (usuarioRepo.existsById(user)) return false;
        usuarioRepo.save(new Usuario(user, pass));
        return true;
    }

    @PostMapping("/addItem")
    public void addItem(@RequestParam String user, @RequestParam String nome) {
        Usuario u = usuarioRepo.findById(user).orElseThrow();
        Item it = new Item(nome);
        itemRepo.save(it);
        u.getItens().add(it);
        usuarioRepo.save(u);
    }

    @PostMapping("/remItem")
    public void remItem(@RequestParam String user, @RequestParam Long id) {
        Usuario u = usuarioRepo.findById(user).orElseThrow();
        u.getItens().removeIf(it -> it.getId().equals(id));
        usuarioRepo.save(u);
        itemRepo.deleteById(id);
    }

    @GetMapping("/listItens")
    public List<Item> listItens(@RequestParam String user) {
        return usuarioRepo.findById(user).map(Usuario::getItens).orElse(new ArrayList<>());
    }
}