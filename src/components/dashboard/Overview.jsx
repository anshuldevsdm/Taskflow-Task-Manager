import { PRIORITY_RANK } from "../../constants/app";
import { formatDate, getDueText, slugify } from "../../utils/taskUtils";
import { Icon } from "../common/Icon";
import { StatCard } from "./StatCard";

export function Overview({ tasks, stats, onViewTasks, onCreateTask, onEditTask }) {
  const recent = [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);
  const priorityTasks = [...tasks]
    .filter((task) => task.status !== "Completed")
    .sort((a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority])
    .slice(0, 3);

  return (
    <section className="dashboard-view view">
      <div className="page-heading">
        <div><p className="eyebrow">{new Intl.DateTimeFormat("en", { weekday: "long", month: "long", day: "numeric" }).format(new Date())}</p><h1>Good morning, Admin <span className="wave">👋</span></h1><p>Here’s what’s happening with your tasks today.</p></div>
      </div>

      <section className="stats-grid" aria-label="Task statistics">
        <StatCard icon="list" tone="blue" label="Total tasks" value={tasks.length} small={tasks.length ? `${tasks.length} tasks in your workspace` : "Your workspace is ready"} />
        <StatCard icon="check" tone="green" label="Completed" value={stats.completed} small={`${stats.percent}% completion rate`} />
        <StatCard icon="clock" tone="violet" label="In progress" value={stats.inProgress} small="Keep the momentum going" />
        <StatCard icon="target" tone="red" label="High priority" value={stats.highPriority} small="Require your attention" />
      </section>

      <section className="overview-grid">
        <article className="panel progress-panel">
          <div className="panel-heading"><div><h2>Your productivity</h2><p>Task completion this week</p></div><span className="period-label">This week</span></div>
          <div className="productivity-content">
            <div className="progress-ring" style={{ "--percent": stats.percent }}><span><strong>{stats.percent}%</strong><small>completed</small></span></div>
            <div className="progress-summary"><strong>{stats.completed ? `${stats.completed} of ${tasks.length} tasks complete` : "No tasks completed yet"}</strong><p>{stats.completed ? "You’re making steady progress. Keep your focus on the next important thing." : "Start with one small task to build momentum."}</p><button className="text-button" type="button" onClick={onViewTasks}>View all tasks <Icon name="arrow" /></button></div>
          </div>
        </article>

        <article className="panel priorities-panel">
          <div className="panel-heading"><div><h2>Priority focus</h2><p>Tasks that need your attention</p></div><button className="text-button" type="button" onClick={onViewTasks}>View all</button></div>
          <div className="priority-list">
            {priorityTasks.length ? priorityTasks.map((task) => <div className="priority-item" key={task.id}><span className={`priority-line ${slugify(task.priority)}`} /><div><span className="priority-name">{task.title}</span><span className="priority-meta">{task.category} · {task.status}</span></div><span className={`priority-due ${new Date(task.dueDate) < new Date("2026-09-20T00:00:00") ? "overdue" : ""}`}>{getDueText(task.dueDate)}</span></div>) : <div className="empty-state"><div><h2>All caught up</h2><p>There are no active priority tasks.</p></div></div>}
          </div>
        </article>
      </section>

      <section className="panel recent-panel">
        <div className="panel-heading"><div><h2>Recent tasks</h2><p>Stay on top of your latest work</p></div><button className="button button-secondary add-task-trigger" type="button" onClick={onCreateTask}><Icon name="plus" />New task</button></div>
        <div className="recent-list">
          {recent.length ? recent.map((task) => <article className="recent-row" key={task.id}><div><div className="recent-title">{task.title}<small>{task.description}</small></div></div><div className="category-cell"><span className="category-label"><Icon name="briefcase" />{task.category}</span></div><div><span className={`badge status-${slugify(task.status)}`}>{task.status}</span></div><div className="task-date">{formatDate(task.dueDate)}</div><button className="icon-button row-action" type="button" onClick={() => onEditTask(task.id)} aria-label={`Edit ${task.title}`}><Icon name="edit" /></button></article>) : <div className="empty-state"><div><h2>Nothing here yet</h2><p>Add a task to see your recent work.</p></div></div>}
        </div>
      </section>
    </section>
  );
}
