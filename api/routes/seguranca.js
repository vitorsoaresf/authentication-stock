const { Router } = require("express");
const SegurancaoController = require("../controllers/segurancaController");

const router = new Router();

router.post("/seguranca/acl", SegurancaoController.cadastrarAcl);

module.exports = router;
