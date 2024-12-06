
function callback(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log('O elemento está visível na viewport!');
            contarAte('usuarios_cadastrados', 96);
            contarAte('testes', 346);
            contarAte('aprovacoes', 257);
        } else {
            console.log('O elemento está fora da viewport.');
        }
    });
}

// Opções do Intersection Observer
const options = {
    root: null, // Usa a viewport do navegador como root
    rootMargin: '0px',
    threshold: 0.5 // Executa o callback quando 50% do alvo está visível
};

// Cria o Intersection Observer
const observer = new IntersectionObserver(callback, options);

// Adiciona um listener para o carregamento do DOM
document.addEventListener('DOMContentLoaded', function () {
    // Elemento alvo a ser observado
    const target = document.getElementById('resultados_alcancados');

    // Verifica se o elemento existe antes de observar
    if (target) {
        observer.observe(target);
    } else {
        console.error("Elemento com ID 'resultados_alcancados' não encontrado.");
    }
});

function contarAte(idElemento = '', max = 100) {
    const contador = document.getElementById(idElemento);
    let valorAtual = 0;
    const incremento = Math.ceil(max / 100);
    const intervalo = setInterval(() => {
        valorAtual += incremento;
        if (valorAtual >= max) {
            valorAtual = max;
            clearInterval(intervalo);
        }
        contador.textContent = valorAtual;
    }, 12);
}

