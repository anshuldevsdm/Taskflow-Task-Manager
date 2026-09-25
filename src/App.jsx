import { useCallback, useEffect, useState } from "react";
import { DEFAULT_FILTERS } from "./constants/app";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";
import { useTasks } from "./hooks/useTasks";
import { TOAST_TYPES, useToast } from "./hooks/useToast";
import { LoginScreen } from "./components/auth/LoginScreen";
import { ToastRegion } from "./components/common/ToastRegion";
import { Sidebar } from "./components/layout/Sidebar";
import { Topbar } from "./components/layout/Topbar";
import { Overview } from "./components/dashboard/Overview";
import { DeleteModal } from "./components/tasks/DeleteModal";
import { TaskModal } from "./components/tasks/TaskModal";
import { TasksView } from "./components/tasks/TasksView";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [topbarSearch, setTopbarSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const {
    tasks,
    stats,
    filteredTasks,
    createTask,
    updateTask,
    toggleTask,
    removeTask,
    getTaskById,
  } = useTasks();
  const { toasts, showToast, removeToast } = useToast();

  const closeOverlays = useCallback(() => {
    setTaskModalOpen(false);
    setDeleteId(null);
    setMobileOpen(false);
  }, []);

  const focusTaskSearch = useCallback(() => {
    setCurrentView("tasks");
    window.setTimeout(
      () => document.querySelector(".task-search input")?.focus(),
      0,
    );
  }, []);

  useKeyboardShortcuts({
    onEscape: closeOverlays,
    onSearchShortcut: authenticated ? focusTaskSearch : undefined,
  });

  useEffect(() => {
    document.body.style.overflow =
      taskModalOpen || deleteId !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [taskModalOpen, deleteId]);

  useEffect(() => {
    setFilters((current) => ({ ...current, query: topbarSearch }));
  }, [topbarSearch]);

  const openCreateModal = () => {
    setEditingId(null);
    setTaskModalOpen(true);
  };

  const openEditModal = (id) => {
    setEditingId(id);
    setTaskModalOpen(true);
  };

  const handleSaveTask = (data) => {
    if (editingId === null) {
      createTask(data);
      showToast(
        "Task created successfully",
        "It’s now part of your workspace.",
        TOAST_TYPES.SUCCESS,
      );
    } else {
      updateTask(editingId, data);
      showToast(
        "Task updated successfully",
        "Your changes have been saved.",
        TOAST_TYPES.SUCCESS,
      );
    }
    setEditingId(null);
    setTaskModalOpen(false);
  };

  const handleToggleTask = (id) => {
    const target = getTaskById(id);
    if (!target) return;
    const nextStatus = target.status === "Completed" ? "To Do" : "Completed";
    toggleTask(id);
    showToast(
      nextStatus === "Completed" ? "Task completed" : "Task moved to To-Do",
      target.title,
      nextStatus === "Completed" ? TOAST_TYPES.SUCCESS : TOAST_TYPES.WARNING,
    );
  };

  const handleDeleteTask = () => {
    if (deleteId === null) return;
    removeTask(deleteId);
    setDeleteId(null);
    showToast(
      "Task deleted successfully",
      "The task has been permanently removed.",
      TOAST_TYPES.DANGER,
    );
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setCurrentView("dashboard");
    setEditingId(null);
    setDeleteId(null);
    setTaskModalOpen(false);
    setMobileOpen(false);
    setFilters(DEFAULT_FILTERS);
    setTopbarSearch("");
    showToast("Logged out successfully", "See you again soon.", TOAST_TYPES.WARNING);
  };

  const handleLogin = () => {
    setAuthenticated(true);
    showToast(
      "Logged in successfully",
      "Welcome back to your workspace.",
      TOAST_TYPES.SUCCESS,
    );
  };

  const handleFiltersChange = (changes) => {
    setFilters((current) => ({ ...current, ...changes }));
    if (Object.prototype.hasOwnProperty.call(changes, "query"))
      setTopbarSearch(changes.query);
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setTopbarSearch("");
  };

  if (!authenticated)
    return (
      <>
        <LoginScreen onLogin={handleLogin} />
        <ToastRegion toasts={toasts} onDismiss={removeToast} />
      </>
    );

  const displayedTasks = filteredTasks(filters);
  const editingTask = editingId === null ? null : getTaskById(editingId);
  const deletingTask = deleteId === null ? null : getTaskById(deleteId);

  return (
    <>
      <section className="app-shell">
        <Sidebar
          currentView={currentView}
          onNavigate={setCurrentView}
          onLogout={handleLogout}
          mobileOpen={mobileOpen}
          onCloseMobileNav={() => setMobileOpen(false)}
          taskCount={tasks.length}
        />
        <div className="app-content">
          <Topbar
            search={topbarSearch}
            onSearchChange={(value) => handleFiltersChange({ query: value })}
            onOpenMobileNav={() => setMobileOpen(true)}
          />
          <div className="page-area">
            {currentView === "dashboard" ? (
              <Overview
                tasks={tasks}
                stats={stats}
                onViewTasks={() => setCurrentView("tasks")}
                onCreateTask={openCreateModal}
                onEditTask={openEditModal}
              />
            ) : (
              <TasksView
                tasks={displayedTasks}
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onCreateTask={openCreateModal}
                onEditTask={openEditModal}
                onToggleTask={handleToggleTask}
                onDeleteTask={setDeleteId}
                onResetFilters={resetFilters}
              />
            )}
          </div>
        </div>
      </section>

      <TaskModal
        task={editingTask}
        open={taskModalOpen}
        onClose={() => {
          setTaskModalOpen(false);
          setEditingId(null);
        }}
        onSave={handleSaveTask}
      />
      <DeleteModal
        task={deletingTask}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteTask}
      />
      <ToastRegion toasts={toasts} onDismiss={removeToast} />
    </>
  );
}

export default App;
