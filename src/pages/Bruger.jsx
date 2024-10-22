export default function Bruger() {
  return (
    <>
      <main className="bruger">
        <div className="hex_profile_img">
          <img
            src="img\dummy_profile_img.jpg"
            alt="Midlertidigt profilbillede"
          />
        </div>
        <section className="user_info">
          <article>
            <label>
              Navn:
              <input type="text" value={"Patricia"} readOnly />
            </label>
            <button>Skift</button>
          </article>
          <article>
            <label>
              E-mail:
              <input type="text" value={"Patricia77@gmail.com"} readOnly />
            </label>
            <button>Skift</button>
          </article>
          <article>
            <label>
              Telefon:
              <input type="text" value={"+45 22 49 12 40"} readOnly />
            </label>
            <button>Skift</button>
          </article>
        </section>
        <article>
          <button>Tilpas essentials</button>
          <button>Skift password</button>
        </article>
      </main>
      <img
        className="hex_bg_pattern"
        src="img\hex_bg_pattern.svg"
        alt="Bikubemønster baggrund"
      />
    </>
  );
}
