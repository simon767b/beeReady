// LAVET AF SIMON

import X from "../assets/img/icons/x.svg";

export default function Recycle({ isOpen, onClose }) {
  return (
    <div
      className={"dialog-overlay"}
      style={{
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "all" : "none",
      }}
    >
      <form className="dialog-content">
        <div className="container">
          <h2>Genbrug liste</h2>
          <button type="button" className="close-btn" onClick={onClose}>
            <img src={X} alt="Kryds ikon" />
          </button>
        </div>
        <p>Denne funktion virker desværre ikke.</p>
      </form>
    </div>
  );
}
