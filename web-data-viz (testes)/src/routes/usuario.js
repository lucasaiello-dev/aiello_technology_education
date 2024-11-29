var express = require("express");
var router = express.Router();

var usuarioController = require('../controllers/usuarioController')

router.post('/cadastrar', (req, res) => {
    usuarioController.cadastrar(req, res)
})

router.post('/autenticar', (req, res) => {
    usuarioController.autenticar(req, res)
})

router.get('/receberUltimasTentativas', (req, res) => {
    usuarioController.receberUltimasTentativas(req, res)
})

router.post('/enviarDadosTentativa', (req, res) => {
    usuarioController.enviarDadosTentativaAtual(req, res)
})

module.exports = router