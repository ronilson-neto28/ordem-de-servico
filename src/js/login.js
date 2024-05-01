document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede que o formulário seja enviado da maneira convencional
        
        const formData = new FormData(loginForm);
        const email = formData.get('email');
        const senha = formData.get('senha');
        
        axios.post('http://localhost:3000/login', {
            email: email,
            senha: senha
        })
        .then(response => {
            if (response.data.success) {
                alert('Login bem-sucedido!');
                window.location.href = '/homepage.html';
            } else {
                alert('Falha no login: ' + response.data.message);
            }
        })
        .catch(error => {
            console.error('Erro ao fazer login:', error);
            alert('Erro ao tentar fazer login!');
        });
    });
});
