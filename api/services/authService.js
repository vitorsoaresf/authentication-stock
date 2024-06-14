const database = require("../models/index");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const jsonSecret = require("../config/jsonSecret");

class AuthService {
  async login(data) {
    const usuario = await database.usuarios.findOne({
      attributes: ["id", "email", "senha"],
      where: {
        email: data.email,
      },
    });

    if (!usuario) {
      throw new Error("Usuário não cadastrado!");
    }

    const senhaIguais = await compare(data.senha, usuario.senha);

    if (!senhaIguais) {
      throw new Error("Senha ou usuário incorreto");
    }

    const accessToken = sign(
      {
        id: usuario.id,
        email: usuario.email,
      },
      jsonSecret.secret,
      {
        expiresIn: 36000,
      }
    );

    return { accessToken };
  }
}

module.exports = AuthService;
