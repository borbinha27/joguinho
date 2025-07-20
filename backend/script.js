require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.BACKEND_PORT || 3000;

const mongoUri = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@mongo:27017/${process.env.MONGO_DB_NAME}?authSource=admin`;
const client = new MongoClient(mongoUri);

app.use(cors());
app.use(bodyParser.json());

async function main() {
  await client.connect();
  const db = client.db(process.env.MONGO_DB_NAME);
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