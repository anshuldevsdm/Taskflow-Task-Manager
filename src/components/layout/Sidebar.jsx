import { Brand } from "../common/Brand";
import { Icon } from "../common/Icon";

export function Sidebar({ currentView, onNavigate, onLogout, mobileOpen, onCloseMobileNav, taskCount }) {
  const navigate = (view) => {
    onNavigate(view);
    if (window.innerWidth <= 620) onCloseMobileNav();
  };

  return (
    <>
      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="sidebar-top">
          <Brand />
          <nav className="nav-list" aria-label="Main navigation">
            <button className={`nav-link ${currentView === "dashboard" ? "active" : ""}`} type="button" onClick={() => navigate("dashboard")}>
              <Icon name="grid" /><span>Overview</span>
            </button>
            <button className={`nav-link ${currentView === "tasks" ? "active" : ""}`} type="button" onClick={() => navigate("tasks")}>
              <Icon name="list" /><span>My tasks</span><b>{taskCount}</b>
            </button>
          </nav>
        </div>
        <div className="sidebar-bottom">
          <div className="help-card"><span className="help-icon">?</span><div><strong>Need a hand?</strong><span>Visit the help center</span></div></div>
          <button className="nav-link logout-link" type="button" onClick={onLogout}><Icon name="logout" /><span>Log out</span></button>
        </div>
      </aside>
      <div className={`mobile-shade ${mobileOpen ? "show" : ""}`} onClick={onCloseMobileNav} />
    </>
  );
}
