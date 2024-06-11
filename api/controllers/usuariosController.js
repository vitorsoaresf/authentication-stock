const UsuarioService = require("../services/usuarioService");
const usuarioServices = new UsuarioService();

class UsuarioController {
  async cadastrar(req, res) {
    const { nome, email, senha } = req.body;

    try {
      const newUsuario = usuarioServices.cadastrar({ nome, email, senha });
      res.status(201).send(newUsuario);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = UsuarioController;
