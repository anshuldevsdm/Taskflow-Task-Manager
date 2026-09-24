import { Icon } from "./Icon";

export function Brand({ light = false }) {
  return (
    <a className={`brand ${light ? "brand-light" : ""}`} href="#" aria-label="TaskFlow home">
      <span className="logo-mark"><Icon name="check" /></span>
      <span>TaskFlow</span>
    </a>
  );
}
