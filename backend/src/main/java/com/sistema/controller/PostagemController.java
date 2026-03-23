package com.sistema.controller;

import org.springframework.web.bind.annotation.*;
import com.sistema.repository.PostagemRepository;
import com.sistema.model.Postagem;
import java.util.List;

@RestController
@RequestMapping("/api/postagens")
public class PostagemController {

    private final PostagemRepository postagemRepo;

    public PostagemController(PostagemRepository postagemRepo) {
        this.postagemRepo = postagemRepo;
    }

    @PostMapping("/criar")
    public void criarPostagem(@RequestParam String usuario,
                               @RequestParam String tipo,
                               @RequestParam String conteudo) {
        postagemRepo.save(new Postagem(usuario, tipo, conteudo));
    }

    @GetMapping("/listar")
    public List<Postagem> listarPostagens() {
        return postagemRepo.findAllByOrderByTimestampDesc();
    }
}