import React from 'react';
import axios from 'axios';
import { withRouter } from "./utils";
import './lista.css';

class Lista extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      usuario: '',
      listaTarefas: [],
      titulo: '',
      descricao: '',
      msgErro: '',
      idTarefa: null
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    const usuario = localStorage.getItem('usuario');
    
    if (!token || !usuario) {
      this.props.navigate("/");
    } else {
      this.setState({ token, usuario }, () => {
        this.buscarTarefa();
      });
    }
  }

  sair = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.props.navigate("/");
  };

  buscarTarefa = () => {
    console.log(this.state.token);
    axios.get('http://localhost:8080/tarefas', {
      headers: {
        'token': this.state.token,
        'usuarioId': this.state.usuario
      }
    }).then((res) => {
      this.setState({
        listaTarefas: res.data.tarefas
      });
    }).catch((err) => {
      console.error(err);
      window.alert('Aconteceu algo que impediu o processo, vide log');
      this.setState({
        listaTarefas: []
      });
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, msgErro: '' });
  }

  limpar = () => {
    this.setState({
      titulo: '',
      descricao: '',
      idTarefa: null
    });
  };

  adicionarTarefa = (tarefa) => {
    axios.post('http://localhost:8080/adicionar-tarefa', tarefa, {
      headers: {
        'Content-Type': 'application/json',
        'token': this.state.token
      }
    }).then(() => {
      this.limpar();
      this.buscarTarefa();
    }).catch((err) => {
      console.error(err);
      window.alert('Aconteceu algo que impediu o processo, vide log');
    });
  }

  editarTarefa = (tarefa) => {
    axios.post('http://localhost:8080/editar-tarefa', tarefa, {
      headers: {
        'Content-Type': 'application/json',
        'token': this.state.token
      }
    }).then(() => {
      this.limpar();
      this.buscarTarefa();
    }).catch((err) => {
      console.error(err);
      window.alert('Aconteceu algo que impediu o processo, vide log');
    });
  }

  salvarTarefa = () => {
    if (this.state.titulo.trim() === "") {
      this.setState({ msgErro: 'Por favor, insira um título!' });
      return;
    }

    const tarefa = {
      titulo: this.state.titulo,
      descricao: this.state.descricao,
      usuarioId: this.state.usuario,
      _id: this.state.idTarefa
    };

    if (this.state.idTarefa) {
      this.editarTarefa(tarefa);
    } else {
      this.adicionarTarefa(tarefa);
    }
  };

  editar = (tarefa) => {
    this.setState({
      titulo: tarefa.titulo,
      descricao: tarefa.descricao,
      idTarefa: tarefa._id,
      msgErro: ''
    });
  };

  excluirTarefa = (tarefa) => {
    axios.post('http://localhost:8080/apagar-tarefa', tarefa, {
      headers: {
        'Content-Type': 'application/json',
        'token': this.state.token
      }
    }).then(() => {
      this.buscarTarefa();
    }).catch((err) => {
      console.error(err);
      window.alert('Aconteceu algo que impediu o processo, vide log');
    });
  };

  render() {
    return (
      <div className="l-container">
        <div className="l-header-container">
          <h1 className="l-header">Lista de Tarefas</h1>
          <button
            onClick={this.sair}
            className="l-logout-button"
          >
            Sair
          </button>
        </div>

        <div className="l-form">
          <div className="l-input-group">
            <input
              type="text"
              name="titulo"
              placeholder="Título da tarefa"
              value={this.state.titulo}
              onChange={this.onChange}
              className="l-input"
            />
            <textarea
              name="descricao"
              placeholder="Descrição da tarefa"
              value={this.state.descricao}
              onChange={this.onChange}
              className="l-textarea"
              id='id_textarea'
            />
            <button
              onClick={this.salvarTarefa}
              className="l-button"
            >
              {this.state.idTarefa ? 'Atualizar Tarefa' : 'Adicionar Tarefa'}
            </button>
          </div>
        </div>

        <div className="l-list">
          {this.state.listaTarefas.map(tarefa => (
            <div key={tarefa._id} className="l-card">
              <div className="l-card-header">
                <h3 className="l-card-title">{tarefa.titulo}</h3>
                <div className="l-button-group">
                  <button
                    onClick={() => this.editar(tarefa)}
                    className="l-edit-button"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => this.excluirTarefa(tarefa)}
                    className="l-delete-button"
                  >
                    Excluir
                  </button>
                </div>
              </div>
              <p className="l-card-description">{tarefa.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(Lista);
