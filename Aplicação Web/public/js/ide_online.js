window.onload = function() { 
    document.getElementById('htmlCode').setAttribute('spellcheck', 'false')
    document.getElementById('cssCode').setAttribute('spellcheck', 'false')
    document.getElementById('jsCode').setAttribute('spellcheck', 'false')
}

function updatePreview() {
    const htmlCode = document.getElementById('htmlCode').value;
    const cssCode = document.getElementById('cssCode').value;
    const jsCode = document.getElementById('jsCode').value;

    const previewFrame = document.getElementById('previewFrame');
    const preview = previewFrame.contentDocument || previewFrame.contentWindow.document;

    preview.open();
    preview.write(`
        <!DOCTYPE html>
        <html lang="pt-BR">
            <head> 
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>ATE Coding</title>
                <style>${cssCode}</style>
            </head>
            <body>
                ${htmlCode}
                <script>${jsCode}<\/script>
            </body>
        </html>
    `);
    preview.close();
}

var paginaAtual = document.getElementById('htmlCode')

function alterarPagina(idProximaPagina) {
    const proximaPagina = document.getElementById(idProximaPagina)

    paginaAtual.classList.add('esconder')
    proximaPagina.classList.remove('esconder')

    paginaAtual = proximaPagina
}

async function limparCodigo() {
    document.getElementById('htmlCode').value = ''
    document.getElementById('cssCode').value = ''
    document.getElementById('jsCode').value = ''
    await updatePreview()
}

async function baixarIframe() { 
    const iframe = document.getElementById('previewFrame')
    const iframeContent = iframe.contentDocument.documentElement.outerHTML
    const blob = new Blob([iframeContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'meu_codigo.html'
    document.body.appendChild(a)
    await a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
 }