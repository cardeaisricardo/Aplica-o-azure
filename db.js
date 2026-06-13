// Banco em memória (temporário)

let mensagens = [];

async function getConnection() {
  return true;
}

async function criarTabela() {
  console.log("Banco em memória iniciado.");
}

async function inserirMensagem(texto) {
  const novaMensagem = {
    Id: mensagens.length + 1,
    Texto: texto,
    DataCriacao: new Date()
  };

  mensagens.unshift(novaMensagem);

  return {
    rowsAffected: [1]
  };
}

async function listarMensagens() {
  return mensagens;
}

module.exports = {
  getConnection,
  inserirMensagem,
  listarMensagens,
  criarTabela
};