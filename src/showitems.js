import { format, parseISO } from "date-fns";
import { Project, Todo } from "./items.js";
import { openItemDialog } from "./itemDialog.js";

export function Projects() {
  let projects = [];
  let currentProject = null;

  const content = document.getElementById("content");

  showItems(projects, "Project");

  function showItems(itemsArray, itemType) {
    //pull content div

    content.innerHTML = "";

    //create divs for header and project list
    const header = document.createElement("div");
    if (itemType === "Project") {
      header.textContent = "Your Projects";
    }
    if (itemType === "Todo") {
      header.textContent = `Your Todos for ${currentProject.title}`;
    }
    content.appendChild(header);

    //back button for Todos//
    if (itemType === "Todo") {
      const backBtn = document.createElement("button");
      backBtn.textContent = "Back to Projects";
      content.appendChild(backBtn);

      backBtn.addEventListener("click", () => {
        currentProject = null;
        showItems(projects, "Project");
      });
    }

    const itemsList = document.createElement("div");
    content.appendChild(itemsList);

    //add add button to DOM
    const addItemBtn = document.createElement("button");
    if (itemType === "Project") {
      addItemBtn.textContent = "Add New Project";
    }
    if (itemType === "Todo") {
      addItemBtn.textContent = "Add New Todo for this Project";
    }
    content.appendChild(addItemBtn);

    addItemBtn.addEventListener("click", () => {
      const isTodoMode = itemType === "Todo";

      openItemDialog(null, isTodoMode, (formData) => {
        if (isTodoMode) {
          const newTodo = new Todo(
            formData.title,
            formData.description,
            formData.dueDate,
            formData.priority,
            formData.notes
          );
          currentProject.addTodo(newTodo);
        } else {
          const newProject = new Project(
            formData.title,
            formData.description,
            formData.dueDate
          );

          projects.push(newProject);
        }
        showItems(itemsArray, itemType);
      });
    });

    itemsArray.forEach((item, index) => {
      let dateString = "No Date"; // Default text if they didn't pick a date
      if (item.dueDate) {
        const dateObj = parseISO(item.dueDate);
        dateString = format(dateObj, "MMM do 'at' p");
      }

      const card = document.createElement("div");
      card.classList.add("item-card"); // Helper class for CSS

      const itemInfo = document.createElement("p");
      if (itemType === "Project") {
        itemInfo.textContent = `Project: ${item.title}, Description: ${item.description}, Due: ${dateString}`;
      }
      if (itemType === "Todo") {
        itemInfo.textContent = `Todo: ${item.title}, Description: ${item.description}, Due: ${dateString}, Priority: ${item.priority}, Notes: ${item.notes}`;
      }
      card.appendChild(itemInfo);

      //view button for Projects)
      if (itemType === "Project") {
        const viewBtn = document.createElement("button");
        viewBtn.textContent = "View Todos";

        card.appendChild(viewBtn);

        viewBtn.addEventListener("click", () => {
          currentProject = item;
          showItems(currentProject.todos, "Todo");
        });
      }

      //edit button
      const itemEditBtn = document.createElement("button");
      itemEditBtn.textContent = "Edit";
      card.appendChild(itemEditBtn);
      itemEditBtn.classList.add("edit");

      itemEditBtn.addEventListener("click", () => {
        editItem(index);
      });

      //delete button
      const itemDeleteBtn = document.createElement("button");
      itemDeleteBtn.textContent = "Delete";
      card.appendChild(itemDeleteBtn);
      itemDeleteBtn.classList.add("delete");

      itemDeleteBtn.addEventListener("click", () => {
        deleteItem(index);
      });

      itemsList.appendChild(card);
    });
    function deleteItem(index) {
      itemsArray.splice(index, 1); // Remove 1 item at that specific index
      showItems(itemsArray, itemType);
    }

    function editItem(index) {
      const itemToEdit = itemsArray[index];
      const isTodoMode = itemType === "Todo";

      openItemDialog(itemToEdit, isTodoMode, (formData) => {
        itemToEdit.title = formData.title;
        itemToEdit.description = formData.description;
        itemToEdit.dueDate = formData.dueDate;

        // Update specific fields
        if (isTodoMode) {
          itemToEdit.priority = formData.priority;
          itemToEdit.notes = formData.notes;
        }
        showItems(itemsArray, itemType);
      });
    }
  }
}
