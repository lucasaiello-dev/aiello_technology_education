$(document).ready(function () {
    $('#input_cep').mask('00000-000');
    $('#input_telefone').mask('(00)00000-0000');
    $('#input_num').mask('0000');
    $('#input_dtNasc').mask('00/00/0000')
});

function trocarTypeSenha(local) {

    const campo = document.getElementById(`input_${local}`)
    const imagem = document.getElementById(`img_${local}`)

    if (campo.type == 'password') {
        campo.type = 'text'
        imagem.src = 'assets/eye.png'
    } else {
        campo.type = 'password'
        imagem.src = 'assets/eye-crossed.png'
    }
}

function mostrarPopup(titulo = 'Titulo',mensagem = 'Escreva a sua mensagem aqui',textoBtn = 'Ação', destino = '') {
    document.getElementById('titulo').innerHTML = titulo
    document.getElementById('mensagem').innerHTML = mensagem
    const botao = document.getElementById('btn_popup')
    botao.innerHTML = textoBtn

    if(destino != '') {
        botao.onclick = function() { 
            window.location.href = destino
        }
    }

    document.getElementById('meuPopup').style.display = 'flex';
    document.getElementById('meuPopup').style.opacity = '0%';

    document.getElementById('fundoEscuro').style.display = 'block';
    document.getElementById('fundoEscuro').style.opacity = '0%';

    setTimeout(() => {document.getElementById('meuPopup').style.opacity = '100%', setTimeout(() => {document.getElementById('fundoEscuro').style.opacity = '100%';})}, 200)
}

function fecharPopup() {
    document.getElementById('meuPopup').style.display = 'none';
    document.getElementById('fundoEscuro').style.display = 'none';
}
