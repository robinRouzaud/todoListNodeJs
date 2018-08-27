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

//Deprecated
module.exports.findTaskListByUserId = (userId) => {
    console.log('UserId : ' + typeof(userId));
    return TaskListModel.findOne({
        where: {userId: userId}
    })
};

module.exports.findAllListsByUserId = (userId) => {
    return TaskListModel.findAll({
        where: {
            userId: userId
        }
    })
};

