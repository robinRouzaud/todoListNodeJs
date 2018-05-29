var orm = require('orm');

orm.connect('postgresql://admin_tp_todo_list:*****@localhost/todo_list', function(err, db) {
    if (err) throw err;

    var Task = db.define('tasks', {
        taskId    : { type: 'serial', key: true, mapsTo: 'task_id' },
        taskName  : { type: 'string', mapsTo: 'task_name'},
        listId    : { type: 'integer', mapsTo: 'list_id'}
    }, {
        methods : {
            name: function() {
                return this.taskName;
            },
            id: function(){
                return this.taskId;
            },
            fk: function() {
                return this.listId;
            }
        }
    });

    var TaskList = db.define('lists', {
        taskListId   : { type: 'serial', key: true, mapsTo: 'task_list_id'},
        taskListName : { type: 'string', mapsTo: 'task_list_name'}
    }, {
        methods : {
            name: function() {
                return this.taskListName;
            },
            id: function() {
                return this.taskListId;
            }
        }
    });

    var User = db.define('owners', {
        ownerId  : { type: 'serial', key: true, mapsTo: 'user_id'},
        userName : { type: 'text', mapsTo: 'user_name'},
        eMail    : { type: 'text', mapsTo: 'user_email'},
        password : { type: 'text', mapsTo: 'user_password'}
    }, {
        methods : {
            id: function() {
                return this.id;
            },
            info: function() {
                return this.userName + '; ' + this.eMail;
            },
            coords: function() {
                return this.eMail;
            },
            password: function() {
                return this.password;
            }
        }
    });

    TaskList.hasMany('elements', Task, {field: 'listId'});

    User.hasOne('list', TaskList, {field: 'taskListId'});
});