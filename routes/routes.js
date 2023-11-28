const routes = require('express').Router();
const TaskController = require('../controller/TaskController');


routes.get('/', TaskController.getALLTasks);
routes.post('/create', TaskController.createTask);
routes.get('/getById/:id/:method', TaskController.getById);
routes.post('/updateOne/:id', TaskController.updateOneTask);
routes.get('/deleteOne/:id', TaskController.deleteOneTask);
routes.get('/check/:id', TaskController.taskCheck);
routes.post('/signup', TaskController.signup);
routes.post('/signin', TaskController.signin);
routes.get('/logout', TaskController.logout);
routes.get('/usuarios', TaskController.getALLUsers);

routes.get('/getByIdUser/:id/:method', TaskController.getByIdUser);
routes.get('/getALLUsers', TaskController.getALLUsers);
routes.post('/updateOneUser/:id', TaskController.updateOneUser);
routes.get('/deleteOneUser/:id', TaskController.deleteOneUser);




module.exports = routes