import { Icon } from "../common/Icon";

export function StatCard({ icon, tone, label, value, small }) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${tone}`}><Icon name={icon} /></div>
      <div><p>{label}</p><strong>{value}</strong><small>{small}</small></div>
    </article>
  );
}
