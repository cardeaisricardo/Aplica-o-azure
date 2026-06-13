const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rota para servir a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API: Listar todas as mensagens
app.get('/api/mensagens', async (req, res) => {
  try {
    const mensagens = await db.listarMensagens();
    res.json(mensagens);
  } catch (err) {
    console.error('Erro ao listar mensagens:', err);
    res.status(500).json({ erro: 'Erro ao listar mensagens' });
  }
});

// API: Inserir uma nova mensagem
app.post('/api/mensagens', async (req, res) => {
  try {
    const { mensagem } = req.body;

    if (!mensagem || mensagem.trim() === '') {
      return res.status(400).json({ erro: 'Mensagem não pode estar vazia' });
    }

    await db.inserirMensagem(mensagem);
    res.json({ sucesso: true, mensagem: 'Mensagem salva com sucesso!' });
  } catch (err) {
    console.error('Erro ao inserir mensagem:', err);
    res.status(500).json({ erro: 'Erro ao salvar mensagem' });
  }
});

// Inicializar a aplicação
async function inicializar() {
  try {
    // Criar tabela se não existir
    await db.criarTabela();

    // Iniciar o servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Erro ao inicializar a aplicação:', err);
    process.exit(1);
  }
}

inicializar();
