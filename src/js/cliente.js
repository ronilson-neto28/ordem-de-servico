document.addEventListener('DOMContentLoaded', function() {
    const modalCadastrar = new bootstrap.Modal(document.getElementById('staticBackdrop'));

    function formatarTelefone(telefone) {
        const regex = /^(\d{2})(\d{5})(\d{4})$/;
        return telefone.replace(regex, '($1) $2-$3');
    }

    function formatarCPF(cpf) {
        const regex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
        return cpf.replace(regex, '$1.$2.$3-$4');
    }   

    // Adicionar cliente e contatos
    document.querySelector('#staticBackdrop .btn-primary').addEventListener('click', function() {
        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const email = document.getElementById('email').value;
        const telefone1 = document.getElementById('telefone1').value;
        const telefone2 = document.getElementById('telefone2').value;

        const clienteData = {
            nome: nome,
            cpf: cpf,
            email: email
        };

        axios.post('http://[::1]:3000/clientes', clienteData)
        .then(response => {
            const clienteId = response.data.id;
            const telefones = [telefone1, telefone2].filter(t => t);
            telefones.forEach(telefone => {
                axios.post('http://[::1]:3000/contato-cs', {
                    telefone: telefone,
                    clienteId: clienteId
                });
            });

            modalCadastrar.hide();
            listarClientes();
        })
        .catch(error => console.error('Erro ao salvar cliente:', error));
    });

    function listarClientes() {
        axios.get('http://[::1]:3000/clientes')
        .then(response => {
            const clientes = response.data;
            const tbody = document.querySelector('.main-content tbody');
            tbody.innerHTML = ''; // Limpa tabela
    
            clientes.forEach(cliente => {
                // Atualize a URL de acordo com a nova rota de contato-cs específica do cliente
                axios.get(`http://[::1]:3000/clientes/${cliente.id}/contato-cs`)
                .then(responseContatos => {
                    const telefones = responseContatos.data
                        .map(contato => formatarTelefone(contato.telefone))
                        .join(' - ');
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${cliente.id}</td>
                        <td>${cliente.nome}</td>
                        <td>${formatarCPF(cliente.cpf)}</td>
                        <td>${telefones}</td>
                        <td>${cliente.email}</td>
                        <td>
                            <button onclick="carregarDadosEdicao(${JSON.stringify(cliente)})" class="btn btn-info">Editar</button>
                            <button onclick="excluirCliente(${cliente.id})" class="btn btn-danger">Excluir</button>
                        </td>
                    `;
                    tbody.appendChild(tr);
                })
                .catch(error => console.error(`Erro ao buscar contatos do cliente ${cliente.id}:`, error));
            });
        })
        .catch(error => console.error('Erro ao buscar clientes:', error));
    }
    
    // Excluir cliente
    window.excluirCliente = function(id) {
        if (confirm('Tem certeza que deseja excluir este cliente?')) {
            axios.delete(`http://[::1]:3000/clientes/${id}`)
            .then(() => {
                alert('Cliente excluído com sucesso!');
                listarClientes();
            })
            .catch(error => console.error('Erro ao excluir cliente:', error));
        }
    };

    // Editar cliente
    window.editarCliente = function(id) {
        console.log(`Editar cliente ${id}`);
        // Você precisaria de uma forma de carregar os dados do cliente para edição e salvar as alterações
    };

    // Carregar dados para edição
    window.carregarDadosEdicao = function(clienteId) {
        axios.get(`http://[::1]:3000/clientes/${clienteId}`)
        .then(response => {
            const cliente = response.data;
            // Preencher o formulário com os dados do cliente
            document.getElementById('nome').value = cliente.nome;
            document.getElementById('cpf').value = formatarCPF(cliente.cpf);
            document.getElementById('email').value = cliente.email;
            // Supondo que o primeiro telefone está no cliente.telefones[0], se não, ajuste conforme necessário
            document.getElementById('telefone1').value = cliente.telefones && cliente.telefones.length > 0 ? formatarTelefone(cliente.telefones[0]) : '';
            document.getElementById('telefone2').value = cliente.telefones && cliente.telefones.length > 1 ? formatarTelefone(cliente.telefones[1]) : '';
            // Exibir o modal para edição
            modalCadastrar.show();
            // Atualize o evento do botão para salvar as alterações
            document.querySelector('#staticBackdrop .btn-primary').addEventListener('click', function() {
                salvarEdicao(clienteId); // Função para salvar as edições
            });
        })
        .catch(error => console.error(`Erro ao carregar dados do cliente ${clienteId} para edição:`, error));
    };

    // Salvar edições do cliente
    window.salvarEdicao = function(clienteId) {
        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const email = document.getElementById('email').value;
        const telefone1 = document.getElementById('telefone1').value;
        const telefone2 = document.getElementById('telefone2').value;
        // Atualizar os dados do cliente
        // ... (implemente a lógica de atualização aqui)
    };

    // expandir o menu
    var btnExpandir = document.querySelector('#btn-exp')
    var menuSide = document.querySelector('.sidebar')

    btnExpandir.addEventListener('click', function(){
        menuSide.classList.toggle('expandir')
    })

    listarClientes();
});
