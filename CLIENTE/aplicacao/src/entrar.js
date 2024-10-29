import React from "react";
import axios from 'axios';
import { withRouter } from "./utils";
import './_geral.css';

class Entrar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      msgErro: '',
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, msgErro: '' });
  }

  entrar = () => {
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

    axios.post('http://localhost:8080/entrar', {
      email: this.state.email,
      senha: this.state.senha,
    }).then((res) => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('usuario', res.data.id);
      this.props.navigate("/tarefas");
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
          <h2 className="titulo">Bem-vindos</h2>
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
          <button className="btn-entrar" onClick={this.entrar}>
            Entrar
          </button>
          <p className="link">
            <a href="/novo-usuario">Não tem uma conta? Registre-se</a>
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(Entrar);
