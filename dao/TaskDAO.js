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