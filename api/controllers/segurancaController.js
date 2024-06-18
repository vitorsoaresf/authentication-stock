const SegurancaService = require("../services/segurancaService");
const segurancaService = new SegurancaService();

class SegurancaoController {
  static async cadastrarAcl(req, res) {
    const { roles, permissoes } = req.body;
    const { usuarioId } = req;

    try {
      const acl = await segurancaService.cadastrarAcl({
        roles,
        permissoes,
        usuarioId,
      });
      res.status(201).send(acl);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }
}

module.exports = SegurancaoController;
