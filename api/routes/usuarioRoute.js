const { Router } = require("express");
const UsuarioController = require("../controllers/usuariosController");

const router = new Router();

router
  .post("/usuarios", UsuarioController.cadastrar)
  .get("/usuarios", UsuarioController.buscarUsuarios)
  .get("/usuarios/id/:id", UsuarioController.buscarUsuarioPorId)
  .put("/usuarios/id/:id", UsuarioController.editarUsuario)
  .delete("/usuarios/id/:id", UsuarioController.deletarUsuario);

module.exports = router;
