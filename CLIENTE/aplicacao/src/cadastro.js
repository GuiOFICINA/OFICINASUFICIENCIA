import React, { Component } from 'react';
import { withRouter } from "./utils";
import axios from "axios";
import './_geral.css';

class Cadastro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      confirmacao: '',
      msgErro: '',
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, msgErro: '' });
  }

  cadastrar = () => {
    if (this.state.email.trim() === "") {
      this.setState({ msgErro: "Por favor, insira um e-mail!" });
      return;
    }

    if (!this.validarEmail(this.state.email)) {
      this.setState({ msgErro: "E-mail inválido!" });
      return;
    }

    if (this.state.senha.trim() === "") {
      this.setState({ msgErro: "Por favor, insira uma senha!" });
      return;
    }

    if (this.state.senha !== this.state.confirmacao) {
      this.setState({ msgErro: "As senhas precisam ser iguais!" });
      return;
    }

    axios.post('http://localhost:8080/registrar-usuario', {
      email: this.state.email,
      senha: this.state.senha,
    }).then(() => {
      this.props.navigate("/");
    }).catch((err) => {
      if (err.response && err.response.data && err.response.data.errorMessage) {
        this.setState({ msgErro: err.response.data.errorMessage });
      }
    });
  }

  validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  render() {
    return (
      <div className="container">
        <div className="box">
          <h2 className="titulo">Registro</h2>
          {this.state.msgErro && <p className="msg-erro">{this.state.msgErro}</p>}

          <div className="campo">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              required
            />
          </div>

          <div className="campo">
            <label>Senha</label>
            <div className="campo-senha">
              <input
                type="password"
                name="senha"
                value={this.state.senha}
                onChange={this.onChange}
                required
              />
            </div>
          </div>

          <div className="campo">
            <label>Confirmar Senha</label>
            <div className="campo-senha">
              <input
                type="password"
                name="confirmacao"
                value={this.state.confirmacao}
                onChange={this.onChange}
                required
              />
            </div>
          </div>

          <button className="btn-entrar" onClick={this.cadastrar}>
            Registrar
          </button>

          <p className="link">
            <a href="/">Já tem uma conta? Faça login</a>
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(Cadastro);
