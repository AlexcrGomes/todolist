const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes/routes');
const connectToDb = require('./database/db');
const port = 3000

connectToDb();

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded());
app.use(routes);

app.get("/telaadm", function(req, res) {
    res.render(__dirname + "/src/telaadm.ejs", {
        message: '',
        type: ''
    });
});

app.get("/login", function(req, res) {
    res.render(__dirname + "/src/login.ejs", {
        message: '',
        type: ''
    });
});

app.get("/cadastro", function(req, res) {
    res.render(__dirname + "/src/cadastro.ejs", {
        message: '',
        type: ''
    });
});

app.get("/tarefas", function(req, res) {
    res.render(__dirname + "/src/tarefas.ejs", {
        message: '',
        type: ''
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});