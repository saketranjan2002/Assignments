/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor(list){
    this.list = list;
  }
  // list;

  add = (obj) => {
    this.list.push(obj);
  }

  remove = (index) => {
    this.list.splice(index,1);
  }

  update = (index,updatedToDo) => {
    this.list[index] = updatedToDo;
  }

  getAll = () => {
    return this.list;
  }

  get = (index) => {
    return this.list[index];
  }

  clear = () => {
    this.list = [];
  }

}


let obj = new Todo([]);
obj.add({"Activity":"Run"});
obj.add({"Activity":"Work"});
obj.update(1,{"Activity":"Office"});
console.log(obj.getAll());
console.log(obj.get(0));
obj.clear();
console.log(obj.getAll());

module.exports = Todo;
