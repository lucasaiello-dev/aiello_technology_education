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
