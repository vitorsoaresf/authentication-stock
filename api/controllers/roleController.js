const RoleService = require("../services/roleService");
const roleService = new RoleService();

class RoleController {
  static async cadastrar(req, res) {
    const { nome, descricao } = req.body;

    try {
      const role = await roleService.cadastrar({ nome, descricao });

      res.status(200).send(role);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }
}

module.exports = RoleController;
