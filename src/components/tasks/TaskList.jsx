import { getDueText, slugify } from "../../utils/taskUtils";
import { Icon } from "../common/Icon";

export function TaskList({ tasks, totalTasks, onToggleTask, onEditTask, onDeleteTask, onCreateTask }) {
  return (
    <div className="task-list" aria-live="polite">
      {tasks.length ? tasks.map((task) => (
        <article className="task-row" data-id={task.id} key={task.id}>
          <div className="task-title-wrap">
            <button className={`task-check ${task.status === "Completed" ? "completed" : ""}`} type="button" onClick={() => onToggleTask(task.id)} aria-label={`Mark ${task.title} as ${task.status === "Completed" ? "to do" : "completed"}`}>
              {task.status === "Completed" ? <Icon name="check" /> : null}
            </button>
            <div className="task-title-cell"><div className="task-name">{task.title}</div><div className="task-description">{task.description}</div></div>
          </div>
          <div className="category-cell"><span className="category-label"><Icon name="briefcase" />{task.category}</span></div>
          <div className="priority-badge"><span className={`badge priority-${slugify(task.priority)}`}>{task.priority}</span></div>
          <div><span className={`badge status-${slugify(task.status)}`}>{task.status}</span></div>
          <div className="task-date">{getDueText(task.dueDate)}</div>
          <div className="task-actions"><button className="icon-button" type="button" onClick={() => onEditTask(task.id)} aria-label={`Edit ${task.title}`}><Icon name="edit" /></button><button className="icon-button delete-action" type="button" onClick={() => onDeleteTask(task.id)} aria-label={`Delete ${task.title}`}><Icon name="trash" /></button></div>
        </article>
      )) : (
        <div className="empty-state"><div><div className="empty-art"><Icon name="search" /></div><h2>No tasks found</h2><p>{totalTasks ? "Try changing your search or filters to find what you need." : "Create your first task and start building momentum."}</p><button className="button button-primary add-task-trigger" type="button" onClick={onCreateTask}><Icon name="plus" />Create task</button></div></div>
      )}
    </div>
  );
}
