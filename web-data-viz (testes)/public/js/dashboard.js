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
    setTimeout(() => {tela.style = 'opacity: 100%'}, 250)

    telaAtual = tela
}

function sairDaConta() {
    sessionStorage.clear()

    window.location.href='index.html'
}

function irParaTeste(fkTeste = 0, caminhoTeste = '') {
    mostrarPopup('Você está preparado? 🤔','Agora iremos te redirecionar para o teste que você escolheu','Iniciar o Teste', caminhoTeste)

    sessionStorage.FK_TESTE = fkTeste
}