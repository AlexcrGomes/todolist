const routes = require('express').Router();
const TaskController = require('../controller/TaskController');
const UserController = require('../controller/UserController');

routes.get('/', TaskController.getALLTasks);
routes.post('/create', TaskController.createTask);
routes.get('/getById/:id/:method', TaskController.getById);
routes.post('/updateOne/:id', TaskController.updateOneTask);
routes.get('/deleteOne/:id', TaskController.deleteOneTask);
routes.get('/check/:id', TaskController.taskCheck);
routes.post('/cadastro', UserController.cadastro);
routes.post('/createUser', UserController.createUser);
routes.get('/usuarios', UserController.getALLUsers);

module.exports = routes