package com.sistema.repository;

import com.sistema.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, String> {}
public interface ItemRepository extends JpaRepository<Item, Long> {}
public interface MensagemRepository extends JpaRepository<Mensagem, Long> {}
public interface PostagemRepository extends JpaRepository<Postagem, Long> {
    List<Postagem> findAllByOrderByTimestampDesc();
}