const bodyParser = require("body-parser");

const produto = require("./produtoRoute");
const usuario = require("./usuarioRoute");
const auth = require("./authRoute");
const role = require("./roles");

module.exports = (app) => {
  app.use(bodyParser.json(), auth, usuario, produto, role);
};
