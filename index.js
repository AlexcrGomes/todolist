const express = require("express");
const path = require("path");
const connectToDb = require("./database/db");
const routes = require("./routes/routes");

connectToDb();
const User = require("./models/User");


const app = express();
const port = 3000;

// Configurações do Express
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Rotas

app.use(routes);

app.get("/login", (req, res) => {
  res.render(path.join(__dirname, "/src/login.ejs"), {
    message: "",
    type: "",
  });
});

app.get("/cadastro", (req, res) => {
  res.render(path.join(__dirname, "/src/cadastro.ejs"), {
    message: "",
    type: "",
  });
});

app.get("/:_id/tarefas", async (req, res) => {
  try {
    const users = await User.find();
    res.render(path.join(__dirname, "/src/tarefas.ejs"), { users }, (user = null, userDelete = null));
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno do servidor");
  }
});

app.get("/:_id/telaadm", async (req, res) => {
  try {
    const users = await User.find();
    res.render(path.join(__dirname, "/src/telaadm.ejs"), { users }, (user = null, userDelete = null));
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno do servidor");
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
