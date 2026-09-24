import { Icon } from "../common/Icon";
import { CATEGORY_OPTIONS } from "../../constants/app";

const makeId = (name) => `task${name.charAt(0).toUpperCase()}${name.slice(1)}`;

export function TaskField({ label, name, value, error, onChange, placeholder, type = "text", textarea = false, select = false, options = [], optionLabels = [], date = false, span = false }) {
  const id = makeId(name);

  return (
    <div className={`form-field ${span ? "form-span-2" : ""} ${error ? "invalid" : ""}`}>
      <label htmlFor={id}>{label} <em>*</em></label>
      {select ? (
        <select id={id} name={name} value={value} onChange={(event) => onChange(name, event.target.value)}>
          {options.map((option, index) => <option key={option} value={option}>{optionLabels[index]}</option>)}
        </select>
      ) : textarea ? (
        <textarea id={id} name={name} rows="3" placeholder={placeholder} value={value} onChange={(event) => onChange(name, event.target.value)} />
      ) : (
        <div className={date ? "date-wrap" : undefined}>
          <input id={id} name={name} type={type} placeholder={placeholder} value={value} onChange={(event) => onChange(name, event.target.value)} list={name === "category" ? "categoryOptions" : undefined} />
          {date && <Icon name="calendar" />}
        </div>
      )}
      {name === "category" && <datalist id="categoryOptions">{CATEGORY_OPTIONS.map((category) => <option key={category} value={category} />)}</datalist>}
      <p className="field-error">{error || ""}</p>
    </div>
  );
}
