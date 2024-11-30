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

    if (valorOpcaoAtual == -1) {
        alert('Escolha alguma opção!')
        return
    }

    trocarCorAcerto(label_escolhida)


    atualizarProgresso()

    setTimeout(() => {passarPergunta()}, 500)
    delayButton()
}

function passarPergunta() {

    var ultima_pergunta = false
    var proxima_pergunta = 0

    if (listaPerguntasPassadas.length == 10) {
        proxima_pergunta = 11      
        ultima_pergunta = true
    } else {
        while (true) {
            proxima_pergunta = sortearProximaPergunta()
            if (listaPerguntasPassadas.indexOf(proxima_pergunta) == -1) {
                listaPerguntasPassadas.push(proxima_pergunta)
                break
            }
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

    if (ultima_pergunta) {
        finalizarTeste()
        enviarDados()
        botao = document.getElementById('btn_sair')
        botao.style.opacity = 0
        setTimeout(() => {botao.style = 'display: none'}, 500)
    }

}

function sortearProximaPergunta() {
    return parseInt(Math.random() * 10 + 1)
}

function iniciarTeste() {
    rolarParaBaixo()

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
    }, 1500);
}

function trocarCorAcerto(elemento) {
    if (valorOpcaoAtual == 1) {
        elemento.classList.add('acerto')
    } else {
        elemento.classList.add('erro')
    }
}

var qtd_acertos = 0
function contarAcertos() {

    for (var i = 0; i < listaAcertos.length; i++) {
        if (listaAcertos[i] == 1) {
            qtd_acertos++
        }
    }

    return qtd_acertos
}

function contarErros() {
    const qtd_erros = listaAcertos.length - qtd_acertos
    return qtd_erros
}

function finalizarTeste() {
    const button = document.getElementById('btn_form')
    setTimeout(() => { button.style = "opacity: 0%" }, 450)

    const span_acertos = document.getElementById('acertos')
    span_acertos.innerHTML = contarAcertos()

    const span_erros = document.getElementById('erros')
    span_erros.innerHTML = contarErros()
}

function rolarParaBaixo() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

const fkTeste = sessionStorage.getItem('FK_TESTE')
const fkUsuario = sessionStorage.getItem('ID_USUARIO')

    function enviarDados() {
        fetch("/usuario/enviarDadosTentativa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fkTesteServer: fkTeste,
                fkUsuarioServer: fkUsuario,
                notaFinalServer: qtd_acertos
            }),
        })

            .then(function (resposta) {
                if (resposta.ok) {
                    console.log('Deu certo.' + resposta)
                }
            })

            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
    }

function voltarMenu() {
    window.location.href = '../dashboard.html'
}





