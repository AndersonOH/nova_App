-- Schema do Banco de Dados H2 para nova_App
-- Tabelas criadas automaticamente pelo JPA, mas aqui está o schema para referência

-- Tabela de Usuários
CREATE TABLE usuario (
    username VARCHAR(255) PRIMARY KEY,
    senha VARCHAR(255) NOT NULL
);

-- Tabela de Itens (relacionada com usuário)
CREATE TABLE item (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    usuario_username VARCHAR(255),
    FOREIGN KEY (usuario_username) REFERENCES usuario(username)
);

-- Tabela de Mensagens do Chat
CREATE TABLE mensagem (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(255) NOT NULL,
    texto VARCHAR(1000) NOT NULL
);

-- Tabela de Postagens do Feed
CREATE TABLE postagem (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    conteudo TEXT NOT NULL,
    timestamp TIMESTAMP NOT NULL
);

-- Índices para performance
CREATE INDEX idx_mensagem_usuario ON mensagem(usuario);
CREATE INDEX idx_postagem_usuario ON postagem(usuario);
CREATE INDEX idx_postagem_timestamp ON postagem(timestamp DESC);
CREATE INDEX idx_item_usuario ON item(usuario_username);