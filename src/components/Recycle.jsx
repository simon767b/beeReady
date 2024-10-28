import X from "../assets/img/icons/x.svg";
import hiker from "../assets/img/icons/hiker.svg";
import house from "../assets/img/icons/house.svg";
import skier from "../assets/img/icons/skiier.svg";
import swimmer from "../assets/img/icons/swimmer.svg";
import tent from "../assets/img/icons/tent.svg";
import tourist from "../assets/img/icons/tourist.svg";

export default function Recycle({ isOpen, onClose }) {
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
         }}>
         <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
            <div>
               <h2>Manuel Dialog</h2>
               <button className="close-btn" onClick={onClose}>
                  <img src={X} alt="Kryds ikon" />
               </button>
            </div>

            <div className="dialog_ikons">
               <p>Vælg ikon:</p>

               <div>
                  <a href="#">
                     <img src={hiker} alt="Rejse ikon" />
                  </a>

                  <a href="#">
                     <img src={house} alt="Rejse ikon" />
                  </a>

                  <a href="#">
                     <img src={skier} alt="Rejse ikon" />
                  </a>

                  <a href="#">
                     <img src={swimmer} alt="Rejse ikon" />
                  </a>

                  <a href="#">
                     <img src={tent} alt="Rejse ikon" />
                  </a>

                  <a href="#">
                     <img src={tourist} alt="Rejse ikon" />
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
