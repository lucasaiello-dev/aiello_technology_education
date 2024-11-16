CREATE DATABASE ate;
USE ate;

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome varchar(45),
    sobrenome varchar(45),
    email varchar(45),
    dtNasc date,
    telefone char(13),
    cep char(9),
    numero varchar(4),
    senha varchar(12),
    dtCadastro timestamp default current_timestamp
) AUTO_INCREMENT = 1000;

CREATE TABLE teste (
	idTeste INT PRIMARY KEY AUTO_INCREMENT,
    nome varchar(20),
    descricao varchar(45),
    nivel INT,
    assunto varchar(20),
    CONSTRAINT chk_nivel
		CHECK (nivel IN(1,2))
);

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

CREATE TABLE pergunta (
	idPergunta INT,
    fkTeste INT,
    enunciado varchar(45),
    CONSTRAINT pkCompostaPergunta
		PRIMARY KEY (idPergunta,fkTeste),
	CONSTRAINT fkTestePergunta
		FOREIGN KEY (fkTeste)
		REFERENCES teste(idTeste),
	CONSTRAINT chk_idPerguntaTeste
		CHECK (idPergunta <= 10)
);


