const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors()); // Habilita o CORS
app.use(bodyParser.json()); // Permite que o servidor entenda JSON

// Suponha que esta é a rota existente que retorna todos os contatos
// Modifique-a para aceitar um parâmetro de consulta clienteId
app.get('/contato-cs', (req, res) => {
    const { clienteId } = req.query; // Obtenha o clienteId da query string
    if (clienteId) {
        // Aqui você adicionaria a lógica para buscar os contatos apenas para o clienteId especificado
        // Por exemplo:
        buscarContatosPorClienteId(clienteId).then(contatos => {
            res.json(contatos);
        }).catch(err => {
            res.status(500).send('Erro ao buscar contatos');
        });
    } else {
        // Se não for especificado um clienteId, talvez você queira retornar todos os contatos ou nenhum
        res.status(400).send('ClienteId é necessário');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
