const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usuarioSchema = new Schema( {
	email: String,
	senha: String
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;