export default function Template({ isOpen, onClose }) {
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
          <h2>Manuel Dialog</h2>
          <button className="close-btn" onClick={onClose}>
            <img src="./img/icons/x.svg" alt="Kryds ikon" />
          </button>
        </div>

        <div className="dialog_ikons">
          <p>Vælg ikon:</p>

          <div className="skabelon_boxe">
            <a href="#">
              <img src="./img/icons/hiker.svg" alt="Rejse ikon" />
              <p>Vandreferie</p>
            </a>

            <a href="#">
              <img src="./img/icons/house.svg" alt="Rejse ikon" />
              <p>Sommerhus</p>
            </a>

            <a href="#">
              <img src="./img/icons/skiier.svg" alt="Rejse ikon" />
              <p>Skiferie</p>
            </a>

            <a href="#">
              <img src="./img/icons/swimmer.svg" alt="Rejse ikon" />
              <p>Badeferie</p>
            </a>

            <a href="#">
              <img src="./img/icons/tent.svg" alt="Rejse ikon" />
              <p>Festival</p>
            </a>

            <a href="#">
              <img src="./img/icons/tourist.svg" alt="Rejse ikon" />
              <p>Storbyferie</p>
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="dialogform">
          <div className="dialog_input_div">
            <p>Navn:</p>
            <input type="text" placeholder="Riga" />
          </div>

          <div className="dialog_input_div">
            <p>Fra:</p>
            <input type="date" />
          </div>

          <div className="dialog_input_div">
            <p>Til:</p>
            <input type="date" />
          </div>

          <button className="opret-btn" onClick={onClose}>
            Opret liste
          </button>
        </form>
      </div>
    </div>
  );
}
