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

module.exports.findTasksByListId = (taskListId) => {
    return TaskModel.findAll({
        where: {taskListId: taskListId}
    })
};