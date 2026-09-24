import { useEffect, useMemo, useState } from "react";
import { INITIAL_TASKS } from "../data/initialTasks";
import { getTaskStats, filterAndSortTasks, createTaskId } from "../utils/taskUtils";

const STORAGE_KEY = "taskflow.tasks.v1";

const readStoredTasks = () => {
  const fallbackTasks = INITIAL_TASKS.map((task) => ({ ...task }));

  if (typeof window === "undefined") return fallbackTasks;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return fallbackTasks;

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed) || !parsed.length) return fallbackTasks;

    return parsed.map((task) => ({ ...task }));
  } catch {
    return fallbackTasks;
  }
};

export const useTasks = () => {
  const [tasks, setTasks] = useState(() => readStoredTasks());

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks]);

  const stats = useMemo(() => getTaskStats(tasks), [tasks]);

  const filteredTasks = (filters) => filterAndSortTasks(tasks, filters);

  const createTask = (data) => {
    const task = {
      id: createTaskId(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    setTasks((current) => [...current, task]);
    return task;
  };

  const updateTask = (id, data) => {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, ...data } : task)),
    );
  };

  const toggleTask = (id) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, status: task.status === "Completed" ? "To Do" : "Completed" }
          : task,
      ),
    );
  };

  const removeTask = (id) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  const getTaskById = (id) => tasks.find((task) => task.id === id) ?? null;

  return {
    tasks,
    stats,
    filteredTasks,
    createTask,
    updateTask,
    toggleTask,
    removeTask,
    getTaskById,
  };
};
