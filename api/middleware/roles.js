const database = require("../models");

const roles = (listaRoles) => {
  return async (req, res, next) => {
    const { usuarioId } = req;

    const usuario = await database.usuarios.findOne({
      include: [
        {
          model: database.roles,
          as: "usuario_roles",
          attibutes: ["id", "nome"],
        },
      ],
      where: {
        id: usuarioId,
      },
    });

    if (!usuario) {
      return res.status(401).send({ message: "Usuário não encontrado!" });
    }

    const usuarioPossuiPermissao = usuario.usuario_roles
      .map((role) => role.nome)
      .some((role) => listaRoles.includes(role));

    if (!usuarioPossuiPermissao) {
      return res.status(401).send({ message: "Usuário não possui permissão!" });
    }

    return next();
  };
};

module.exports = roles;
