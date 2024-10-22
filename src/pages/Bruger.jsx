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
              Navn:
              <input type="text" readOnly />
            </label>
            <button>Skift</button>
          </article>
        </section>
      </main>
      <img className="hex_bg_pattern" src="img\hex_bg_pattern.svg" alt="Bikubemønster baggrund" />
    </>
  );
}
