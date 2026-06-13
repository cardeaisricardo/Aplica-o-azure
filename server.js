const express = require("express");
const path = require("path");

const {
  inserirMensagem,
  listarMensagens,
  criarTabela
} = require("./db");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/mensagens", async (req, res) => {
  try {
    const mensagens = await listarMensagens();
    res.json(mensagens);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      erro: "Erro ao listar mensagens"
    });
  }
});

app.post("/api/mensagens", async (req, res) => {
  try {
    const { texto } = req.body;

    if (!texto || texto.trim() === "") {
      return res.status(400).json({
        erro: "Mensagem inválida"
      });
    }

    await inserirMensagem(texto);

    res.json({
      sucesso: true
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      erro: "Erro ao salvar mensagem"
    });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

async function iniciar() {
  try {
    await criarTabela();

    app.listen(PORT, () => {
      console.log(`Servidor iniciado na porta ${PORT}`);
    });
  } catch (err) {
    console.error("Erro ao iniciar aplicação:", err);
  }
}

iniciar();