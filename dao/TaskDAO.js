/*
Task DAO file
*/

var modelIndex = require('../modeles');

var TaskModel = modelIndex.TaskModel;

module.exports.createTask = (taskName, taskListId) => {
    return TaskModel.create({
        taskName: taskName,
        taskListId: taskListId
    });
};

module.exports.createTask = (taskName) => {
    return TaskModel.create({
        taskName: taskName
    });
}; 

module.exports.findTasksByListId = (taskListId) => {
    return TaskModel.findAll({
        raw: true,
        where: {
            taskListId: taskListId
        }        
    });
};

module.exports.deleteTaskById = (taskId) => {
    return TaskModel.destroy({
        where: {
            taskId: taskId
        }
    })
};