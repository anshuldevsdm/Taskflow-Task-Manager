import { useEffect, useRef } from "react";
import { TASK_PRIORITY, TASK_STATUS } from "../../constants/app";
import { Icon } from "../common/Icon";
import { TaskList } from "./TaskList";

export function TasksView({ tasks, filters, onFiltersChange, onCreateTask, onEditTask, onToggleTask, onDeleteTask, onResetFilters }) {
  const taskSearchRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth > 620) taskSearchRef.current?.focus();
  }, []);

  const anyFilter = Boolean(filters.query) || filters.status !== TASK_STATUS.ALL || filters.priority !== TASK_PRIORITY.ALL;
  const statuses = [[TASK_STATUS.ALL, "All"], [TASK_STATUS.TODO, "To do"], [TASK_STATUS.IN_PROGRESS, "In progress"], [TASK_STATUS.COMPLETED, "Completed"]];

  return (
    <section className="tasks-view view">
      <div className="page-heading tasks-heading"><div><p className="eyebrow">Workspace</p><h1>My tasks</h1><p>Organize, prioritize, and make progress.</p></div><button className="button button-primary add-task-trigger" type="button" onClick={onCreateTask}><Icon name="plus" />Add task</button></div>
      <section className="panel task-management">
        <div className="task-toolbar">
          <div className="task-search"><Icon name="search" /><input ref={taskSearchRef} type="search" placeholder="Search by task, description, or category" aria-label="Search task list" value={filters.query} onChange={(event) => onFiltersChange({ query: event.target.value })} /></div>
          <div className="filter-control"><Icon name="filter" /><select aria-label="Filter by priority" value={filters.priority} onChange={(event) => onFiltersChange({ priority: event.target.value })}><option value="All">All priorities</option><option value="High">High priority</option><option value="Medium">Medium priority</option><option value="Low">Low priority</option></select></div>
          <select className="sort-control" aria-label="Sort tasks" value={filters.sort} onChange={(event) => onFiltersChange({ sort: event.target.value })}><option value="newest">Newest first</option><option value="oldest">Oldest first</option><option value="due">Due date</option><option value="priority">Priority</option></select>
        </div>
        <div className="status-tabs" role="tablist" aria-label="Task status filter">
          {statuses.map(([status, label]) => <button key={status} className={`status-tab ${filters.status === status ? "active" : ""}`} type="button" role="tab" aria-selected={filters.status === status} onClick={() => onFiltersChange({ status })}>{label} <span>{status === TASK_STATUS.ALL ? tasks.length : tasks.filter((task) => task.status === status).length}</span></button>)}
          <button className={`reset-filters ${anyFilter ? "" : "hidden"}`} type="button" onClick={onResetFilters}>Reset filters</button>
        </div>
        <TaskList tasks={tasks} totalTasks={tasks.length} onToggleTask={onToggleTask} onEditTask={onEditTask} onDeleteTask={onDeleteTask} onCreateTask={onCreateTask} />
      </section>
    </section>
  );
}
