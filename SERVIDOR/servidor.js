const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const mongoose = require("mongoose");

const aplicacao = express();
mongoose.connect("mongodb://localhost/prova_suficiencia");

const tarefa = require("./modelos/tarefa.js");
const usuario = require("./modelos/usuario.js");
const CHAVE = "GUILHERME";

aplicacao.use(cors());
aplicacao.use(express.urlencoded({ extended: true }));
aplicacao.use(express.json());

aplicacao.use("/", (req, res, next) => {
  try {
    if (req.path === "/entrar" || req.path === "/registrar-usuario" || req.path === "/") {
      next();
    } else {
      jwt.verify(req.headers.token, CHAVE, (err, decoded) => {
        if (decoded && decoded.user) {
          req.user = decoded;
          next();
        } else {
          return res.status(401).json({
            errorMessage: req.headers.token,
            status: false,
          });
        }
      });
    }
  } catch (e) {
    res.status(500).json({
      errorMessage: "Ocorreu um erro inesperado.",
      status: false,
    });
  }
});

//TESTE DE CONEXÃO
aplicacao.get("/", (req, res) => {
  res.status(200).json({
    message: "TA FUNCIONANDO!!!!!",
    status: true
  });
});

aplicacao.post("/entrar", (req, res) => {
  const { email, senha } = req.body;

  usuario.findOne({ email })
    .then((usr) => {
      if (usr) {
        usuario.findOne({ email, senha }).then((usr) => {
          if (usr) {
            validarTokenUsuario(usr, res);
          } else {
            res.status(401).json({
              errorMessage: "Senha incorreta.",
              status: false
            });
          }
        });
      } else {
        res.status(404).json({
          errorMessage: "Usuário não encontrado.",
          status: false
        });
        
      }
    });
});

aplicacao.post("/registrar-usuario", (req, res) => {
  const { email } = req.body;

  usuario.findOne({ email })
    .then((usr) => {
      if (usr) {
        res.status(409).json({
          errorMessage: "Usuário já cadastrado. Utilize um e-mail diferente.",
          status: false
        });
      } else {
        usuario.create(req.body)
          .then((resp) => {
            validarTokenUsuario(resp, res);
          })
          .catch((err) => {
            res.status(500).json({
              errorMessage: "Erro ao criar usuário.",
              status: false
            });            
          });
      }
    });
});

function validarTokenUsuario(data, res) {
  jwt.sign({ user: data.email, id: data._id }, CHAVE, { expiresIn: "1d" }, (err, token) => {
    if (err) {
      res.status(401).json({
        errorMessage: "Token inválido ou expirado.",
        status: false
      });      
    } else {
      res.status(200).json({
        token,
        status: true,
        id: data._id,
      });
    }
  });
}

aplicacao.post("/adicionar-tarefa", (req, res) => {
  tarefa.create(req.body)
    .then(() => {
      res.status(201).json({
        message: "Sucesso!",
        status: true
      });      
    })
    .catch((err) => {
      res.status(400).json({
        errorMessage: "Erro ao adicionar a tarefa.",
        status: false
      });      
    });
});

aplicacao.post("/editar-tarefa", (req, res) => {
  tarefa.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
    .then(() => {
      res.status(200).json({
        message: "Sucesso!",
        status: true
      });      
    })
    .catch((err) => {
      res.status(400).json({
        errorMessage: "Erro ao editar a tarefa.",
        status: false
      });
    });
});

aplicacao.post("/apagar-tarefa", (req, res) => {
  tarefa.findOneAndDelete({ _id: req.body._id })
    .then(() => {
      res.status(200).json({
        message: "Sucesso!",
        status: true
      });
    })
    .catch((err) => {
      res.status(400).json({
        errorMessage: "Erro ao apagar a tarefa.",
        status: false
      });
    });
});

aplicacao.get("/tarefas", (req, res) => {
  tarefa.find()
    .then((data) => {
      res.status(200).json({
        message: "Tarefas encontradas!",
        status: true,
        tarefas: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        errorMessage: "Erro ao apagar a tarefa.",
        status: false
      });
    });
});

aplicacao.listen(8080, () => {
  console.log("Servidor rodando em 8080");
});
