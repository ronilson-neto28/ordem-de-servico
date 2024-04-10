document.addEventListener('DOMContentLoaded', function() {

    // Exibe o formulário para adicionar um novo cliente
    document.getElementById('btn-add-cliente').addEventListener('click', function() {
        document.getElementById('form-add-cliente').style.display = 'block';
    });

    // Lidar com o envio do formulário de cliente
    document.getElementById('form-cliente').addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const telefone = document.getElementById('telefone').value;
        const email = document.getElementById('email').value;

        const cliente = {
            nome: nome,
            cpf: cpf,
            telefone: telefone,
            email: email
        };

        // Envia os dados do novo cliente para o servidor
        axios.post('http://localhost:3000/clientes', cliente)
        .then(function (response) {
            console.log('Sucesso:', response.data);
            // Fecha o formulário ou limpa os campos após o sucesso
            document.getElementById('form-cliente').reset();
            document.getElementById('form-add-cliente').style.display = 'none';
            // Atualiza a lista de cliente
            buscarClientes();
        })
        .catch(function (error) {
            console.error('Erro:', error);
            // Trata o erro aqui, como mostrar uma mensagem para o usuário
        });
    });

    function fecharFormulario() {
        document.getElementById('form-add-cliente').style.display = 'none';
    }

    // Busca e exibe os cliente
    function buscarClientes() {
        axios.get('http://localhost:3000/clientes')
        .then(function(response) {
            const clientes = response.data;
            const tabelaClientes = document.querySelector('.main-content tbody');
            tabelaClientes.innerHTML = ''; // Limpa a tabela antes de adicionar novas linhas

            clientes.forEach(cliente => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${cliente.id}</td>
                    <td>${cliente.nome}</td>
                    <td>${cliente.cpf}</td>
                    <td>${cliente.telefone}</td>
                    <td>${cliente.email}</td>
                    <td>
                        <button onclick="editarCliente(${cliente.id})">Editar</button>
                        <button onclick="excluirCliente(${cliente.id})">Excluir</button>
                    </td>
                `;
                tabelaClientes.appendChild(tr);
            });
        })
        .catch(function(error) {
            console.error('Erro ao buscar clientes:', error);
            // Aqui você pode tratar o erro, como exibir uma mensagem ao usuário
        });
    }

    // Chama buscarClientes para preencher a tabela ao carregar a página
    buscarClientes();

    // Exemplo de função para editar cliente
    window.editarCliente = function(id) {
        console.log(`Editar cliente ${id}`);
        // Aqui você pode adicionar a lógica para editar um cliente
    }

    // Exemplo de função para excluir cliente
    window.excluirCliente = function(id) {
    // Confirmação antes de excluir
    if (!confirm('Tem certeza que deseja excluir este cliente?')) {
        return; // Se o usuário não confirmar, não fazer nada
    }

    // Substitua a URL pela URL da sua API, usando o ID do cliente para excluir
    axios.delete(`http://localhost:3000/clientes/${id}`)
    .then(function(response) {
        console.log('Cliente excluído com sucesso:', response.data);
        // Atualiza a lista de clientes após a exclusão
        buscarClientes();
    })
    .catch(function(error) {
        console.error('Erro ao excluir cliente:', error);
        // Aqui você pode tratar o erro, como mostrar uma mensagem para o usuário
    });  
    
};

});
