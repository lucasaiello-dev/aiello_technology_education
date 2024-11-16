var label_escolhida = null
var blocoAtual = 1
var input = ''
const listaPerguntasPassadas = [1]
var valorOpcaoAtual = -1
const listaAcertos = []

function marcarRadio(idInput) {
    input = document.getElementById(`${idInput}`)
    valorOpcaoAtual = input.value
    label_escolhida = input.parentElement
    input.checked = true
}

function atualizarProgresso() {
    var progressBar = document.getElementById('progress-bar');
    var width = parseInt(progressBar.style.width) || 0
    if (width < 100) { progressBar.style.width = (width + 10) + '%' }
}


function validarResposta() {

    trocarCorAcerto(label_escolhida)

    if (valorOpcaoAtual == -1) {
        alert('Escolha alguma opção!')
        return
    }

    atualizarProgresso()

    if (listaPerguntasPassadas.length == 10) {
        return false
    }

    setTimeout(() => {passarPergunta()}, 500)
    delayButton()

}

function passarPergunta() {

    var proxima_pergunta = 0

    while (true) {
        proxima_pergunta = sortearProximaPergunta()
        if (listaPerguntasPassadas.indexOf(proxima_pergunta) == -1) {
            listaPerguntasPassadas.push(proxima_pergunta)
            break
        }
    }


    console.log(blocoAtual, proxima_pergunta, listaPerguntasPassadas)
    const elemento_atual = document.getElementById(`${blocoAtual}`)
    const elemento_posterior = document.getElementById(`${proxima_pergunta}`)



    elemento_atual.classList.add('passar')
    setTimeout(() => { elemento_atual.style = "display: none"; elemento_posterior.classList.remove('esconder') }, 500)

    elemento_posterior.style = "opacity: 0%"

    setTimeout(() => { elemento_posterior.style = "opacity: 100%" }, 600)

    blocoAtual = proxima_pergunta
    listaAcertos.push(valorOpcaoAtual)
    console.log(listaAcertos)
    valorOpcaoAtual = -1
}

function sortearProximaPergunta() {
    return parseInt(Math.random() * 10 + 1)
}

function iniciarTeste() {
    const botao_comecar = document.getElementById('inicio_teste')
    const div_comecar = document.getElementById('div_inicio_teste')

    setTimeout(() => { botao_comecar.style = "opacity: 0%" }, 450)
    setTimeout(() => { div_comecar.style = "display: none" }, 500)


    const primeira_questao = document.getElementById(`${blocoAtual}`)

    setTimeout(() => { primeira_questao.classList.remove('esconder') }, 500)
    setTimeout(() => { btn_form.classList.remove('esconder') }, 500)

    primeira_questao.style = "opacity: 0%"
    btn_form.style = "opacity: 0%"

    setTimeout(() => { primeira_questao.style = "opacity: 100%" }, 600)
    setTimeout(() => { btn_form.style = "opacity: 100%" }, 600)

}


function delayButton() {
    const button = document.getElementById('btn_form');
    button.disabled = true; // Desabilita o botão

    setTimeout(() => {
        button.disabled = false;
    }, 500);
}

function trocarCorAcerto(elemento) {
    if (valorOpcaoAtual == 1) {
        elemento.classList.add('acerto')
    } else {
        elemento.classList.add('erro')
    }
}

function contarAcertos() {
    var qtd_acertos = 0

    for (var i = 0; i < listaAcertos.length; i++) {
        if (listaAcertos[i] == 1) {
            qtd_acertos++
        }
    }

    return qtd_acertos
}

function contarErros() {
    const qtd_erros = contarAcertos() - listaAcertos.length
    return qtd_erros
}




