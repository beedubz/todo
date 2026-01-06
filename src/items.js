export class Item {
  constructor(title, description, dueDate) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.isComplete = false;
  }

  toggleComplete() {
    this.isComplete = !this.isComplete;
    console.log(
      `${this.title} is now ${this.isComplete ? "Done" : "Not Done"}`
    );
  }
}

export class Project extends Item {
  constructor(title, description, dueDate) {
    super(title, description, dueDate);
    this.todos = [];
  }
  addTodo(todo) {
    this.todos.push(todo);
  }
}

export class Todo extends Item {
  constructor(title, description, dueDate, priority, notes) {
    super(title, description, dueDate);
    this.priority = priority;
    this.notes = notes;
  }
}
