const path = require("path");
const bcrypt = require("bcrypt");

const Task = require("../models/Task");
const User = require("../models/User");

let message = "";
let type = "";

// Controller Users

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

const signup = async (req, res) => {
  const {nome, email, senha,senhaconfirmacao} = req.body

    // Validations
    if (!nome) {
        return res.status(422).json({ msg: 'O nome é obrigatorio!' })
    }
    if (!email) {
        return res.status(422).json({ msg: 'O email é obrigatorio!' })
    }
    if (!senha) {
        return res.status(422).json({ msg: 'A senha é obrigatoria!' })
    }
    if (!senhaconfirmacao) {
        return res.status(422).json({ msg: 'Confirme a senha!' })
    }
    if (senha !== senhaconfirmacao) {
        return res.status(422).json({ msg: 'As senhas não são iguais!' })
    }

    // Check if user exists
    const userExists = await User.findOne({ email: email})

    if (userExists) {
      return res.status(422).json({ msg: 'Usuário já cadastrado' })
    }

    // Create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(senha, salt);

    // Create User
    const user = new User({
      nome,
      email,
      senha: passwordHash,
    })

    try {
      await user.save();
      return res.status(201).json({ msg: "Usuário criado com sucesso!" })
    }
    catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Aconteceu um erro no servidor, tente mais tarde"});
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

    const isPasswordValid = await bcrypt.compare(senha, existingUser.senha);

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

// Controller Tasks

const getALLTasks = async (req, res) => {
  try {
    const tasksList = await Task.find();
    return res.render("/:_id/tarefas", {
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
    message = "Escreva uma tarefa";
    type = "danger";
    return res.redirect("/:_id/tarefas");
  }

  try {
    await Task.create(task);
    message = "Tarefa criada";
    type = "success";
    return res.redirect("/:_id/tarefas");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const updateOneTask = async (req, res) => {
  try {
    const task = req.body;
    await Task.updateOne({ _id: req.params.id }, task);
    message = "Tarefa alterada";
    type = "success";
    res.redirect("/:_id/tarefas");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const deleteOneTask = async (req, res) => {
  try {
    await Task.deleteOne({ _id: req.params.id });
    message = "Tarefa excluida";
    type = "success";
    res.redirect("/:_id/tarefas");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const taskCheck = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id });
    task.check ? (task.check = false) : (task.check = true);
    await Task.updateOne({ _id: req.params.id }, task);
    res.redirect("/:_id/tarefas");
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
