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

    // Adicionar tecnico e contatos
    document.querySelector('#staticBackdrop .btn-primary').addEventListener('click', function() {
        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const telefone1 = document.getElementById('telefone1').value;
        const telefone2 = document.getElementById('telefone2').value;

        const tecnicoData = {
            nome: nome,
            cpf: cpf
        };

        axios.post('http://[::1]:3000/tecnicos', tecnicoData)
        .then(response => {
            const tecnicoId = response.data.id;
            const telefones = [telefone1, telefone2].filter(t => t);
            telefones.forEach(telefone => {
                axios.post('http://[::1]:3000/contato-tecnicos', {
                    telefone: telefone,
                    tecnicoId: tecnicoId
                });
            });

            modalCadastrar.hide();
            listarTecnicos();
        })
        .catch(error => console.error('Erro ao salvar tecnico:', error));
    });

    function listarTecnicos() {
        axios.get('http://[::1]:3000/tecnicos')
        .then(response => {
            const tecnicos = response.data;
            const tbody = document.querySelector('.main-content tbody');
            tbody.innerHTML = ''; // Limpa tabela
    
            tecnicos.forEach(tecnico => {
                // Atualize a URL de acordo com a nova rota de contato-tecnicos específica do tecnico
                axios.get(`http://[::1]:3000/tecnicos/${tecnico.id}/contato-tecnicos    `)
                .then(responseContatos => {
                    const telefones = responseContatos.data
                        .map(contato => formatarTelefone(contato.telefone))
                        .join(' - ');
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${tecnico.id}</td>
                        <td>${tecnico.nome}</td>
                        <td>${formatarCPF(tecnico.cpf)}</td>
                        <td>${telefones}</td>
                        <td>
                            <button onclick="carregarDadosEdicao(${JSON.stringify(tecnico)})" class="btn btn-info">Editar</button>
                            <button onclick="excluirTecnico(${tecnico.id})" class="btn btn-danger">Excluir</button>
                        </td>
                    `;
                    tbody.appendChild(tr);
                })
                .catch(error => console.error(`Erro ao buscar contatos do tecnico ${tecnico.id}:`, error));
            });
        })
        .catch(error => console.error('Erro ao buscar tecnicos:', error));
    }
    
    // Excluir tecnico
    window.excluirTecnico = function(id) {
        if (confirm('Tem certeza que deseja excluir este tecnico?')) {
            axios.delete(`http://[::1]:3000/tecnicos/${id}`)
            .then(() => {
                alert('Tecnico excluído com sucesso!');
                listarTecnicos();
            })
            .catch(error => console.error('Erro ao excluir tecnico:', error));
        }
    };

    // Editar tecnico
    window.editarTecnico = function(id) {
        console.log(`Editar Tecnico ${id}`);
        // Você precisaria de uma forma de carregar os dados do tecnico para edição e salvar as alterações
    };

    // Carregar dados para edição
    window.carregarDadosEdicao = function(tecnicoId) {
        axios.get(`http://[::1]:3000/tecnicos/${tecnicoId}`)
        .then(response => {
            const tecnico = response.data;
            // Preencher o formulário com os dados do tecnico
            document.getElementById('nome').value = tecnico.nome;
            document.getElementById('cpf').value = formatarCPF(tecnico.cpf);
            // Supondo que o primeiro telefone está no tecnico.telefones[0], se não, ajuste conforme necessário
            document.getElementById('telefone1').value = tecnico.telefones && tecnico.telefones.length > 0 ? formatarTelefone(tecnico.telefones[0]) : '';
            document.getElementById('telefone2').value = tecnico.telefones && tecnico.telefones.length > 1 ? formatarTelefone(tecnico.telefones[1]) : '';
            // Exibir o modal para edição
            modalCadastrar.show();
            // Atualize o evento do botão para salvar as alterações
            document.querySelector('#staticBackdrop .btn-primary').addEventListener('click', function() {
                salvarEdicao(tecnicoId); // Função para salvar as edições
            });
        })
        .catch(error => console.error(`Erro ao carregar dados do tecnico ${tecnicoId} para edição:`, error));
    };

    // Salvar edições do tecnico
    window.salvarEdicao = function(tecnicoId) {
        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const telefone1 = document.getElementById('telefone1').value;
        const telefone2 = document.getElementById('telefone2').value;
        // Atualizar os dados do tecnico
        // ... (implemente a lógica de atualização aqui)
    };

    // expandir o menu
    var btnExpandir = document.querySelector('#btn-exp')
    var menuSide = document.querySelector('.sidebar')

    btnExpandir.addEventListener('click', function(){
        menuSide.classList.toggle('expandir')
    })

    listarTecnicos();
});
