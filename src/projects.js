export default function Projects() {
  //create Projet class//
  class Project {
    constructor(title, description, dueDate) {
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
    }
  }

  //create list of projects//
  let projects = [];

  //pull content div
  const content = document.getElementById("content");

  //create divs for header and project list
  const projectsHeader = document.createElement("div");
  projectsHeader.textContent = "Your Projects";
  content.appendChild(projectsHeader);

  const projectsList = document.createElement("div");
  content.appendChild(projectsList);

  //add add button to DOM
  const addProjectBtn = document.createElement("button");
  addProjectBtn.textContent = "Add New Project";
  content.appendChild(addProjectBtn);

  const addProjectDialog = addProject();

  addProjectBtn.addEventListener("click", () => {
    addProjectDialog.showModal();
  });

  //dialogue for adding project - MOVE TO SEPARATE MODULE
  function addProject() {
    const dialog = document.createElement("dialog");

    // The Form
    const form = document.createElement("form");

    // The Inputs
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.placeholder = "Enter Project Name";
    titleInput.required = true; // Make it mandatory

    const descInput = document.createElement("input");
    descInput.type = "text";
    descInput.placeholder = "Enter Description";

    const dueDateInput = document.createElement("input");
    dueDateInput.type = "text";
    dueDateInput.placeholder = "Enter Due Date";

    // The Buttons
    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit";
    submitBtn.type = "submit"; // Important

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Cancel";
    closeBtn.type = "button"; // Important: Prevents it from submitting!

    // Put inputs into form
    form.appendChild(titleInput);
    form.appendChild(descInput);
    form.appendChild(dueDateInput);
    form.appendChild(submitBtn);
    form.appendChild(closeBtn);

    // Put form into dialog
    dialog.appendChild(form);

    // Put dialog onto the actual page (hidden by default)
    content.appendChild(dialog);

    // The Close Logic
    closeBtn.addEventListener("click", () => {
      dialog.close(); // Built-in browser method
      form.reset(); // Clears the text boxes
    });

    // The Submit Logic
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // STOP page reload

      console.log("User submitted:");
      console.log(projects);

      const newProject = new Project(
        titleInput.value,
        descInput.value,
        dueDateInput.value
      );

      projects.push(newProject);
      showProjects();

      dialog.close(); // Close the box
      form.reset(); // Clear the box
    });

    return dialog; // Return the dialog so we can control it later
  }

  function openProjectDialog(index = null) {
    // 1. Determine if we are editing based on whether an index exists
    const isEditMode = index !== null;
    const projectToEdit = isEditMode ? projects[index] : null;

    // --- UI CREATION (Shared Code) ---
    const dialog = document.createElement("dialog");
    const form = document.createElement("form");

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.placeholder = "Enter Project Name";
    titleInput.required = true;

    const descInput = document.createElement("input");
    descInput.type = "text";
    descInput.placeholder = "Description";

    const dueDateInput = document.createElement("input");
    dueDateInput.type = "text";
    dueDateInput.placeholder = "Due Date";

    // --- MAGIC STEP: PRE-FILL IF EDITING ---
    if (isEditMode) {
      titleInput.value = projectToEdit.title;
      descInput.value = projectToEdit.description;
      dueDateInput.value = projectToEdit.dueDate;
    }

    // --- BUTTONS ---
    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    // Change button text based on mode
    submitBtn.textContent = isEditMode ? "Save Changes" : "Submit New Project";

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.textContent = "Cancel";

    // --- ASSEMBLY ---
    form.appendChild(titleInput);
    form.appendChild(descInput);
    form.appendChild(dueDateInput);
    form.appendChild(submitBtn);
    form.appendChild(closeBtn);
    dialog.appendChild(form);
    document.body.appendChild(dialog);

    // --- LISTENERS ---

    closeBtn.addEventListener("click", () => {
      dialog.close();
      dialog.remove(); // Clean up DOM
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      // 2. LOGIC SPLIT: Update vs Create
      if (isEditMode) {
        // EDIT MODE: Update existing
        projects[index].title = titleInput.value;
        projects[index].description = descInput.value;
        projects[index].dueDate = dueDateInput.value;
      } else {
        // ADD MODE: Create new
        const newProject = new Project(
          titleInput.value,
          descInput.value,
          dueDateInput.value
        );
        projects.push(newProject);
      }

      showProjects(); // Refresh screen
      dialog.close();
      dialog.remove(); // Clean up
    });

    return dialog;
  }

  //function to make project list appear on screen when new project is added//
  function showProjects() {
    projectsList.textContent = "";

    projects.forEach((project, index) => {
      const projectInfo = document.createElement("p");
      projectInfo.textContent = `Project: ${project.title}, Description: ${project.description}, Due: ${project.dueDate}`;
      projectsList.appendChild(projectInfo);

      const projectEditBtn = document.createElement("button");
      projectEditBtn.textContent = "Edit";
      projectsList.appendChild(projectEditBtn);
      projectEditBtn.classList.add("delete");

      const projectDeleteBtn = document.createElement("button");
      projectDeleteBtn.textContent = "Delete";
      projectsList.appendChild(projectDeleteBtn);
      projectDeleteBtn.classList.add("delete");

      projectDeleteBtn.addEventListener("click", () => {
        deleteProject(index);
      });

      projectEditBtn.addEventListener("click", () => {
        editProject(index);
      });
    });
  }

  function deleteProject(index) {
    projects.splice(index, 1); // Remove 1 item at that specific index
    showProjects();
  }

  function editProject(index) {}
}

function openProjectDialog(index = null) {
  // 1. Determine if we are editing based on whether an index exists
  const isEditMode = index !== null;
  const projectToEdit = isEditMode ? projects[index] : null;

  // --- UI CREATION (Shared Code) ---
  const dialog = document.createElement("dialog");
  const form = document.createElement("form");

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.placeholder = "Enter Project Name";
  titleInput.required = true;

  const descInput = document.createElement("input");
  descInput.type = "text";
  descInput.placeholder = "Description";

  const dueDateInput = document.createElement("input");
  dueDateInput.type = "text";
  dueDateInput.placeholder = "Due Date";

  // --- MAGIC STEP: PRE-FILL IF EDITING ---
  if (isEditMode) {
    titleInput.value = projectToEdit.title;
    descInput.value = projectToEdit.description;
    dueDateInput.value = projectToEdit.dueDate;
  }

  // --- BUTTONS ---
  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  // Change button text based on mode
  submitBtn.textContent = isEditMode ? "Save Changes" : "Submit New Project";

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.textContent = "Cancel";

  // --- ASSEMBLY ---
  form.appendChild(titleInput);
  form.appendChild(descInput);
  form.appendChild(dueDateInput);
  form.appendChild(submitBtn);
  form.appendChild(closeBtn);
  dialog.appendChild(form);
  document.body.appendChild(dialog);

  // --- LISTENERS ---

  closeBtn.addEventListener("click", () => {
    dialog.close();
    dialog.remove(); // Clean up DOM
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // 2. LOGIC SPLIT: Update vs Create
    if (isEditMode) {
      // EDIT MODE: Update existing
      projects[index].title = titleInput.value;
      projects[index].description = descInput.value;
      projects[index].dueDate = dueDateInput.value;
    } else {
      // ADD MODE: Create new
      const newProject = new Project(
        titleInput.value,
        descInput.value,
        dueDateInput.value
      );
      projects.push(newProject);
    }

    showProjects(); // Refresh screen
    dialog.close();
    dialog.remove(); // Clean up
  });

  return dialog;
}
