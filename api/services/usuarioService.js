const database = require("../models/usuarios");

class UsuarioService {
  async cadastrar(data) {
    const existsUser = database.usuarios.findOne({
      where: {
        email: data.email,
      },
    });

    if (existsUser) {
      throw new Error("Usuário já cdastrado!");
    }
  }
}

module.exports = UsuarioService;
