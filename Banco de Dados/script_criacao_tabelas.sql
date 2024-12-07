CREATE DATABASE ate;
USE ate;

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome varchar(45),
    sobrenome varchar(45),
    email varchar(45),
    dtNasc date,
    telefone char(14),
    cep char(9),
    numero varchar(4),
    complemento varchar(45),
    senha varchar(12),
    dtCadastro timestamp default current_timestamp
) AUTO_INCREMENT = 1000;

INSERT INTO usuario (nome, sobrenome, email, dtNasc, telefone, cep, numero, complemento, senha)
VALUES
('Ana', 'Silva', 'ana.silva@example.com', '1990-05-10', '11987654321', '01001000', '123', 'Apto 1', 'senha123'),
('Bruno', 'Pereira', 'bruno.pereira@example.com', '1988-03-15', '21987654321', '02002000', '456', 'Casa 2', 'senha234'),
('Carlos', 'Santos', 'carlos.santos@example.com', '1992-07-20', '31987654321', '03003000', '789', 'Apto 3', 'senha345'),
('Daniela', 'Oliveira', 'daniela.oliveira@example.com', '1994-01-25', '41987654321', '04004000', '101', 'Casa 4', 'senha456'),
('Eduardo', 'Costa', 'eduardo.costa@example.com', '1996-09-30', '51987654321', '05005000', '202', 'Apto 5', 'senha567'),
('Fernanda', 'Lima', 'fernanda.lima@example.com', '1998-04-05', '61987654321', '06006000', '303', 'Casa 6', 'senha678'),
('Gabriel', 'Ramos', 'gabriel.ramos@example.com', '2000-11-10', '71987654321', '07007000', '404', 'Apto 7', 'senha789'),
('Helena', 'Martins', 'helena.martins@example.com', '1985-08-15', '81987654321', '08008000', '505', 'Casa 8', 'senha890'),
('Igor', 'Fernandes', 'igor.fernandes@example.com', '1993-06-20', '91987654321', '09009000', '606', 'Apto 9', 'senha901'),
('Juliana', 'Azevedo', 'juliana.azevedo@example.com', '1991-02-25', '10198765432', '10010000', '707', 'Casa 10', 'senha012'),
('Lucas', 'Barbosa', 'lucas.barbosa@example.com', '1995-12-05', '11198765432', '11011000', '808', 'Apto 11', 'senha1234'),
('Mariana', 'Carvalho', 'mariana.carvalho@example.com', '1997-10-15', '12198765432', '12012000', '909', 'Casa 12', 'senha2345'),
('Nicolas', 'Almeida', 'nicolas.almeida@example.com', '2001-03-25', '13198765432', '13013000', '010', 'Apto 13', 'senha3456');

CREATE TABLE teste (
	idTeste INT PRIMARY KEY AUTO_INCREMENT,
    nome varchar(45),
    assunto varchar(45),
    descricao varchar(100)
);

INSERT INTO teste VALUES
(default, 'HTML | Nível 01', 'HTML', 'Principais tags que compõem a estrutura do arquivo algumas tags de texto'),
(default, 'HTML | Nível 02', 'HTML', 'Tags de img, input, a, div, link e a respeito de id e classes'),
(default, 'CSS | Nível 01', 'CSS', 'Seletores CSS e atributos para alteração de cores, espaçamento, tamanho e fonte dos elementos'),
(default, 'CSS | Nível 02', 'CSS', 'Display flexível, alinhamento, e ordem dos elementos'),
(default, 'JavaScript | Nível 01', 'JS', 'variáveis e constantes, if e else, operadores lógicos e declaração de funções'),
(default, 'JavaScript | Nível 02', 'JS', 'Atributos de uma função, return, vetores, length e loop');

CREATE TABLE tentativa (
	idTentativa INT AUTO_INCREMENT,
    fkTeste INT,
    fkUsuario INT,
    dtTermino timestamp default current_timestamp,
    notaFinal INT,
    CONSTRAINT pkCompostaTentativa
		PRIMARY KEY (idTentativa,fkTeste,fkUsuario),
	CONSTRAINT fkTesteTentativa
		FOREIGN KEY (fkTeste)
		REFERENCES teste(idTeste),
	CONSTRAINT fkUsuarioTentativa
		FOREIGN KEY (fkUsuario)
		REFERENCES usuario(idUsuario)	
);

INSERT INTO tentativa (fkTeste, fkUsuario, notaFinal)
VALUES
(1, 1000, 8),
(2, 1000, 6),
(3, 1001, 7),
(4, 1001, 9),
(5, 1002, 10),
(6, 1002, 7),
(1, 1003, 5),
(2, 1003, 8),
(3, 1004, 9),
(4, 1004, 6),
(5, 1005, 8),
(6, 1005, 7),
(1, 1006, 9),
(2, 1006, 5),
(3, 1007, 10),
(4, 1007, 7),
(5, 1008, 8),
(6, 1008, 9),
(1, 1009, 6),
(2, 1009, 7),
(3, 1010, 8),
(4, 1010, 10),
(5, 1011, 5),
(6, 1011, 9),
(1, 1012, 7),
(2, 1012, 8),
(3, 1013, 9),
(4, 1013, 7),
(5, 1000, 8),
(6, 1001, 9),
(1, 1002, 5),
(2, 1003, 7),
(3, 1004, 8),
(4, 1005, 6),
(5, 1006, 9),
(6, 1007, 7),
(1, 1008, 8);

SELECT * FROM usuario;
SELECT * FROM teste;
SELECT * FROM tentativa;

SELECT (select count(idUsuario) FROM usuario) AS qtdUsuario, count(idTentativa) AS qtdTestes, (select count(idTentativa) FROM tentativa WHERE notaFinal >= 7) AS qtd_aprovacoes
	FROM usuario JOIN tentativa
    ON usuario.idUsuario = tentativa.fkUsuario;





