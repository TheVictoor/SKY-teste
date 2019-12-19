module.exports = {
  default(req, res, next) {
    return res.send(400, { message: "endpoint não encontrado." });
  }
};
