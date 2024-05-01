document.addEventListener('DOMContentLoaded', function () {
    fetchClientes();
    fetchTecnicos();
});

function fetchClientes() {
    fetch('http://[::1]:3000/clientes')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('clienteSelect');
            data.forEach(cliente => {
                let option = new Option(cliente.nome, cliente.id);
                select.add(option);
            });
        });
}

function fetchTecnicos() {
    fetch('http://[::1]:3000/tecnicos')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('tecnicoSelect');
            data.forEach(tecnico => {
                let option = new Option(tecnico.nome, tecnico.id);
                select.add(option);
            });
        });
}

function submitOSForm() {
    const osData = {
        clienteId: document.getElementById('clienteSelect').value,
        tecnicoId: document.getElementById('tecnicoSelect').value,
        // Inclua aqui todos os campos booleanos
        telaDisplay: document.getElementById('telaDisplay').checked,
        // e assim por diante...
    };

    fetch('http://[::1]:3000/os', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(osData)
    })
    .then(response => response.json())
    .then(data => console.log('OS criada:', data))
    .catch(error => console.error('Erro ao criar OS:', error));
}

var btnExpandir = document.querySelector('#btn-exp');
    var menuSide = document.querySelector('.sidebar');

    btnExpandir.addEventListener('click', function(){
        menuSide.classList.toggle('expandir');
    });

// Adicionar função para upload de fotos quando a rota estiver pronta
