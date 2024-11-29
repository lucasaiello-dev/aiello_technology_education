const { enviarDadosTentativa } = require("../controllers/usuarioController");
var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idUsuario, nome, email FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, sobrenome, email, dtNasc, telefone, cep, numero, complemento, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);

    var instrucaoSql = `
        INSERT INTO usuario (nome, sobrenome, email, dtNasc, telefone, cep, numero, complemento, senha) VALUES ('${nome}', '${sobrenome}', '${email}', '${dtNasc}', '${telefone}', '${cep}', '${numero}', '${complemento}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function ultimasTentativas(idUsuario) {
    console.log('ACESSEI O USUARIO MODEL');
    var instrucaoSql = `SELECT idTentativa, notaFinal FROM tentativa WHERE fkUsuario = ${idUsuario};`;

    return database.executar(instrucaoSql)
}

function enviarDadosTentativaAtual(fkUsuario, fkTeste, notaFinal) {
    console.log('ACESSEI O USUÁRIO MODEL')
    var instrucaoSql = `
    INSERT INTO tentativa(fkUsuario, fkTeste, notaFinal) VALUES
    ('${fkUsuario}','${fkTeste}','${notaFinal}');`;

    return database.executar(instrucaoSql)
}

module.exports = {
    autenticar,
    cadastrar,
    ultimasTentativas,
    enviarDadosTentativaAtual
}