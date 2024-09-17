require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // Para comparação de senha

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

// Rota para operações relacionadas aos usuários
app.route('/api/usuarios')
  .get((req, res) => {
    const query = 'SELECT * FROM usuarios';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Erro ao executar a query:', err);
        res.status(500).send('Erro no servidor');
      } else {
        res.json(results);
      }
    });
  })
  .post((req, res) => {
    if (req.body.login) {
      const { cpf, senha } = req.body;

      const query = 'SELECT * FROM usuarios WHERE cpf = ?';
      db.query(query, [cpf], (err, results) => {
        if (err) {
          console.error('Erro ao buscar o usuário:', err);
          return res.status(500).json({ success: false, message: 'Erro no servidor' });
        }

        if (results.length === 0) {
          return res.status(401).json({ success: false, message: 'CPF ou senha incorretos.' });
        }

        const usuario = results[0];

        // Comparar a senha fornecida com a senha armazenada (com hash)
        bcrypt.compare(senha, usuario.senha, (err, match) => {
          if (err) {
            console.error('Erro ao comparar senhas:', err);
            return res.status(500).json({ success: false, message: 'Erro no servidor' });
          }

          if (!match) {
            return res.status(401).json({ success: false, message: 'CPF ou senha incorretos.' });
          }

          // Se a senha for válida
          res.json({ success: true, message: 'Login bem-sucedido!' });
        });
      });
    } else {
      // Se não for uma solicitação de login, trata como uma inserção de usuário
      const {
        nome = null,
        email = null,
        cpf,
        telefone = null,
        endereco = null,
        data_nascimento = null,
        sexo = null,
        quantidade_comodos = null,
        estado_civil = null,
        tipo_casa = null,
        localizacao = null,
        senha
      } = req.body;

      // Verifica se os campos obrigatórios estão presentes
      if (!cpf || !senha) {
        return res.status(400).json({ message: 'CPF e senha são obrigatórios.' });
      }

      // Hash da senha antes de inserir no banco
      bcrypt.hash(senha, 10, (err, hash) => {
        if (err) {
          console.error('Erro ao hash da senha:', err);
          res.status(500).send('Erro ao processar a senha');
          return;
        }

        const query = `
          INSERT INTO usuarios 
          (nome, email, cpf, telefone, endereco, data_nascimento, sexo, quantidade_comodos, estado_civil, tipo_casa, localizacao, senha) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        db.query(query, [
          nome, email, cpf, telefone, endereco, data_nascimento, sexo, quantidade_comodos, estado_civil, tipo_casa, localizacao, hash
        ], (err, result) => {
          if (err) {
            console.error('Erro ao inserir dados:', err);
            res.status(500).send('Erro no servidor');
          } else {
            res.status(201).json({ message: 'Dados inseridos com sucesso', id: result.insertId });
          }
        });
      });
    }
  });

// Iniciar o servidor
app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
