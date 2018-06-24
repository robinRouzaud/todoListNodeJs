/*
TaskList DAO file
*/

var modelIndex = require('../modeles');

var TaskListModel = modelIndex.TaskListModel;

module.exports.createTaskList = (taskListName, userId) => {
    return TaskListModel.create({
        taskListName: taskListName,
        userId: userId
    });
};