export default function Auto({ isOpen, onClose }) {
  if (!isOpen) return null;

  function handleSubmit() {
    console.log("hej");
  }

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
          <h2>Autogenereret liste</h2>
          <button className="close-btn" onClick={onClose}>
            <img src="./img/icons/x.svg" alt="Kryds ikon" />
          </button>
        </div>

        <div className="dialog_ikons">
          <p>Vælg ikon:</p>

          <div>
            <a href="#">
              <img src="./img/icons/hiker.svg" alt="Rejse ikon" />
            </a>

            <a href="#">
              <img src="./img/icons/house.svg" alt="Rejse ikon" />
            </a>

            <a href="#">
              <img src="./img/icons/skiier.svg" alt="Rejse ikon" />
            </a>

            <a href="#">
              <img src="./img/icons/swimmer.svg" alt="Rejse ikon" />
            </a>

            <a href="#">
              <img src="./img/icons/tent.svg" alt="Rejse ikon" />
            </a>

            <a href="#">
              <img src="./img/icons/tourist.svg" alt="Rejse ikon" />
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="dialogform">
          <div className="dialog_input_div">
            <p>Land:</p>
            <input type="text" placeholder="Frankrig" />
          </div>

          <div className="dialog_input_div">
            <p>By:</p>
            <input type="text" placeholder="Paris" />
          </div>

          <div className="dialog_input_div">
            <p>Fra:</p>
            <input type="date" />
          </div>

          <div className="dialog_input_div">
            <p>Til:</p>
            <input type="date" />
          </div>

          <div className="dialog_ikons">
            <p>Angiv Aktivitetsniveau:</p>

            <input type="range" />
          </div>

          <button className="opret-btn" onClick={onClose}>
            Opret liste
          </button>
        </form>
      </div>
    </div>
  );
}
