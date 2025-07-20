const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

const url = 'mongodb://mongo:27017';
const client = new MongoClient(url);
const dbName = 'sorteios';

app.use(cors());
app.use(bodyParser.json());

async function main() {
  await client.connect();
  const db = client.db(dbName);
  const numeros = db.collection('numeros');

  app.post('/api/salvar', async (req, res) => {
    const { valor } = req.body;
    await numeros.insertOne({ valor, data: new Date() });
    res.sendStatus(200);
  });

  app.get('/api/numero-salvo', async (req, res) => {
    const result = await numeros.aggregate([{ $sample: { size: 1 } }]).toArray();
    res.json(result[0]);
  });

  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}

main().catch(console.error);