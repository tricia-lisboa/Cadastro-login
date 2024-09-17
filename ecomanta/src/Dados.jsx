import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate
import './Dados.css'; 

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [sexo, setSexo] = useState('');
  const [quantidadeComodos, setQuantidadeComodos] = useState('');
  const [estadoCivil, setEstadoCivil] = useState('');
  const [tipoCasa, setTipoCasa] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [senha, setSenha] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/api/usuarios')
      .then(response => {
        setUsuarios(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar os usuários: ", error);
      });
  }, []);

  const adicionarUsuario = (e) => {
    e.preventDefault();
    const novoUsuario = {
      nome,
      email,
      cpf,
      telefone,
      endereco,
      data_nascimento: dataNascimento,
      sexo,
      quantidade_comodos: quantidadeComodos,
      estado_civil: estadoCivil,
      tipo_casa: tipoCasa,
      localizacao,
      senha
    };

    axios.post('http://localhost:3001/api/usuarios', novoUsuario)
      .then(response => {
        alert(response.data.message);
        setUsuarios([...usuarios, { id: response.data.id, ...novoUsuario }]);
        // Limpar os campos
        setNome('');
        setEmail('');
        setCpf('');
        setTelefone('');
        setEndereco('');
        setDataNascimento('');
        setSexo('');
        setQuantidadeComodos('');
        setEstadoCivil('');
        setTipoCasa('');
        setLocalizacao('');
        setSenha('');
      })
      .catch(error => {
        console.error("Erro ao adicionar o usuário: ", error);
      });
  };

  return (
    <div className="container">

       {/* Botão para voltar à página de login */}
       <button onClick={() => navigate('/')} className="back-button">
        Voltar ao Login
      </button>

      <h1>Cadastro</h1>

      <form onSubmit={adicionarUsuario}>
        <div className="input-group">
          <div>
            <label>Nome</label>
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="input-group">
          <div>
            <label>CPF</label>
            <input
              type="text"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Telefone</label>
            <input
              type="text"
              placeholder="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label>Endereço</label>
          <input
            type="text"
            placeholder="Endereço"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <div>
            <label>Data de Nascimento</label>
            <input
              type="date"
              placeholder="Data de Nascimento"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Sexo</label>
            <select
              value={sexo}
              onChange={(e) => setSexo(e.target.value)}
              required
            >
              <option value="">Selecione o Sexo</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
            </select>
          </div>
        </div>

        <div className="select-group">
          <div>
            <label>Quantidade de Cômodos</label>
            <select
              value={quantidadeComodos}
              onChange={(e) => setQuantidadeComodos(e.target.value)}
              required
            >
              <option value="">Quantidade de Cômodos</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6 ou mais">6 ou mais</option>
            </select>
          </div>
          <div>
            <label>Estado Civil</label>
            <select
              value={estadoCivil}
              onChange={(e) => setEstadoCivil(e.target.value)}
              required
            >
              <option value="">Estado Civil</option>
              <option value="solteiro">Solteiro</option>
              <option value="casado">Casado</option>
              <option value="divorciado">Divorciado</option>
            </select>
          </div>
        </div>

        <div className="select-group">
          <div>
            <label>Tipo de Casa</label>
            <select
              value={tipoCasa}
              onChange={(e) => setTipoCasa(e.target.value)}
              required
            >
              <option value="">Tipo de Casa</option>
              <option value="terreo">Térreo</option>
              <option value="sobrado">Sobrado</option>
            </select>
          </div>
          <div>
            <label>Localização</label>
            <select
              value={localizacao}
              onChange={(e) => setLocalizacao(e.target.value)}
              required
            >
              <option value="">Localização</option>
              <option value="urbano">Urbano</option>
              <option value="praia">Praia</option>
              <option value="fazenda">Fazenda</option>
              <option value="montanha">Montanha</option>
            </select>
          </div>
        </div>

        <div>
          <label>Senha</label>
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
};

export default Usuarios;
