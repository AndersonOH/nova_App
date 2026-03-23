-- Dados de exemplo para o banco H2
-- Executado automaticamente na inicialização se spring.jpa.hibernate.ddl-auto=create

-- Usuário de exemplo
INSERT INTO usuario (username, senha) VALUES ('admin', '123');
INSERT INTO usuario (username, senha) VALUES ('user1', 'pass1');

-- Itens de exemplo
INSERT INTO item (nome, usuario_username) VALUES ('Item 1 do Admin', 'admin');
INSERT INTO item (nome, usuario_username) VALUES ('Item 2 do Admin', 'admin');

-- Mensagens de exemplo
INSERT INTO mensagem (usuario, texto) VALUES ('admin', 'Bem-vindo ao chat!');
INSERT INTO mensagem (usuario, texto) VALUES ('user1', 'Olá, tudo bem?');

-- Postagens de exemplo
INSERT INTO postagem (usuario, tipo, conteudo, timestamp) VALUES ('admin', 'texto', 'Primeira postagem do feed!', CURRENT_TIMESTAMP);
INSERT INTO postagem (usuario, tipo, conteudo, timestamp) VALUES ('user1', 'texto', 'Olá a todos!', CURRENT_TIMESTAMP);