exports.createTodoRules = (data) => {
  const errors = {};

  if (!data.title || data.title.trim() === "") {
    errors.title = "Title is required";
  }

  if (data.title && data.title.length < 3) {
    errors.title = "Title must be at least 3 characters";
  }

  if (!data.due_date || data.due_date.trim() === "") {
    errors.due_date = "Due Date is required";
  }

  if (data.description && data.description.length > 200) {
    errors.description = "Description too long (max 200)";
  }

  return errors;
};


exports.deleteTodoRules = (data) => {
  const errors = {};

  if (!data.id || data.id.trim() === "") {
    errors.id = "ID is required";
  }

  return errors;

}