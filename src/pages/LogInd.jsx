export default function LogInd() {
  return (
    <>
      <img
        src="./img/bi-med-taske.gif"
        alt="flyvende bi"
        className="bi_fixed"
      />
      <div className="logind_center">
        <img src="./img/bi-med-taske.gif" alt="flyvende bi" className="biGIF" />
        <img
          src="./img/logo/logo-tekst-kort.svg"
          alt="lgog tekst"
          className="bi_skrift opacity_vis"
        />

        <form className="logind_form opacity_vis">
          <h1>Log ind</h1>
          <div>
            <p>Email:</p>
            <input type="text" placeholder="Patricia77@gmail.com" />
          </div>

          <div>
            <p>Kode:</p>
            <input type="text" placeholder="***********" />
          </div>
        </form>

        <button className="generelKnap opacity_vis">Log ind</button>
      </div>

      <div className="opret_bruger opacity_vis">
        <p>Har du ikke en bruger?</p>
        <button className="generelKnap">Opret bruger</button>
      </div>
    </>
  );
}
