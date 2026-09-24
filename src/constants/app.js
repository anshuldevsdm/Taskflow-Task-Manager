export const APP_NAME = "TaskFlow";
export const DEMO_CREDENTIALS = Object.freeze({
  username: "admin",
  password: "admin123",
});

export const TASK_STATUS = Object.freeze({
  ALL: "All",
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
});

export const TASK_PRIORITY = Object.freeze({
  ALL: "All",
  HIGH: "High",
  MEDIUM: "Medium",
  LOW: "Low",
});

export const SORT_OPTIONS = Object.freeze({
  NEWEST: "newest",
  OLDEST: "oldest",
  DUE: "due",
  PRIORITY: "priority",
});

export const DEFAULT_FILTERS = Object.freeze({
  query: "",
  status: TASK_STATUS.ALL,
  priority: TASK_PRIORITY.ALL,
  sort: SORT_OPTIONS.NEWEST,
});

export const PRIORITY_RANK = Object.freeze({
  High: 1,
  Medium: 2,
  Low: 3,
});

export const CATEGORY_OPTIONS = ["Work", "Design", "Marketing", "Personal", "Planning"];
