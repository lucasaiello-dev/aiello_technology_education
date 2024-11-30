function enviarHTML() {
    const codigo_HTML = document.getElementById('text_html')
    const mostrar_HTML = document.getElementById('2')

    const conteudo_atual = codigo_HTML.value

    mostrar_HTML.innerHTML = conteudo_atual
}

// 

function enviarCSS() {
    const styleSheet = document.styleSheets[1]

    while (styleSheet.cssRules.length > 0) {
        styleSheet.deleteRule(0)
    }

    const codigoCss = document.getElementById('text_css').value
    var regrasCss = codigoCss.match(/[^{]+\{[^}]*\}/g)

    for (var i = 0; i < regrasCss.length; i++) {
        var regra_atual = regrasCss[i]

        if (regra_atual.slice(0, 3) == '\n\n') {
            regra_atual = regra_atual.slice(0, 3) + '.tela ' + regra_atual(4, regra_atual.length - 1)
        } else {
            regra_atual = '.tela ' + regra_atual
        }

        regrasCss[i] = regra_atual
        console.log(regrasCss)
    }

    if (regrasCss) {
        regrasCss.forEach(regra => {
            styleSheet.insertRule(regra, styleSheet.cssRules.length)
        })
    }
}

function enviarJS() {
    
    const codigo = document.getElementById('codigo').value
    try {
        eval(codigo)
    } catch (error) { 
        console.error('Erro ao executar o código:', error)
    }
}


