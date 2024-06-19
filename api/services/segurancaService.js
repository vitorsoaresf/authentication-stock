const database = require("../models");
const Sequelize = require("sequelize");

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

    if (!usuario) {
      throw new Error("Usuário não cadastrado!");
    }

    const rolesCadastradas = await database.roles.findAll({
      where: {
        id: { [Sequelize.Op.in]: data.roles },
      },
    });

    const permissoesCadastradas = await database.permissoes.findAll({
      where: {
        id: { [Sequelize.Op.in]: data.permissoes },
      },
    });

    await usuario.removeUsuario_roles(usuario.usuario_roles);
    await usuario.removeUsuario_permissoes(usuario.usuario_permissoes);

    await usuario.addUsuario_roles(rolesCadastradas);
    await usuario.addUsuario_permissoes(permissoesCadastradas);

    const newUsuario = await database.usuarios.findOne({
      include: [
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
    });

    return newUsuario;
  }

  async cadastrarPermissoesRoles(data) {
    const role = await database.roles.findOne({
      includes: [
        {
          model: database.permissoes,
          as: "roles_das_permissoes",
          // attributes: ["id", "nome", "descricao"],
          // through: {
          //   attributes: [],
          // },
        },
      ],
      where: {
        id: data.roleId,
      },
    });

    if (!role) {
      throw new Error("Role não cadastrada!");
    }

    const permissoesCadastradas = await database.permissoes.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: data.permissoes,
        },
      },
    });

    await role.removeRoles_das_permissoes(role.roles_das_permissoes);
    await role.addRoles_das_permissoes(permissoesCadastradas);

    const newRole = await database.roles.findOne({
      includes: [
        {
          model: database.permissoes,
          as: "roles_das_permissoes",
          attributes: ["id", "nome", "descricao"],
          through: {
            attributes: [],
          },
        },
      ],
      where: {
        id: data.roleId,
      },
    });

    return newRole;
  }

  async buscarPermissoesRole(roleId) {
    const role = await database.roles.findOne({
      include: [
        {
          model: database.permissoes,
          as: "roles_das_permissoes",
          attributes: [],
          through: {
            attributes: [],
          },
        },
      ],
      where: {
        id: roleId,
      },
    });

    if (!role) {
      throw new Error("Role não cadastrada!");
    }
    return role;
  }
}

module.exports = SegurancaService;
