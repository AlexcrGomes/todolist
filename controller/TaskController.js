const Task = require('../models/Task');
const User = require('../models/User');

let message = '';
let type = '';

const getALLTasks = async (req, res) => {
    try {
        setTimeout(() => {
            message = ""
        }, 1000);
        const tasksList = await Task.find();
        return res.render('index', {
            tasksList,
            task: null,
            taskDelete: null,
            message,
            type
        });
    }catch (err) {
        res.status(500).send({error: err.message});
    }
};

const createTask = async (req, res) => {
    const task = req.body;

    if (!task.task) {
        message = 'Please enter a task'
        type = 'danger'
        return res.redirect('/');
    }

    try {
        await Task.create(task);
        message = 'Task created successfully'
        type = 'success'
        return res.redirect('/');
    }catch (err) {
        res.status(500).send({error: err.message});
    }
};

const getById = async (req, res) => {
    try {
        const tasksList = await Task.find();
        if (req.params.method == 'update') {
            const task = await Task.findOne({_id: req.params.id});
            res.render('index', {
                task,
                taskDelete: null,
                tasksList,
                message,
                type
            });
        } else {
            const taskDelete = await Task.findOne({_id: req.params.id});
            res.render('index', {
                task: null,
                taskDelete,
                tasksList,
                message,
                type
            });
        }

    }catch (err) {
        res.status(500).send({error: err.message});
    }
};

const updateOneTask = async (req, res) => {
    try {
        const task = req.body;
        await Task.updateOne({ _id: req.params.id}, task);
        message = 'Task updated successfully'
        type = 'success'
        res.redirect('/');
    }catch (err) {
        res.status(500).send({error: err.message});
    }
};

const deleteOneTask = async (req, res) => {
    try {
        await Task.deleteOne({ _id: req.params.id});
        message = 'Task deleted successfully'
        type = 'success'
        res.redirect('/');
    }catch (err) {
        res.status(500).send({error: err.message});
    }
};

const taskCheck = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id });
        task.check ? task.check = false : task.check = true;
        await Task.updateOne({ _id: req.params.id }, task);
        res.redirect("/");
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const signup = async (req, res) => {
    const user = req.body;

    if (!user.nome || !user.email || !user.senha) {
        message = 'Todos os campos são obrigatórios';
        type = 'danger';
        return res.redirect('/');
    }

    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
        message = 'Já existe um usuário cadastrado com esse e-mail';
        type = 'danger';
        return res.redirect('/');
    }

    try {
        await User.create(user);
        message = 'Usúario criado com sucesso.';
        type = 'success';
        return res.redirect('/');
    }catch (err) {
        res.status(500).send({error: err.message});
    }
};

const signin = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        message = 'Por favor, preencha os campos são obrigatórios';
        type = 'danger';
        return res.redirect('/');
    }

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            message = 'E-mail não cadastrado, por favor realize o cadastro';
            type = 'danger';
            return res.redirect('/');
        }
        if (senha !== existingUser.senha) {
            message = 'Senha ou e-mail incorreto';
            type = 'danger';
            return res.redirect('/');
        }
        localStorage.setItem('user', JSON.stringify(existingUser));
        message = `Bem vindo, ${existingUser.nome.split(' ')[0]}`;
        type = 'success';
        return res.redirect('/');
    }catch (err) {
        res.status(500).send({error: err.message});
    }
};

const logout = async (req, res) => {
    try {
        localStorage.removeItem('user');
        message = 'Conta desconectada';
        type = 'success';
        return res.redirect('/');
    }catch (err) {
        res.status(500).send({error: err.message});
    }
};

const getALLUsers = async (req, res) => {
    try {
        setTimeout(() => {
            message = ""
        }, 1000);
        const usersList = await User.find();
        return res.render('index', {
            usersList,
            user: null,
            userDelete: null,
            message,
            type
        });
    }catch (err) {
        res.status(500).send({error: err.message});
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
};