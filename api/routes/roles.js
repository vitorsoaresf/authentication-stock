const { Router } = require("express");
const RoleController = require("../controllers/roleController");

const router = new Router();

router
  .post("/roles", RoleController.cadastrar)
  .get("/role", RoleController.buscarTodasRoles)
  .get("/role/:id", RoleController.buscarRolePorId)
  .delete("/role/:id", RoleController.deletarRolePorId)
  .put("/role/:id", RoleController.editarRole);

module.exports = router;
