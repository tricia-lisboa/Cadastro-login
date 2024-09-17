import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Dados from './Dados';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota padrão "/" */}
        <Route path="/" element={<Login />} />
        {/* Outras rotas */}
        <Route path="/dados" element={<Dados />} />
      </Routes>
    </Router>
  );
}

export default App;
