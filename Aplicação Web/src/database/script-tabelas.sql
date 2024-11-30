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





