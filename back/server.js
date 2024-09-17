require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexão com o banco de dados MySQL usando variáveis de ambiente
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'senha',
  database: process.env.DB_NAME || 'ecomanta'
});

// Conectar ao MySQL
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
  } else {
    console.log('Conectado ao banco de dados MySQL');
  }
});

// Rota para pegar dados do banco
app.get('/api/usuarios', (req, res) => {
  const query = 'SELECT * FROM usuarios';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao executar a query:', err);
      res.status(500).send('Erro no servidor');
    } else {
      res.json(results);
    }
  });
});

// Rota para adicionar dados no banco
app.post('/api/usuarios', (req, res) => {
  const { nome, email, cpf, telefone, endereco, data_nascimento, sexo, quantidade_comodos, estado_civil, tipo_casa, localizacao, senha } = req.body;
  const query = 'INSERT INTO usuarios (nome, email, cpf, telefone, endereco, data_nascimento, sexo, quantidade_comodos, estado_civil, tipo_casa, localizacao, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [nome, email, cpf, telefone, endereco, data_nascimento, sexo, quantidade_comodos, estado_civil, tipo_casa, localizacao, senha], (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados:', err);
      res.status(500).send('Erro no servidor');
    } else {
      res.status(201).json({ message: 'Dados inseridos com sucesso', id: result.insertId });
    }
  });
});

// Iniciar o servidor
app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
