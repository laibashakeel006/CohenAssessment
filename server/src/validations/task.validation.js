exports.createTaskRules = (data) => {
  const errors = {};

  if (!data.id) {
    errors.id = "Todo ID is required";
  }
  
  if (!data.description || data.description.trim() === "") {
    errors.description = "Description is required";
  }

  if (data.description && data.description.length > 200) {
    errors.description = "Description too long (max 200)";
  }
  
  if (!data.due_date || data.due_date.trim() === "") {
    errors.due_date = "Due Date is required";
  }
  
  if (!data.priority || data.priority.trim() === "") {
    errors.priority = "Priority is required";
  }

  return errors;
};


exports.deleteTaskRules = (data) => {
  const errors = {};

  if (!data.id || data.id.trim() === "") {
    errors.id = "ID is required";
  }

  return errors;

}
