document.addEventListener('DOMContentLoaded', function() {
    const modalCadastrar = new bootstrap.Modal(document.getElementById('staticBackdrop'));

    modalCadastrar._element.addEventListener('shown.bs.modal', function () {
        carregarMarcas();
    });

    document.getElementById('marca').addEventListener('change', function() {
        const tipoId = this.value;
        carregarModelos(tipoId);
    });

    function carregarMarcas() {
        axios.get('http://[::1]:3000/tipo-dispositivos')
            .then(response => {
                const marcas = response.data;
                const marcaSelect = document.getElementById('marca');
                marcaSelect.innerHTML = '<option value="">Selecione uma Marca</option>' + marcas.map(marca => `<option value="${marca.id}">${marca.nome}</option>`).join('');
            })
            .catch(error => console.error('Erro ao buscar marcas:', error));
    }

    function carregarModelos(tipoId) {
        axios.get(`http://[::1]:3000/modelo-dispositivos?tipoId=${tipoId}`)
            .then(response => {
                const modelos = response.data;
                const modeloSelect = document.getElementById('modelo');
                modeloSelect.innerHTML = '<option value="">Selecione um Modelo</option>' + modelos.map(modelo => `<option value="${modelo.id}">${modelo.nome}</option>`).join('');
            })
            .catch(error => console.error(`Erro ao buscar modelos para o tipo ${tipoId}:`, error));
    }

    document.querySelector('#staticBackdrop .btn-primary').addEventListener('click', function() {
        const produto = document.getElementById('produto').value.trim();
        const custo = parseFloat(document.getElementById('custo').value);
        const quantidade = parseInt(document.getElementById('quantidade').value);
        const modeloDispositivoId = parseInt(document.getElementById('modelo').value);
    
        const estoqueData = {
            produto: produto,
            custo: custo,
            quantidade: quantidade,
            modeloDispositivoId: modeloDispositivoId
        };
    
        axios.post('http://[::1]:3000/estoques', estoqueData)
            .then(response => {
                // Hide the modal using Bootstrap 5 JavaScript API
                var modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
                modal.hide();
                listarEstoque();
            })
            .catch(error => console.error('Erro ao salvar produto:', error));
    });
    

    function listarEstoque() {
        axios.get('http://[::1]:3000/estoques')
        .then(response => {
            const estoques = response.data;
            const tbody = document.querySelector('.main-content tbody');
            tbody.innerHTML = '';
    
            estoques.forEach(estoque => {
                axios.get(`http://[::1]:3000/estoques/${estoque.id}/modelo-dispositivo`)
                .then(responseModelo => {
                    const modeloNome = responseModelo.data.nome;
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${estoque.id}</td>
                        <td>${modeloNome}</td>
                        <td>${estoque.produto}</td>
                        <td>${estoque.quantidade}</td>
                        <td>${estoque.custo.toFixed(2)}</td>
                        <td>
                            <button onclick="carregarDadosEdicao(${JSON.stringify(estoque)})" class="btn btn-info">Editar</button>
                            <button onclick="excluirEstoque(${estoque.id})" class="btn btn-danger">Excluir</button>
                        </td>
                    `;
                    tbody.appendChild(tr);
                });
                
            });
        })
        .catch(error => console.error('Erro ao buscar estoques:', error));
    }
    
    function adicionarEstoque() {
        const produto = document.getElementById('produto').value;
        const custo = parseFloat(document.getElementById('custo').value);
        const quantidade = parseInt(document.getElementById('quantidade').value);
        const modeloDispositivoId = parseInt(document.getElementById('modelo').value);
    
        axios.post('http://[::1]:3000/estoques', {
            produto,
            custo,
            quantidade,
            modeloDispositivoId
        })
        .then(response => {
            $('#staticBackdrop').modal('hide');
            listarEstoque(); // Atualiza a lista após adicionar
        })
        .catch(error => console.error('Erro ao adicionar produto ao estoque:', error));
    }
    
    document.querySelector('#staticBackdrop .btn-primary').addEventListener('click', adicionarEstoque);
    

    window.excluirEstoque = function(id) {
        if (confirm('Tem certeza que deseja excluir este produto?')) {
            axios.delete(`http://[::1]:3000/estoques/${id}`)
            .then(() => {
                alert('Produto excluído com sucesso!');
                listarEstoque();
            })
            .catch(error => console.error('Erro ao excluir produto:', error));
        }
    };

    window.carregarDadosEdicao = function(estoque) {
        axios.get(`http://[::1]:3000/estoques/${estoque.id}`)
        .then(response => {
            const dados = response.data;
            document.getElementById('produto').value = dados.produto;
            document.getElementById('custo').value = dados.custo;
            document.getElementById('quantidade').value = dados.quantidade;
            document.getElementById('modelo').value = dados.modelodispositivoid;
            modalCadastrar.show();
        })
        .catch(error => console.error(`Erro ao carregar dados do produto para edição:`, error));
    };

    var btnExpandir = document.querySelector('#btn-exp')
    var menuSide = document.querySelector('.sidebar')

    btnExpandir.addEventListener('click', function() {
        menuSide.classList.toggle('expandir')
    });

    listarEstoque();
});
