const path = require("path");

const Task = require("../models/Task");
const User = require("../models/User");

let message = "";
let type = "";

const getALLTasks = async (req, res) => {
  try {
    setTimeout(() => {
      message = "";
    }, 1000);
    const tasksList = await Task.find();
    return res.render("index", {
      tasksList,
      task: null,
      taskDelete: null,
      message,
      type,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const createTask = async (req, res) => {
  const task = req.body;

  if (!task.task) {
    message = "Please enter a task";
    type = "danger";
    return res.redirect("/");
  }

  try {
    await Task.create(task);
    message = "Task created successfully";
    type = "success";
    return res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id, method } = req.params;
    const usersList = await User.find();

    let user = null;
    let userDelete = null;

    if (method === "update") {
      user = await User.findOne({ _id: id });
    } else {
      userDelete = await User.findOne({ _id: id });
    }

    res.render(path.join(__dirname, "../src/telaadm.ejs"), {
      user,
      userDelete,
      usersList,
      users: usersList,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const updateOneTask = async (req, res) => {
  try {
    const task = req.body;
    await Task.updateOne({ _id: req.params.id }, task);
    message = "Task updated successfully";
    type = "success";
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const deleteOneTask = async (req, res) => {
  try {
    await Task.deleteOne({ _id: req.params.id });
    message = "Task deleted successfully";
    type = "success";
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const taskCheck = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id });
    task.check ? (task.check = false) : (task.check = true);
    await Task.updateOne({ _id: req.params.id }, task);
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const signup = async (req, res) => {
  const user = req.body;

  if (!user.nome || !user.email || !user.senha) {
    return res
      .status(400)
      .json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email já está cadastrado" });
    }

    await User.create(user);
    
    // Redirect on the client side, not here
    return res
      .status(201)
      .json({ message: "Usuário cadastrado com sucesso" });
  } catch (err) {
    // Log the error for debugging purposes
    console.error(err);

    return res
      .status(500)
      .json({ error: "Erro interno do servidor" });
  }
};



const signin = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).redirect("/login");
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (!existingUser) {
      console.log("Usuário não cadastrado");
      return res.status(401).json({ error: "Usuário não cadastrado." });
    }

    const isPasswordValid = await User.findOne({ senha });

    if (!isPasswordValid) {
      console.log("Senha incorreta");
      return res.status(401).json({ error: "Senha Incorreta." });
    }

    console.log("Login bem-sucedido");
    const redirectURL = `/${existingUser._id}/telaadm`;
    return res.status(200).json({ redirect: redirectURL });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.message });
  }
};

const logout = (req, res) => {
  res.redirect("/");
};

const getALLUsers = async (req, res) => {
  try {
    setTimeout(() => {
      message = "";
    }, 1000);
    const usersList = await User.find();
    return res.render("/telaadm", {
      usersList,
      user: null,
      userDelete: null,
      message,
      type,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const updateOneUser = async (req, res) => {
  try {
    const user = req.body;
    await User.updateOne({ _id: req.params.id }, user);
    return res.redirect("/:_id/telaadm");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const deleteOneUser = async (req, res) => {
  try {
    const user = req.body;
    await User.deleteOne({ _id: req.params.id });
    res.redirect("/:_id/telaadm");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const getByIdUser = async (req, res) => {
  try {
    const usersList = await User.find();
    if (req.params.method == "update") {
      const user = await User.findOne({ _id: req.params.id });
      res.render("/telaadm", {
        user,
        userDelete: null,
        usersList,
        message,
        type,
      });
    } else {
      const taskDelete = await User.findOne({ _id: req.params.id });
      res.render("/telaadm", {
        user: null,
        userDelete,
        usersList,
        message,
        type,
      });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  getALLTasks,
  createTask,
  getById,
  updateOneTask,
  deleteOneTask,
  taskCheck,
  signup,
  signin,
  logout,
  getALLUsers,
  updateOneUser,
  deleteOneUser,
  getByIdUser,
};
