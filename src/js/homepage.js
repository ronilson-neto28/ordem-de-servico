// homepage.js
document.addEventListener('DOMContentLoaded', function() {
    
    // Selecione o botão pelo id
    const btnClientes = document.getElementById('btn-clientes');
    const btnProdutos = document.getElementById('btn-produtos');
    const btnServicos = document.getElementById('btn-servicos');
    const btnOs = document.getElementById('btn-os');
    const btnVendas = document.getElementById('btn-vendas');
    
    // Adicione um ouvinte de eventos para o 'click'
    btnClientes.addEventListener('click', function() {
        // Redirecione para cliente.html
        window.location.href = 'cliente.html';
    });

    btnProdutos.addEventListener('click', function() {
        // Redirecione para produto.html
        window.location.href = 'produto.html';
    });

    btnServicos.addEventListener('click', function() {
        // Redirecione para servico.html
        window.location.href = 'servico.html';
    });

    btnOs.addEventListener('click', function() {
        // Redirecione para os.html
        window.location.href = 'os.html';
    });

    btnVendas.addEventListener('click', function() {
        // Redirecione para venda.html
        window.location.href = 'venda.html';
    });

    // ...código para os outros botões...
});
