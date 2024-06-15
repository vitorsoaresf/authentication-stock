const database = require("../models");
const uuid = require("uuid");

class RoleService {
  async cadastrar(data) {
    const role = await database.roles.findOne({
      where: { nome: data.nome },
    });

    if (role) {
      throw new Error("Role já cadastrada!");
    }

    try {
      const newRole = await database.roles.create({
        id: uuid.v4(),
        nome: data.nome,
        descricao: data.descricao,
      });

      return newRole;
    } catch (err) {
      throw new Error("Erro ao cadastrar role!");
    }
  }
}

module.exports = RoleService;
