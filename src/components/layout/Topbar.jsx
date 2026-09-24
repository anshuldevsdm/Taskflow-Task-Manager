import { Icon } from "../common/Icon";

export function Topbar({ search, onSearchChange, onOpenMobileNav }) {
  return (
    <header className="topbar">
      <button className="icon-button menu-button" type="button" aria-label="Open navigation" onClick={onOpenMobileNav}><Icon name="menu" /></button>
      <div className="topbar-search">
        <Icon name="search" />
        <input type="search" placeholder="Search tasks, projects, or people..." aria-label="Search tasks" value={search} onChange={(event) => onSearchChange(event.target.value)} />
        <kbd>⌘ K</kbd>
      </div>
      <div className="topbar-actions">
        <button className="icon-button notification-button" type="button" aria-label="Notifications"><span /><svg viewBox="0 0 24 24"><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></svg></button>
        <div className="profile"><span className="avatar">A</span><span className="profile-copy"><strong>Admin</strong><small>Workspace owner</small></span></div>
      </div>
    </header>
  );
}
