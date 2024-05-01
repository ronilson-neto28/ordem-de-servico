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
        if (!tipoId) {
            const modeloSelect = document.getElementById('modelo');
            modeloSelect.innerHTML = '<option value="">Primeiro selecione uma Marca</option>';
            return;
        }
        axios.get(`http://[::1]:3000/modelo-dispositivos?tipoId=${tipoId}`)  // Verifique se esta URL está correta
            .then(response => {
                const modelos = response.data;
                const modeloSelect = document.getElementById('modelo');
                modeloSelect.innerHTML = '<option value="">Selecione um Modelo</option>' + modelos.map(modelo => `<option value="${modelo.id}">${modelo.nome}</option>`).join('');
            })
            .catch(error => console.error(`Erro ao buscar modelos para o tipo ${tipoId}:`, error));
    }

    document.querySelector('#staticBackdrop .btn-primary').addEventListener('click', function() {
        const descricao = document.getElementById('descricao').value;
        const custo = parseFloat(document.getElementById('custo').value);
        const modeloDispositivoId = parseInt(document.getElementById('modelo').value);

        const servicoData = {
            descricao: descricao,
            custo: custo,
            modeloDispositivoId: modeloDispositivoId
        };

        axios.post('http://[::1]:3000/servicos', servicoData)
        .then(() => {
            modalCadastrar.hide();
            listarServicos();
        })
        .catch(error => console.error('Erro ao salvar serviço:', error));
    });

    function listarServicos() {
        axios.get('http://[::1]:3000/servicos')
        .then(response => {
            const servicos = response.data;
            const tbody = document.querySelector('.main-content tbody');
            tbody.innerHTML = '';

            servicos.forEach(servico => {
                axios.get(`http://[::1]:3000/servicos/${servico.id}/modelo-dispositivo`)
                .then(responseModelo => {
                    const modeloNome = responseModelo.data.nome;
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${servico.id}</td>
                        <td>${modeloNome}</td>
                        <td>${servico.descricao}</td>
                        <td>${servico.custo.toFixed(2)}</td>
                        <td>
                            <button onclick="carregarDadosEdicao(${JSON.stringify(servico)})" class="btn btn-info">Editar</button>
                            <button onclick="excluirServico(${servico.id})" class="btn btn-danger">Excluir</button>
                        </td>
                    `;
                    tbody.appendChild(tr);
                })
                .catch(error => console.error(`Erro ao buscar modelo do dispositivo para o serviço ${servico.id}:`, error));
            });
        })
        .catch(error => console.error('Erro ao buscar serviços:', error));
    }

    window.excluirServico = function(id) {
        if (confirm('Tem certeza que deseja excluir este serviço?')) {
            axios.delete(`http://[::1]:3000/servicos/${id}`)
            .then(() => {
                alert('Serviço excluído com sucesso!');
                listarServicos();
            })
            .catch(error => console.error('Erro ao excluir serviço:', error));
        }
    };

    window.carregarDadosEdicao = function(servico) {
        axios.get(`http://[::1]:3000/servicos/${servico.id}`)
        .then(response => {
            const dados = response.data;
            document.getElementById('descricao').value = dados.descricao;
            document.getElementById('custo').value = dados.custo;
            document.getElementById('modelo').value = dados.modeloDispositivoId;
            modalCadastrar.show();
        })
        .catch(error => console.error(`Erro ao carregar dados do serviço para edição:`, error));
    };

    var btnExpandir = document.querySelector('#btn-exp');
    var menuSide = document.querySelector('.sidebar');

    btnExpandir.addEventListener('click', function(){
        menuSide.classList.toggle('expandir');
    });

    listarServicos();
});
