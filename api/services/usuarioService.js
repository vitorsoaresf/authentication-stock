const database = require("../models");
const { hash } = require("bcryptjs");
const uuid = require("uuid");

class UsuarioService {
  async cadastrar(data) {
    const existsUser = await database.usuarios.findOne({
      where: {
        email: data.email,
      },
    });

    if (existsUser) {
      throw new Error("Usuário já cadastrado!");
    }

    try {
      const senhaHash = await hash(data.senha, 8);

      const newUser = await database.usuarios.create({
        id: uuid.v4(),
        nome: data.nome,
        email: data.email,
        senha: senhaHash,
      });

      return newUser;
    } catch (error) {
      throw new Error("Erro ao cadastrar usuário!");
    }
  }

  async buscarTodosUsuarios() {
    try {
      return await database.usuarios.findAll();
    } catch (error) {
      throw new Error("Erro ao buscar os usuários");
    }
  }

  async buscarUsuarioById(id) {
    try {
      return await database.usuarios.findByPk(id);
    } catch (error) {
      throw new Error("usuário não encontrado");
    }
  }

  async editarUsuario(dto) {
    const usuario = await this.buscarUsuarioById(dto.id);
    try {
      usuario.nome = dto.nome;
      usuario.email = dto.email;
      await usuario.save();
      return usuario;
    } catch (error) {
      throw new Error("Erro ao editar usuario!");
    }
  }

  async deletarUsuario(id) {
    await this.buscarUsuarioById(id);
    try {
      await database.usuarios.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new Error("Erro ao tentar deletar o usuario!");
    }
  }
}

module.exports = UsuarioService;
