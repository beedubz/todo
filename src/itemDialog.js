export function openItemDialog(initialData, isTodo, onSubmit) {
  const dialog = document.createElement("dialog");
  const form = document.createElement("form");

  // ... (Your existing createInput helper) ...
  const createInput = (placeholder, value, type = "text") => {
    const input = document.createElement("input");
    input.type = type;
    input.placeholder = placeholder;
    if (value) input.value = value;
    return input;
  };

  const titleInput = createInput("Title", initialData?.title);
  titleInput.required = true;
  const descInput = createInput("Description", initialData?.description);
  const dateInput = createInput(
    "Due Date",
    initialData?.dueDate,
    "datetime-local"
  );
  dateInput.title = "Click here to add a due date and time";

  // --- NEW LOGIC: CONDITIONAL PROPERTIES FOR TODOS ---
  let priorityInput; // Declare it here so we can access it later
  let notesInput;

  if (isTodo) {
    priorityInput = document.createElement("select");

    // Create options: Low, Medium, High
    ["Low", "Medium", "High"].forEach((level) => {
      const option = document.createElement("option");
      option.value = level;
      option.textContent = level;

      // Pre-select if editing
      if (initialData && initialData.priority === level) {
        option.selected = true;
      }

      priorityInput.appendChild(option);
    });

    //Create the Notes Textarea
    notesInput = document.createElement("textarea");
    notesInput.id = "notes-input"; // Links to the label
    notesInput.name = "notes";
    notesInput.rows = 4; // Sets the height (lines of text)
    notesInput.placeholder = "Enter extra details here...";
    if (initialData?.notes) notesInput.value = initialData.notes;
  }

  const submitBtn = document.createElement("button");
  submitBtn.textContent = initialData ? "Save" : "Add";
  submitBtn.type = "submit";

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Cancel";
  closeBtn.type = "button";
  closeBtn.addEventListener("click", () => {
    dialog.close();
  });

  // --- ASSEMBLY ---
  form.append(titleInput, descInput, dateInput);

  // ONLY append priority if we asked for it
  if (isTodo) {
    const priorityLabel = document.createElement("label");
    priorityLabel.textContent = "Priority: ";
    priorityLabel.appendChild(priorityInput);
    form.appendChild(priorityLabel);

    const notesLabel = document.createElement("label");
    notesLabel.textContent = "Notes / Details:";
    notesLabel.appendChild(notesInput);
    form.appendChild(notesLabel);
  }

  form.append(submitBtn, closeBtn);
  dialog.appendChild(form);
  document.body.appendChild(dialog);
  // ... (Close listener is the same) ...

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Build the data object
    const itemData = {
      title: titleInput.value,
      description: descInput.value,
      dueDate: dateInput.value,
    };

    // If we had priority, add it to the result
    if (isTodo) {
      itemData.priority = priorityInput.value;
      itemData.notes = notesInput.value;
      itemData.type = "ToDo";
    } else {
      itemData.type = "Project";
    }

    onSubmit(itemData); // Send it back

    dialog.close();
    dialog.remove();
  });

  dialog.showModal();
}
