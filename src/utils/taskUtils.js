import { PRIORITY_RANK, TASK_PRIORITY, TASK_STATUS } from "../constants/app";

export const slugify = (value) => value.toLowerCase().replace(/\s+/g, "-");

export const formatDate = (dateString, includeYear = false) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    ...(includeYear ? { year: "numeric" } : {}),
  }).format(new Date(`${dateString}T12:00:00`));

export const getDueText = (dueDate, referenceDate = new Date()) => {
  if (!dueDate) return "No due date";

  const today = new Date(referenceDate);
  today.setHours(0, 0, 0, 0);

  const due = new Date(`${dueDate}T00:00:00`);
  if (Number.isNaN(due.getTime())) return "Invalid date";

  const days = Math.round((due - today) / 86400000);

  if (days < 0) return "Overdue";
  if (days === 0) return "Due today";
  if (days === 1) return "Due tomorrow";
  return `Due ${formatDate(dueDate)}`;
};

export const getTaskStats = (tasks) => {
  const completed = tasks.filter((task) => task.status === TASK_STATUS.COMPLETED).length;
  const inProgress = tasks.filter((task) => task.status === TASK_STATUS.IN_PROGRESS).length;
  const highPriority = tasks.filter((task) => task.priority === TASK_PRIORITY.HIGH).length;
  const percent = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  return { completed, inProgress, highPriority, percent };
};

export const filterAndSortTasks = (tasks, filters) => {
  const query = filters.query.trim().toLowerCase();
  const selected = tasks.filter((task) => {
    const matchesQuery =
      !query ||
      [task.title, task.description, task.category].some((value) =>
        value.toLowerCase().includes(query),
      );
    const matchesStatus = filters.status === TASK_STATUS.ALL || task.status === filters.status;
    const matchesPriority =
      filters.priority === TASK_PRIORITY.ALL || task.priority === filters.priority;

    return matchesQuery && matchesStatus && matchesPriority;
  });

  return [...selected].sort((a, b) => {
    switch (filters.sort) {
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "due":
        return new Date(a.dueDate) - new Date(b.dueDate);
      case "priority":
        return PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
      case "newest":
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });
};

export const createTaskId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};
