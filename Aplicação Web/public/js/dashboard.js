
var graficoLinha

function plotarGrafico() {

    const canvas_grafico = document.getElementById('projecao_notas').getContext('2d')
    const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const data = {
        labels: labels,
        datasets: [{
            label: 'Progressão das últimas 10 notas',
            data: [],
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
                    beginAtZero: true,
                    min: 0, 
                    max: 10
                }
            }
        }
    }

    graficoLinha = new Chart(canvas_grafico, config)

}

document.addEventListener('DOMContentLoaded', function () {
    telaAtual = document.getElementById('dashboard')
})

var telaAtual

function trocarTela(proximaTela = '') {
    const tela = document.getElementById(proximaTela)

    if (proximaTela == 'ide_online') {
        mostrarPopup('Vai codar? 😊', 'Para melhor utilização dessa ferramenta, iremos te direcionar para outra tela.', 'Ir para a IDE Online', 'ide_online.html')
        return
    }

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
        plotarGrafico()
        trazerDadosUltimasTentativas()
        trazerMediaPorAssunto()
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

function trazerDadosUltimasTentativas() {
    fetch(`/usuario/receberUltimasTentativas/${sessionStorage.getItem('ID_USUARIO')}`, {
        cache: 'no-store'
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO trazerNotasUltimasTentativas()!")

        if (resposta.ok) {
            resposta.json().then(json => {
                console.log("Dados recebidos:", JSON.stringify(json));

                // Recupera a melhor posição corretamente
                if (json.resultado) {
                    console.log(json.resultado)

                    if (json.resultado[0].notaFinal === null) {
                        return
                    }

                    atualizarGrafico(json.resultado)
                    

                } else {
                    console.warn("Nenhum resultado encontrado no array 'resultado'.");
                }

            })

        } else {

            console.log("Houve um erro ao trazer os dados!");

            resposta.text().then(texto => {
                mostrarPopup('Ops! ☹️', texto, 'Ok')
                return
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })
}

function trazerMediaPorAssunto() {
    fetch(`/usuario/coletarMediaPorAssunto/${sessionStorage.getItem('ID_USUARIO')}`, {
        cache: 'no-store'
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO trazerNotasUltimasTentativas()!")

        if (resposta.ok) {
            resposta.json().then(json => {
                console.log("Dados recebidos:", JSON.stringify(json));

                // Recupera a melhor posição corretamente
                if (json.resultado) {
                    console.log(json.resultado)

                    if (json.resultado[0].media === null) {
                        return
                    }

                    alterarSitucaoMediaAssuntos(json.resultado)
                                        

                } else {
                    console.warn("Nenhum resultado encontrado no array 'resultado'.");
                }

            })

        } else {

            console.log("Houve um erro ao trazer os dados!");

            resposta.text().then(texto => {
                mostrarPopup('Ops! ☹️', texto, 'Ok')
                return
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })
}


function atualizarGrafico(dataJson) {
    const data = []

    for (var i = 0; i < dataJson.length; i++) {
        data.push(dataJson[i].notaFinal)
    }


    graficoLinha.data.datasets[0].data = data;
    
    graficoLinha.update();
}

function alterarSitucaoMediaAssuntos(vetorMediasAssuntos = []) {
    for (var i = 0; i < vetorMediasAssuntos.length; i++) {
        const elemento_assunto = document.getElementById('nivel_' + `${vetorMediasAssuntos[i].assunto}`)
        const elemento_media = document.getElementById('media_' + `${vetorMediasAssuntos[i].assunto}`)

        console.log(elemento_assunto, elemento_media)

        const media = vetorMediasAssuntos[i].media
        var situacao = 'Alto'

        if (media < 8) {
            situacao = 'Médio'
        } else if (media < 5) {
            situacao = 'Baixo'
        }

        elemento_assunto.innerHTML = situacao
        elemento_media.innerHTML = media
    }
}

