const mongoose = require('mongoose');

const user = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  telefones: [{
    numero: {
      type: Number,
      required: true
    },
    ddd: {
      type: Number,
      required: true
    }
  }],
  dataCriacao  : {
    type : Date,
    required : true
  },
  dataAtualizacao  : {
    type : Date
  },
  ultimoLogin  : {
    type : Date
  }
})

module.exports = mongoose.model('User', user)