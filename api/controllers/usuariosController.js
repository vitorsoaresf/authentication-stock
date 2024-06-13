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

  static async editarUsuario(req, res) {
    const { id } = req.params;
    const { nome, email } = req.body;
    try {
      const usuario = await usuarioServices.editarUsuario({ id, nome, email });
      res.status(200).json(usuario);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async deletarUsuario(req, res) {
    const { id } = req.params;
    try {
      await usuarioServices.deletarUsuario(id);
      res.status(200).send({ message: "Usuario deletado com sucesso!" });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = UsuarioController;
