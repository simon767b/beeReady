import { useState } from "react"; // Import useState to manage state
import CheckSettings from "../components/CheckSettings";

export default function Indstillinger() {
  const [emailChecked, setEmailChecked] = useState(true);
  const [smsChecked, setSmsChecked] = useState(false);
  const [darkModeChecked, setDarkModeChecked] = useState(false);

  return (
    <>
      <main className="settings page">
        <section className="settings-div content">
          <h1>Notifikationer</h1>
          <div className="content_line">
            <p>E-mail</p>
            <CheckSettings
              checked={emailChecked}
              onChange={() => setEmailChecked()}
            />
          </div>
          <div className="content_line">
            <p>SMS</p>
            <CheckSettings
              checked={smsChecked}
              onChange={() => setSmsChecked()}
            />
          </div>
        </section>

        <section className="settings-div content">
          <h1>Tema</h1>
          <div className="content_line">
            <p>Dark Mode</p>
            <CheckSettings
              checked={darkModeChecked}
              onChange={() => setDarkModeChecked()}
            />
          </div>
        </section>
      </main>
      <img
        className="hex_bg_pattern"
        src="img/hex_bg_pattern.svg"
        alt="Bikubemønster baggrund"
      />
    </>
  );
}
