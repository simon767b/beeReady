export default function LogInd() {
  return (
    <>
      <div>
        <img src="./img/bi-med-taske.gif" alt="flyvende bi" className="biGIF" />
        <img
          src="./img/logo/logo-tekst-kort.svg"
          alt="lgog tekst"
          className="biGIF"
        />

        <form>
          <p>Log ind</p>
          <div>
            <p>Email:</p>
            <input type="text" placeholder="Patricia77@gmail.com" />
          </div>

          <div>
            <p>Kode:</p>
            <input type="text" placeholder="***********" />
          </div>
        </form>

        <button className="generelKnap">Log ind</button>
      </div>
    </>
  );
}
