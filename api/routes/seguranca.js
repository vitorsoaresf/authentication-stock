const { Router } = require("express");
const SegurancaoController = require("../controllers/segurancaController");

const router = new Router();

router
  .post("/seguranca/acl", SegurancaoController.cadastrarAcl)
  .post(
    "/seguranca/permissoes-roles",
    SegurancaoController.cadastrarPermissoesRoles
  )
  .get(
    "/seguranca/permissoes-roles/:id",
    SegurancaoController.buscarPermissoesRoles
  );

module.exports = router;
