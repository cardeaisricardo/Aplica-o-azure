const sql = require('mssql');

// Configuração de conexão com o Azure SQL Database
const config = {
  server: process.env.DB_SERVER || 'seu-servidor.database.windows.net',
  database: process.env.DB_NAME || 'seu-banco',
  authentication: {
    type: 'default',
    options: {
      userName: process.env.DB_USER || 'seu-usuario',
      password: process.env.DB_PASSWORD || 'sua-senha'
    }
  },
  options: {
    encrypt: true,
    trustServerCertificate: false,
    connectionTimeout: 30000,
    requestTimeout: 30000
  }
};

// Pool de conexões
let pool = null;

async function getConnection() {
  try {
    if (!pool) {
      pool = new sql.ConnectionPool(config);
      await pool.connect();
      console.log('Conectado ao banco de dados com sucesso!');
    }
    return pool;
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    throw err;
  }
}

// Função para inserir uma mensagem
async function inserirMensagem(texto) {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('texto', sql.NVarChar(255), texto)
      .query('INSERT INTO Mensagens (Texto, DataCriacao) VALUES (@texto, GETDATE())');
    
    return result;
  } catch (err) {
    console.error('Erro ao inserir mensagem:', err);
    throw err;
  }
}

// Função para listar todas as mensagens
async function listarMensagens() {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query('SELECT Id, Texto, DataCriacao FROM Mensagens ORDER BY DataCriacao DESC');
    
    return result.recordset;
  } catch (err) {
    console.error('Erro ao listar mensagens:', err);
    throw err;
  }
}

// Função para criar a tabela se não existir
async function criarTabela() {
  try {
    const pool = await getConnection();
    await pool
      .request()
      .query(`
        IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Mensagens')
        BEGIN
          CREATE TABLE Mensagens (
            Id INT IDENTITY(1,1) PRIMARY KEY,
            Texto NVARCHAR(255),
            DataCriacao DATETIME DEFAULT GETDATE()
          )
        END
      `);
    
    console.log('Tabela Mensagens verificada/criada com sucesso!');
  } catch (err) {
    console.error('Erro ao criar tabela:', err);
    throw err;
  }
}

module.exports = {
  getConnection,
  inserirMensagem,
  listarMensagens,
  criarTabela
};
