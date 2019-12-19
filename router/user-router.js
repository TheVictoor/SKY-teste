const user = require('./../controllers/user-controller.js');
const auth = require('./../controllers/auth-controller.js');

module.exports = {
  async listar(req, res) {
    let result = await user.listarBy({ id : req.params.id });
    res.send(200, {
      mensagem: { 
        nome: result.nome, 
        email: result.email,
        telefones: result.telefones,
        id: result.id, 
        ultimoLogin : result.ultimoLogin, 
        ultimaAlteracao : result.dataAtualizacao 
      }
    });
  },
  async atualizar(req, res) {
    let result = await user.atualizar(req.body && req.body.id, req.body);
    res.send(201, {
      mensagem: result
    });
  },
  async excluir(req, res) {
    let result = await user.excluir(req.params.id);
    res.send(200, {
      mensagem: result
    });
  },
  async criar(req, res) {
    try {
      let jaExiste = await user.listarBy({ email: req.body.email });

      if (jaExiste)
        return res.send(400, { mensagem: "Email ja cadastrado." });

      let usuario = await user.criar(req.body);
      
      let token = auth.autenticar(usuario.id);

      await user.atualizar( usuario.id, { ultimoLogin : new Date() });

      let resultado = {
        usuario: {
          nome: usuario.nome,
          email: usuario.email,
          id: usuario.id,
          telefones: usuario.telefones,
        },
        ...token
      };

      res.send(201, {
        mensagem: resultado
      });
    } catch (error) {
      res.send( 500, { mensagem : error } );
    }
  },
  async logar(req, res) {
    let usuario = await user.listarByEmailSenha(req.body);

    if (!usuario)
      return res.send(400, { mensagem: "nenhum usuario encontrado com as credenciais." });

    let autenticacao = auth.autenticar(usuario.id);
    await user.atualizar( usuario.id, { ultimoLogin : new Date() });

    let resultado = {
      usuario: {
        nome: usuario.nome,
        email: usuario.email,
        id: usuario.id,
        telefones: usuario.telefones,
      },
      ...autenticacao
    };

    res.send(200, { mensagem: resultado });
  },
  validarLogar(req, res, next) {
    try {
      let parametro = req.body;

      if (!parametro || !parametro.email || !parametro.senha)
        return res.send(400, { mensagem: "Usuário e/ou senha inválidos." });

      next();
    } catch (error) {
      res.send(500, { mensagem: JSON.stringify(error) });
    }
  },
  validarCriar(req, res, next) {
    try {
      let parametro = req.body;

      if (!parametro.nome ||
        !parametro.email ||
        !parametro.senha ||
        !parametro.telefones ||
        parametro.telefones.constructor.name != "Array" ||
        !parametro.telefones.length)
        return res.send(400, { mensagem: "não foi possível encontrar todos os parametros." });

      next()
    } catch (error) {
      res.send(500, { mensagem: JSON.stringify(error) });
    }
  }
}