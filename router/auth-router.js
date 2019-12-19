const authController = require("./../controllers/auth-controller.js");

module.exports = {
  async autorizar(req, res, next) {
    try {
      let resultado = await authController.autorizar(req.headers);
      req.userId = resultado.data;
      return next();
    } catch (error) {
      if (error.code == 401)
        return res.send(401, { mensagem: error.mensagem })

      return res.send(500, { mensagem: "erro ao validar token" });
    }
  }
};