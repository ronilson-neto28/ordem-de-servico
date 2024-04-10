document.addEventListener('DOMContentLoaded', function() {

    // Exibe o formulário para adicionar um novo técnico
    document.getElementById('btn-add-tecnico').addEventListener('click', function() {
        document.getElementById('form-add-tecnico').style.display = 'block';
    });

    // Lidar com o envio do formulário de técnico
    document.getElementById('form-tecnico').addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;
        const cpf = document.getElementById('cpf').value;

        const tecnico = {
            nome: nome,
            telefone: telefone,
            cpf: cpf
        };

        // Envia os dados do novo técnico para o servidor
        axios.post('http://localhost:3000/tecnicos', tecnico)
        .then(function (response) {
            console.log('Sucesso:', response.data);
            // Fecha o formulário ou limpa os campos após o sucesso
            document.getElementById('form-tecnico').reset();
            document.getElementById('form-add-tecnico').style.display = 'none';
            // Atualiza a lista de técnicos
            buscarTecnicos();
        })
        .catch(function (error) {
            console.error('Erro:', error);
            // Trata o erro aqui, como mostrar uma mensagem para o usuário
        });
    });

    function fecharFormulario() {
        document.getElementById('form-add-tecnico').style.display = 'none';
    }

    // Busca e exibe os técnicos
    function buscarTecnicos() {
        axios.get('http://localhost:3000/tecnicos')
        .then(function(response) {
            const tecnicos = response.data;
            const tabelaTecnicos = document.querySelector('.main-content tbody');
            tabelaTecnicos.innerHTML = ''; // Limpa a tabela antes de adicionar novas linhas

            tecnicos.forEach(tecnico => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${tecnico.id}</td>
                    <td>${tecnico.nome}</td>
                    <td>${tecnico.telefone}</td>
                    <td>${tecnico.cpf}</td>
                    <td>
                        <button onclick="editarTecnico(${tecnico.id})">Editar</button>
                        <button onclick="excluirTecnico(${tecnico.id})">Excluir</button>
                    </td>
                `;
                tabelaTecnicos.appendChild(tr);
            });
        })
        .catch(function(error) {
            console.error('Erro ao buscar técnicos:', error);
            // Aqui você pode tratar o erro, como exibir uma mensagem ao usuário
        });
    }

    // Chama buscarTecnicos para preencher a tabela ao carregar a página
    buscarTecnicos();

    // Exemplo de função para editar técnico
    window.editarTecnico = function(id) {
        console.log(`Editar técnico ${id}`);
        // Aqui você pode adicionar a lógica para editar um técnico
    }

    // Exemplo de função para excluir técnico
    window.excluirTecnico = function(id) {
    // Confirmação antes de excluir
    if (!confirm('Tem certeza que deseja excluir este técnico?')) {
        return; // Se o usuário não confirmar, não fazer nada
    }

    // Substitua a URL pela URL da sua API, usando o ID do técnico para excluir
    axios.delete(`http://localhost:3000/tecnicos/${id}`)
    .then(function(response) {
        console.log('Técnico excluído com sucesso:', response.data);
        // Atualiza a lista de técnicos após a exclusão
        buscarTecnicos();
    })
    .catch(function(error) {
        console.error('Erro ao excluir técnico:', error);
        // Aqui você pode tratar o erro, como mostrar uma mensagem para o usuário
    });

    
    
};

});
