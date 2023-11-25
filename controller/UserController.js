const User = require('../models/User');

let message = '';
let type = '';

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

const createUser = async (req, res) => {
    const user = req.body;

    if (!user.nome || !user.email || !user.senha) {
        console.log(user);
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
        User.push(user);
        message = 'Usúario criado com sucesso.'
        type = 'success'
        return res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    }catch (err) {
        res.status(500).send({error: err.message});
    }
};

const cadastro = async (req, res) => {
    const user = req.body;

    if (!user.user) {
        message = 'Por favor, preencha os dados.'
        type = 'danger'
        return res.redirect('/');
    }

    try {
        setTimeout(() => {
            message = ""
        }, 1000);
        const { nome, email, senha } = req.body;
        if (!nome || !email || !senha) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }
        if (user.some(user => user.email === email)) {
            return res.status(400).json({ error: 'Este e-mail já está cadastrado' });
        }
        const newUser = { id: user.length + 1, nome, email, senha };
        user.push(newUser);
        await User.create(user);
        res.status(201).json(newUser);
        message = 'Cadastro realizado com sucesso.'
        type = 'success'
        return res.redirect('/cadastro');
    }catch (err) {
        res.status(500).send({error: err.message});
    }
};

const login = async (req, res) => {
    try {

    }catch (err) {
        res.status(500).send({error: err.message});
    }
};

module.exports = {
    cadastro,
    login,
    getALLUsers,
    createUser,
};