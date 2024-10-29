import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Entrar from "./entrar";
import Registro from "./cadastro";
import Lista from "./lista";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Entrar />} />
      <Route path="/novo-usuario" element={<Registro />} />
      <Route path="/tarefas" element={< Lista/>} />
    </Routes>
  </BrowserRouter>,
);
