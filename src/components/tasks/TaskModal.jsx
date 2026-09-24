import { useEffect, useState } from "react";
import { validateTask } from "../../utils/taskValidation";
import { Icon } from "../common/Icon";
import { TaskField } from "./TaskField";

const EMPTY_FORM = { title: "", description: "", category: "", dueDate: "", priority: "", status: "" };

export function TaskModal({ task, open, onClose, onSave }) {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setValues(task ? {
      title: task.title,
      description: task.description,
      category: task.category,
      dueDate: task.dueDate,
      priority: task.priority,
      status: task.status,
    } : EMPTY_FORM);
    setErrors({});
  }, [task, open]);

  if (!open) return null;

  const update = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const submit = (event) => {
    event.preventDefault();
    const nextErrors = validateTask(values);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    onSave({ ...values, title: values.title.trim(), description: values.description.trim(), category: values.category.trim() });
  };

  return (
    <div className="modal-backdrop" aria-hidden="false" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="modal task-modal" role="dialog" aria-modal="true" aria-labelledby="taskModalTitle">
        <div className="modal-header"><div><p className="eyebrow">{task ? "Refine the details" : "Plan your next win"}</p><h2 id="taskModalTitle">{task ? "Edit task" : "Create task"}</h2></div><button className="icon-button" type="button" onClick={onClose} aria-label="Close"><Icon name="x" /></button></div>
        <form onSubmit={submit} noValidate>
          <div className="form-grid">
            <TaskField label="Task title" name="title" value={values.title} error={errors.title} onChange={update} placeholder="e.g. Finalize the project brief" span />
            <TaskField label="Description" name="description" value={values.description} error={errors.description} onChange={update} placeholder="Add a little context about this task..." textarea span />
            <TaskField label="Category" name="category" value={values.category} error={errors.category} onChange={update} placeholder="e.g. Design" />
            <TaskField label="Due date" name="dueDate" value={values.dueDate} error={errors.dueDate} onChange={update} type="date" date />
            <TaskField label="Priority" name="priority" value={values.priority} error={errors.priority} onChange={update} select options={["", "Low", "Medium", "High"]} optionLabels={["Select priority", "Low", "Medium", "High"]} />
            <TaskField label="Status" name="status" value={values.status} error={errors.status} onChange={update} select options={["", "To Do", "In Progress", "Completed"]} optionLabels={["Select status", "To do", "In progress", "Completed"]} />
          </div>
          <div className="modal-actions"><button className="button button-ghost" type="button" onClick={onClose}>Cancel</button><button className="button button-primary" type="submit">{task ? "Save changes" : "Create task"}</button></div>
        </form>
      </section>
    </div>
  );
}
