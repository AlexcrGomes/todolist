const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes/routes');
const connectToDb = require('./database/db');
const port = 3000
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

connectToDb();

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secretpassword',
    resave: false,
    saveUninitialized: false
}));
const users  = [
    { _id: 1, email: 'email', senha: 'senha' }
];
passport.use(new LocalStrategy(
    (email, senha, done) => {
        const user = users.find(u => u.email  === email && u.senha === senha);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Credenciais inválidas.' });
        }
    }
));
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    const user = users.find(u => u.id === id);
    done(null, user);
});
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};
app.post('/login', passport.authenticate('local', {
    successRedirect: '/pagina-autenticada',
    failureRedirect: '/login',
    failureFlash: true
}));
app.get('/telaadm', isAuthenticated, (req, res) => {
    res.render(__dirname + "/src/telaadm.ejs", {
        message: '',
        type: ''
    });
});
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});




app.use(routes);



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

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});