'use strict';
module.exports = (sequelize, DataTypes) => {
  const TodoList = sequelize.define('TodoList', {
    name: DataTypes.STRING
  }, {});
  TodoList.associate = function(models) {
    // associations can be defined here
    TodoList.hasMany(models.Task);
    TodoList.belongsTo(models.User);
  };
  return TodoList;
};