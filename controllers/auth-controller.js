const jwt = require("jsonwebtoken");

module.exports = {
  autenticar(identificador) {
    let token = jwt.sign({ identificador }, process.env.SECRET, {
      expiresIn: 1800 // expires in 30min
    });
    return { auth: true, token };
  },
  autorizar(headers) {
    return new Promise(function (resolve, reject) {
      var token = headers['x-access-token'];

      if (!token)
        return reject({ code: 401, auth: false, mensagem: 'Não autorizado' });

      jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err)
          return reject({ code: 401, auth: false, mensagem: 'Não autorizado' });

        resolve({ code: 200, data: decoded.identificador });
      });
    })
  }
};