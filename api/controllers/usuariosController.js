const UsuarioService = require("../services/usuarioService");
const usuarioServices = new UsuarioService();

class UsuarioController {
  static async cadastrar(req, res) {
    const { nome, email, senha } = req.body;

    try {
      const newUsuario = await usuarioServices.cadastrar({
        nome,
        email,
        senha,
      });
      res.status(201).send(newUsuario);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async buscarUsuarios(_, res) {
    try {
      const usuarios = await usuarioServices.buscarTodosUsuarios();
      res.status(200).send(JSON.stringify(usuarios));
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async buscarUsuarioPorId(req, res) {
    const { id } = req.params;

    try {
      const usuarios = await usuarioServices.buscarUsuarioById(id);
      res.status(200).send(JSON.stringify(usuarios));
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = UsuarioController;
