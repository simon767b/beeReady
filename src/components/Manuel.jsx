export default function Manuel({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className={"dialog-overlay"}
      onClick={onClose}
      style={{
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "all" : "none",
      }}
    >
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <div>
          <h2>Manuel Dialog</h2>
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>

        <div>
          <p>Navn:</p>
          <input type="text" />
        </div>

        <div>
          <p>Fra:</p>
          <input type="date" />
        </div>

        <div>
          <p>Til:</p>
          <input type="date" />
        </div>
      </div>
    </div>
  );
}
