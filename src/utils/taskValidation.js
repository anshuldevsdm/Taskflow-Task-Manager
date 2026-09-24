export const validateTask = (values) => {
  const errors = {};
  const requiredFields = {
    title: "Task title is required.",
    description: "Description is required.",
    category: "Category is required.",
    priority: "Please choose a priority.",
    status: "Please choose a status.",
    dueDate: "Please choose a valid due date.",
  };

  Object.entries(requiredFields).forEach(([field, message]) => {
    if (!values[field]?.trim()) errors[field] = message;
  });

  if (
    values.dueDate &&
    Number.isNaN(new Date(`${values.dueDate}T00:00:00`).getTime())
  ) {
    errors.dueDate = "Please choose a valid due date.";
  }

  return errors;
};
