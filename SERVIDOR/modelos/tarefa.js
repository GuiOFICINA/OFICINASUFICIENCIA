const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tarefaSchema = new Schema({
    titulo: String,
    descricao: String,
    usuarioId: Schema.ObjectId
});

const Tarefa = mongoose.model('Tarefa', tarefaSchema);

module.exports = Tarefa;
