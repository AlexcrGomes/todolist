const routes = require('express').Router();
const TaskController = require('../controller/TaskController');

routes.get('/', TaskController.getALLTasks);
routes.post('/create', TaskController.createTask);
routes.get('/getById/:id/:method', TaskController.getById);
routes.post('/updateOne/:id', TaskController.updateOneTask);
routes.get('/deleteOne/:id', TaskController.deleteOneTask);
routes.get('/check/:id', TaskController.taskcheck);

module.exports = routes