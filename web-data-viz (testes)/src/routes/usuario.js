var express = require("express");
var router = express.Router();

var usuarioController = require('../controllers/usuarioController')

router.post('/cadastrar', (req, res) => {
    usuarioController.cadastrar(req, res)
})

router.post('/autenticar', (req, res) => {
    usuarioController.autenticar(req, res)
})

router.get('/receberUltimasTentativas/:fkUsuario', (req, res) => {
    usuarioController.receberUltimasTentativas(req, res)
})

router.post('/enviarDadosTentativa', (req, res) => {
    usuarioController.enviarDadosTentativaAtual(req, res)
})

router.get('/coletarNotasMaximas/:fkUsuario', (req, res) => {
    usuarioController.coletarNotasMaximas(req, res)
})

router.get('/coletarUltimaNota/:fkUsuario', (req, res) => {
    usuarioController.coletarUltimaNota(req,res)
})

router.get('/coletarMediaNotas/:fkUsuario', (req, res) =>{
    usuarioController.coletarMediaNotas(req, res)
})

module.exports = router