const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");  // Usando axios para fazer requisições HTTP

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Endpoint para o chat
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    // Faz a requisição diretamente à API da OpenAI usando axios
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-4",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,  // Usa a API Key do Secrets
          'Content-Type': 'application/json',
        },
      }
    );

    // Envia a resposta do GPT-4 de volta ao cliente
    res.json({
      message: response.data.choices[0].message.content,
    });
  } catch (error) {
    console.error("Erro na requisição à API:", error);
    res.status(500).send("Erro ao processar a solicitação.");
  }
});

// Inicia o servidor na porta 3000
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
