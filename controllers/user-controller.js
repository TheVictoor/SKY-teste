const userSchema = require("./../schemas/userModel");

module.exports = {
  async listar() {
    return await userSchema.find();
  },
  async atualizar(id, params) {
    return await userSchema.findOneAndUpdate({ id }, params);
  },
  async excluir(id) {
    return await userSchema.findOneAndRemove({ id });
  },
  async listarByEmailSenha(params) {
    return await userSchema.findOne({ email: params.email, senha: params.senha })
  },
  async listarBy(params) {
    return await userSchema.findOne({ ...params });
  },
  async criar(params) {
    params.id = guid();
    params.dataCriacao = new Date();
    params.dataAtualizacao = new Date();
    
    let novoUsuario = new userSchema(params);

    await novoUsuario.save();
    
    return novoUsuario;
  },
};

function guid() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ Math.floor((Math.random() * 255)) & 15 >> c / 4).toString(16)
  );
}