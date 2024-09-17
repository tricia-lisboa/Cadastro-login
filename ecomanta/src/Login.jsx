import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Assumindo que você tenha um CSS para estilização

const Login = () => {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:3001/api/usuarios', { login: true, cpf, senha })

      .then(response => {
        if (response.data.success) {
          alert('Login bem-sucedido!');
          navigate('/usuarios'); // Redireciona para a página de cadastro de usuários
        } else {
          alert('CPF ou senha incorretos');
        }
      })
      .catch(error => {
        console.error("Erro ao tentar fazer login: ", error);
      });
  };

  const handleGoToCadastro = () => {
    navigate('/dados'); // Redireciona para a página de cadastro
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>CPF</label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
      <button onClick={handleGoToCadastro} className="cadastro-button">
        Não tem cadastro? Clique aqui para se cadastrar
      </button>
    </div>
  );
};

export default Login;
