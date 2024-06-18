const database = require("../models");

class SegurancaService {
  async cadastrarAcl(data) {
    const usuario = await database.usuarios.findOne({
      includes: [
        {
          model: database.roles,
          as: "usuario_roles",
          attributes: ["id", "nome", "descricao"],
        },
        {
          model: database.permissoes,
          as: "usuario_permissoes",
          attributes: ["id", "nome", "descricao"],
        },
      ],
      where: {
        id: data.usuarioId,
      },
    });
  }
}

module.exports = SegurancaService;
