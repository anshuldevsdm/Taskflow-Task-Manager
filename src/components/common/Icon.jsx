const ICONS = {
  check: <><path d="m5 12 4.2 4.2L19 6.5" /></>,
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  eye: <><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.6" /></>,
  "eye-off": <><path d="m3 3 18 18M10.6 6.3A10.6 10.6 0 0 1 12 6c6 0 9.5 6 9.5 6a17.6 17.6 0 0 1-3 3.8M6.1 6.1C3.8 7.9 2.5 12 2.5 12s3.5 6 9.5 6c1.4 0 2.7-.3 3.8-.7" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" /></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
  list: <><path d="M9 6h11M9 12h11M9 18h11" /><path d="M4 6h.01M4 12h.01M4 18h.01" /></>,
  logout: <><path d="M10 17l5-5-5-5M15 12H3" /><path d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7" /></>,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  filter: <><path d="M4 5h16M7 12h10M10 19h4" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4M17 3v4M3 10h18" /></>,
  edit: <><path d="M12 20H5a1 1 0 0 1-1-1v-7M17.5 3.5a2.1 2.1 0 0 1 3 3L11 16l-4 1 1-4 9.5-9.5Z" /></>,
  trash: <><path d="M4 7h16M10 11v5M14 11v5M6 7l1 13h10l1-13M9 7V4h6v3" /></>,
  x: <><path d="m6 6 12 12M18 6 6 18" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.4 2" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" /></>,
  target: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
};

export function Icon({ name, className = "" }) {
  return (
    <svg className={className} aria-hidden="true" viewBox="0 0 24 24">
      {ICONS[name]}
    </svg>
  );
}
