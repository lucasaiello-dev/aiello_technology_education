var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    usuarioModel.autenticar(email, senha)
        .then(
            function (resultadoAutenticar) {
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                if (resultadoAutenticar.length == 1) {
                    console.log(resultadoAutenticar);

                    res.json({
                        id: resultadoAutenticar[0].idUsuario,
                        email: resultadoAutenticar[0].email,
                        nome: resultadoAutenticar[0].nome,
                        senha: resultadoAutenticar[0].senha
                    });
                } else if (resultadoAutenticar.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    console.log('2 logins iguais')
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function cadastrar(req, res) {

    var nome = req.body.nomeServer
    var sobrenome = req.body.sobrenomeServer
    var email = req.body.emailServer
    var dtNasc = req.body.dtNascServer
    var telefone = req.body.telefoneServer
    var cep = req.body.cepServer
    var numero = req.body.numeroServer
    var complemento = req.body.complementoServer
    var senha = req.body.senhaServer

    usuarioModel.cadastrar(nome, sobrenome, email, dtNasc, telefone, cep, numero, complemento, senha)
        .then(
            function (resultado) {
                console.log('Retornei do Model')
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function receberUltimasTentativas(req, res) {
    var idUsuario = req.params.fkUsuario
    console.log(idUsuario)

    usuarioModel.ultimasTentativasModel(idUsuario).then (
        function(resultado) {
            console.log('Retornei do Model com as 10 últimas tentativas')
            res.json({
                resultado: resultado
            });
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao retornar as 10 últimas tentativas. Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    )
}

function enviarDadosTentativaAtual(req, res) {
    var fkTeste = req.body.fkTesteServer
    var fkUsuario = req.body.fkUsuarioServer
    var notaFinal = req.body.notaFinalServer

    usuarioModel.enviarDadosTentativaAtual(fkUsuario, fkTeste, notaFinal).then (
        function (resultado) {
            console.log('Retornei o Model')
            res.json(resultado)         
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao enviar os dados da tentativa. Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    )
}

function coletarNotasMaximas(req, res) {
    var idUsuario = req.params.fkUsuario

    usuarioModel.coletarNotasMaximasModel(idUsuario).then (
        function (resultado) {
            console.log('Retornei o Model')
            res.json({
                resultado: resultado
            });         
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao enviar os dados da tentativa. Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    )
}

function coletarUltimaNota(req, res) {
    var idUsuario = req.params.fkUsuario

    usuarioModel.coletarUltimaNotaModel(idUsuario).then (
        function (resultado) {
            console.log('Retornei o Model')
            res.json({
                resultado: resultado
            });         
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao enviar os dados da tentativa. Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    )
}

function coletarMediaNotas(req, res) {
    var idUsuario = req.params.fkUsuario

    usuarioModel.coletarMediaNotasModel(idUsuario).then (
        function (resultado) {
            console.log('Retornei o Model')
            res.json({
                resultado: resultado
            });         
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao enviar os dados da tentativa. Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    )
}

function coletarMediaPorAssunto(req, res) {
    var idUsuario = req.params.fkUsuario

    usuarioModel.coletarMediaPorAssuntoModel(idUsuario).then (
        function(resultado) {
            console.log('Retornei do Model com as 10 últimas tentativas')
            res.json({
                resultado: resultado
            });
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao retornar as 10 últimas tentativas. Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    )
}

function coletarMetricasHome(req, res) {

    usuarioModel.coletarMetricasHomeModel().then (
        function(resultado) {
            console.log('Retornei do Model com métricas para Home')
            res.status(201).json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao retornar as métricas para Home. Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    )
}



module.exports = {
    autenticar,
    cadastrar,
    receberUltimasTentativas,
    enviarDadosTentativaAtual,
    coletarNotasMaximas,
    coletarUltimaNota,
    coletarMediaNotas,
    coletarMediaPorAssunto,
    coletarMetricasHome
}
