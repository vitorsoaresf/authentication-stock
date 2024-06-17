const database = require("../models");
const uuid = require("uuid");

class PermissaoService {
  async cadastrar(data) {
    const permissao = await database.permissoes.findOne({
      where: { nome: data.nome },
    });

    if (permissao) {
      throw new Error("Permissao já cadastrada!");
    }

    try {
      const newPermissao = await database.permissoes.create({
        id: uuid.v4(),
        nome: data.nome,
        descricao: data.descricao,
      });

      return newPermissao;
    } catch (err) {
      throw new Error("Erro ao cadastrar permissão!");
    }
  }

  async buscarTodasPermissoes() {
    const permissoes = await database.permissoes.findAll();
    return permissoes;
  }

  async buscarPermissaoPorId(id) {
    const permissao = await database.permissoes.findOne({
      where: {
        id: id,
      },
    });
    if (!permissao) {
      throw new Error("Permissão informada não cadastrada!");
    }
    return permissao;
  }

  async deletarPermissaoPorId(id) {
    const permissao = await database.permissoes.findOne({
      where: {
        id: id,
      },
    });
    if (!permissao) {
      throw new Error("Permissão informada não cadastrada!");
    }
    try {
      await database.permissoes.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.error("Message error: ", error.message);
      throw error;
    }
  }

  async editarPermissao(dto) {
    const permissao = await database.permissoes.findOne({
      where: {
        id: dto.id,
      },
    });
    if (!permissao) {
      throw new Error("Permissão informada não cadastrada!");
    }
    try {
      (permissao.nome = dto.nome), (permissao.descricao = dto.descricao);
      await permissao.save();
      return await permissao.reload();
    } catch (error) {
      console.error("Message error: ", error.message);
      throw error;
    }
  }
}

module.exports = PermissaoService;
