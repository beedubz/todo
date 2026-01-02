//Your todo list should have projects or separate lists of todos. When a user first opens the app, there should be some sort of ‘default’ project to which all of their todos are put. Users should be able to create new projects and choose which project their todos go into.
//You should separate your application logic (i.e. creating new todos, setting todos as complete, changing todo priority etc.) from the DOM-related stuff, so keep all of those things in separate modules.
//The look of the User Interface is up to you, but it should be able to do the following:
//View all projects.
//View all todos in each project (probably just the title and duedate… perhaps changing color for different priorities).
//Expand a single todo to see/edit its details.
//Delete a todo.

import Projects from "./projects.js";

Projects();

//toDo object
class toDo {
  constructor(title, description, dueDate, priority, notes) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
  }
}

//create todo list
let todoList = [];
