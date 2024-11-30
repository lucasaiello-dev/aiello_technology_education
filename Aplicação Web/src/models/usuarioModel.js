
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

function ultimasTentativasModel(idUsuario) {
    console.log('ACESSEI O USUARIO MODEL');
    var instrucaoSql = `SELECT notaFinal FROM tentativa WHERE fkUsuario = ${idUsuario} LIMIT 10`;

    return database.executar(instrucaoSql)
}

function enviarDadosTentativaAtual(fkUsuario, fkTeste, notaFinal) {
    console.log('ACESSEI O USUÁRIO MODEL')
    var instrucaoSql = `
    INSERT INTO tentativa(fkUsuario, fkTeste, notaFinal) VALUES
    ('${fkUsuario}','${fkTeste}','${notaFinal}');`;

    return database.executar(instrucaoSql)
}

function coletarNotasMaximasModel(idUsuario) {
    console.log('ACESSEI O USUÁRIO MODEL')
    var instrucaoSql = `
    SELECT max(notaFinal) AS notaMaxima, fkTeste FROM tentativa WHERE fkUsuario = ${idUsuario} GROUP BY fkTeste
    `
    return database.executar(instrucaoSql)
}

function coletarUltimaNotaModel(idUsuario) {
    console.log('ACESSEI O USUÁRIO MODEL')
    var instrucaoSql = `
    SELECT notaFinal FROM tentativa WHERE fkUsuario = ${idUsuario} ORDER BY dtTermino DESC LIMIT 1;
    `
    return database.executar(instrucaoSql)
}

function coletarMediaNotasModel(idUsuario) {
    console.log('ACESSEI O USUÁRIO MODEL')
    var instrucaoSql = `
    SELECT truncate(avg(notaFinal),1) AS MediaNotas FROM tentativa WHERE fkUsuario = ${idUsuario};
    `
    return database.executar(instrucaoSql)
}

function coletarMediaPorAssuntoModel(idUsuario) {
    console.log('ACESSEI O USUÁRIO MODEL')
    var instrucaoSql = `
    SELECT assunto, TRUNCATE(avg(notaFinal),1) AS media
	FROM tentativa
	JOIN teste
    ON teste.idTeste = tentativa.fkTeste
    WHERE fkUsuario = ${idUsuario}
    GROUP BY assunto;
    `
    return database.executar(instrucaoSql)
}

module.exports = {
    autenticar,
    cadastrar,
    ultimasTentativasModel,
    enviarDadosTentativaAtual,
    coletarNotasMaximasModel,
    coletarUltimaNotaModel,
    coletarMediaNotasModel,
    coletarMediaPorAssuntoModel
}