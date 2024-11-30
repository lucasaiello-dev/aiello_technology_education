document.addEventListener('DOMContentLoaded', function () {
    const canvas_grafico = document.getElementById('projecao_notas')

    const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const data = {
        labels: labels,
        datasets: [{
            label: 'Progressão das últimas 10 notas',
            data: [10, 8, 7, 5, 9, 7, 10, 6, 8, 10],
            fill: true,
            borderColor: '#4FB1FF',
            pointBackgroundColor: '#4FB1FF',
            tension: 0.1
        }]
    }

    const config = {
        type: 'line',
        data: data,
        options: {
            plugins: {
                responsive: true, 
                maintainAspectRatio: false,
                legend: {
                    display: false // Desativa a legenda
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Tentativas'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Notas'
                    },
                    beginAtZero: true
                }
            }
        }
    }

    new Chart(canvas_grafico, config)

})

document.addEventListener('DOMContentLoaded', function () {
    telaAtual = document.getElementById('dashboard')
})

var telaAtual

function trocarTela(proximaTela = '') {
    const tela = document.getElementById(proximaTela)

    telaAtual.classList.add('esconder')

    tela.classList.remove('esconder')
    tela.style.opacity = 0
    setTimeout(() => { tela.style = 'opacity: 100%' }, 250)

    telaAtual = tela
    sessionStorage.TELA_DESEJADA = proximaTela
}

function sairDaConta() {
    sessionStorage.clear()

    window.location.href = 'index.html'
}

function irParaTeste(fkTeste = 0, caminhoTeste = '') {
    mostrarPopup('Você está preparado? 🤔', 'Agora iremos te redirecionar para o teste que você escolheu', 'Iniciar o Teste', caminhoTeste)

    sessionStorage.FK_TESTE = fkTeste
}

function trazerNotasMaximas() {

    fetch(`/usuario/coletarNotasMaximas/${sessionStorage.getItem('ID_USUARIO')}`, {
        cache: 'no-store'
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            resposta.json().then(json => {
                console.log("Dados recebidos:", JSON.stringify(json));

                // Recupera a melhor posição corretamente
                if (json.resultado && json.resultado.length > 0) {
                    console.log(json.resultado)

                } else {
                    console.warn("Nenhum resultado encontrado no array 'resultado'.");
                }

                testeJson = json.resultado
                mostrarNotasMaximas(json.resultado)
            })

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                mostrarPopup('Ops! ☹️', texto, 'Ok')
                return
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

}

var testeJson = ''

function mostrarNotasMaximas(NotasMaximas = []) {
    for (var i = 0; i < NotasMaximas.length; i++) {
        const nota_atual = NotasMaximas[i].notaMaxima
        const numero_teste = NotasMaximas[i].fkTeste

        const elemento_atual = document.getElementById(`teste_${numero_teste}`)
        if (numero_teste == undefined || nota_atual == undefined) {
            elemento_atual.innerHTML = '-'
        } else {
            elemento_atual.innerHTML = nota_atual
        }


    }
}

function recolherDadosUsuario() {
    const nome = sessionStorage.getItem('NOME_USUARIO')
    console.log(nome)

    const elemento_nome = document.getElementById('usuario')
    elemento_nome.innerHTML = nome

    if (telaAtual == document.getElementById('dashboard')) {
        recolherUltimaNota()
        recolherMediaNotas()
    }

}

function recolherUltimaNota() {
    fetch(`/usuario/coletarUltimaNota/${sessionStorage.getItem('ID_USUARIO')}`, {
        cache: 'no-store'
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            resposta.json().then(json => {
                console.log("Dados recebidos:", JSON.stringify(json));

                // Recupera a melhor posição corretamente
                if (json.resultado) {
                    console.log(json.resultado)

                    document.getElementById('ultima_nota').innerHTML = json.resultado[0].notaFinal
                } else {
                    console.warn("Nenhum resultado encontrado no array 'resultado'.");
                }

            })

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                mostrarPopup('Ops! ☹️', texto, 'Ok')
                return
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

}

function recolherMediaNotas() {
    fetch(`/usuario/coletarMediaNotas/${sessionStorage.getItem('ID_USUARIO')}`, {
        cache: 'no-store'
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            resposta.json().then(json => {
                console.log("Dados recebidos:", JSON.stringify(json));

                // Recupera a melhor posição corretamente
                if (json.resultado) {
                    console.log(json.resultado)

                    if (json.resultado[0].MediaNotas === null) {
                        return
                    }

                    document.getElementById('media_notas').innerHTML = json.resultado[0].MediaNotas
                } else {
                    console.warn("Nenhum resultado encontrado no array 'resultado'.");
                }

            })

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                mostrarPopup('Ops! ☹️', texto, 'Ok')
                return
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

}

