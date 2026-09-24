import { Icon } from "../common/Icon";

export function DeleteModal({ task, onClose, onConfirm }) {
  if (!task) return null;

  return (
    <div className="modal-backdrop" aria-hidden="false" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="modal confirm-modal" role="dialog" aria-modal="true" aria-labelledby="deleteModalTitle">
        <button className="icon-button" type="button" onClick={onClose} aria-label="Close"><Icon name="x" /></button>
        <div className="delete-icon"><Icon name="trash" /></div>
        <h2 id="deleteModalTitle">Delete this task?</h2>
        <p>Are you sure you want to permanently remove <strong>“{task.title}”</strong>? This action can’t be undone.</p>
        <div className="modal-actions"><button className="button button-ghost" type="button" onClick={onClose}>Cancel</button><button className="button button-danger" type="button" onClick={onConfirm}>Delete task</button></div>
      </section>
    </div>
  );
}
