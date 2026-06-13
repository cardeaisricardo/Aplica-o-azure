# Cadastro de Mensagens - Aplicação Azure

Aplicação web simples para cadastro de mensagens integrada com o Azure SQL Database.

## 📋 Requisitos

- Node.js 14+
- npm ou yarn
- Conta no Azure com SQL Database configurado

## 🚀 Instalação e Configuração

### 1. Clonar ou baixar o projeto

```bash
cd cadastro-mensagens
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DB_SERVER=seu-servidor.database.windows.net
DB_NAME=seu-banco
DB_USER=seu-usuario
DB_PASSWORD=sua-senha
PORT=3000
```

**Nota:** Use o arquivo `.env.example` como referência.

### 4. Criar a tabela no banco de dados (opcional)

A aplicação cria a tabela automaticamente na primeira execução, mas você também pode executar manualmente:

```sql
CREATE TABLE Mensagens (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Texto NVARCHAR(255),
    DataCriacao DATETIME DEFAULT GETDATE()
);
```

### 5. Executar a aplicação

```bash
npm start
```

A aplicação estará disponível em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
app/
├── server.js           # Servidor Express e rotas da API
├── db.js              # Configuração e funções do banco de dados
├── package.json       # Dependências do projeto
├── .env.example       # Exemplo de variáveis de ambiente
├── README.md          # Este arquivo
└── public/
    └── index.html     # Interface web da aplicação
```

## 🎯 Funcionalidades

- **Inserir Mensagem:** Digite uma mensagem e clique em "Salvar"
- **Listar Mensagens:** Todas as mensagens salvas aparecem em uma tabela com ID, Texto e Data
- **Atualização em Tempo Real:** A tabela se atualiza automaticamente a cada 5 segundos

## 🔗 Endpoints da API

### GET `/api/mensagens`
Retorna todas as mensagens salvas.

**Resposta:**
```json
[
  {
    "Id": 1,
    "Texto": "Minha primeira mensagem",
    "DataCriacao": "2024-01-15T10:30:00.000Z"
  }
]
```

### POST `/api/mensagens`
Insere uma nova mensagem.

**Body:**
```json
{
  "mensagem": "Texto da mensagem"
}
```

**Resposta:**
```json
{
  "sucesso": true,
  "mensagem": "Mensagem salva com sucesso!"
}
```

## 🌐 Publicação no Azure App Service

### 1. Criar um repositório GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/seu-usuario/cadastro-mensagens.git
git push -u origin main
```

### 2. Criar App Service no Azure

- Acesse o [Portal Azure](https://portal.azure.com)
- Crie um novo **App Service**
- Escolha **Node.js** como runtime
- Configure a conexão com GitHub para deployment automático

### 3. Configurar variáveis de ambiente no App Service

No Azure Portal, vá para **Configurações** → **Variáveis de ambiente** e adicione:

```
DB_SERVER=seu-servidor.database.windows.net
DB_NAME=seu-banco
DB_USER=seu-usuario
DB_PASSWORD=sua-senha
```

### 4. Deploy

O deploy acontecerá automaticamente quando você fizer push para o GitHub.

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **mssql** - Driver para SQL Server
- **HTML/CSS/JavaScript** - Frontend

## 📝 Notas Importantes

- A aplicação usa autenticação padrão do SQL Server
- Certifique-se de que o firewall do Azure SQL permite conexões do App Service
- Use **Private Endpoints** para maior segurança em produção
- As senhas devem ser armazenadas de forma segura (use Azure Key Vault)

## 🐛 Troubleshooting

### Erro de conexão com o banco de dados

- Verifique se as credenciais estão corretas
- Confirme se o servidor SQL está acessível
- Verifique as regras de firewall do Azure SQL

### Porta já em uso

Se a porta 3000 já está em uso, você pode mudar:

```bash
PORT=3001 npm start
```

## 📞 Suporte

Para mais informações sobre Azure SQL Database, visite: [Azure SQL Documentation](https://docs.microsoft.com/azure/azure-sql/)

---

**Versão:** 1.0.0  
**Licença:** ISC
