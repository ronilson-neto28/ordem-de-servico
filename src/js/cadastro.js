document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form');
    if (!form) {
        console.error('Formulário não encontrado!');
        return;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Captura os valores dos inputs utilizando classes e tipos
        const inputs = form.querySelectorAll('.input');
        if (inputs.length < 5) {
            alert('Um ou mais campos do formulário estão ausentes.');
            return;
        }

        const nome = inputs[0].value; // Nome e Sobrenome
        const cpf = inputs[1].value; // Cpf
        const email = inputs[2].value; // Email
        const senha = inputs[3].value; // Senha
        const confirmSenha = inputs[4].value; // Confirme sua senha

        // Valida os inputs
        if (senha !== confirmSenha) {
            alert('As senhas não correspondem.');
            return;
        }

        // Prepara os dados para enviar ao servidor
        const usuario = {
            nome: nome.trim(),
            cpf: cpf.trim(),
            email: email.trim(),
            senha: senha
        };

        // Envia uma requisição POST para o servidor
        axios.post('http://[::1]:3000/usuarios', usuario, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resposta => {
            if (resposta.status === 200) {
                window.location.href = 'login.html';
            } else {
                alert('Erro ao cadastrar. Por favor, tente novamente.');
            }
        })
        .catch(erro => {
            console.error('Erro no cadastro:', erro);
            alert('Erro ao cadastrar. Por favor, verifique os dados e tente novamente.');
        });
    });
});
