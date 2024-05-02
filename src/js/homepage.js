// homepage.js
document.addEventListener('DOMContentLoaded', function() {
    
    // Selecione o botão pelo id
    const btnClientes = document.getElementById('btn-clientes');
    const btnEstoques = document.getElementById('btn-estoques');
    const btnServicos = document.getElementById('btn-servicos');
    const btnOs = document.getElementById('btn-os');
    const btnTecnicos = document.getElementById('btn-tecnicos');
    
    // Adicione um ouvinte de eventos para o 'click'
    btnClientes.addEventListener('click', function() {
        // Redirecione para cliente.html
        window.location.href = 'cliente.html';
    });

    btnEstoques.addEventListener('click', function() {
        // Redirecione para produto.html
        window.location.href = 'estoque.html';
    });

    btnServicos.addEventListener('click', function() {
        // Redirecione para servico.html
        window.location.href = 'servico.html';
    });

    btnOs.addEventListener('click', function() {
        // Redirecione para os.html
        window.location.href = 'os.html';
    });

    btnTecnicos.addEventListener('click', function() {
        // Redirecione para venda.html
        window.location.href = 'tecnico.html';
    });

    // ...código para os outros botões...
});
