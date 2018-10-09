import {TodoList as TodoList} from '../models'

//Create
export function createList(listName){
    return TodoList.create({
        name: listName
    });
};

//Read
export function findListById(id){
    return TodoList.findOne({
        where: {
            id: id
        }
    });
};

//Update


//Delete