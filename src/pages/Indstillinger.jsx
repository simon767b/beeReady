import { useState } from "react"; // Import useState to manage state
import CheckSettings from "../components/CheckSettings";
import { auth } from "./firebase-config";
import { signOut } from "@firebase/auth";

export default function Indstillinger() {
  const [emailChecked, setEmailChecked] = useState(true);
  const [smsChecked, setSmsChecked] = useState(false);
  const [darkModeChecked, setDarkModeChecked] = useState(false);

  function handleSignOut() {
    console.log("hej");
    signOut(auth); // sign out from firebase/auth
  }

  return (
    <>
      <main className="settings page">
        <div className="linje-moenster"></div>
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
        <div className="linje-moenster"></div>
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
        <div className="linje-moenster"></div>
        <button
          className="option_bottom btn_log_out"
          type="button"
          onClick={handleSignOut}
        >
          Log ud
        </button>
      </main>
      <img
        className="hex_bg_pattern"
        src="img/hex_bg_pattern.svg"
        alt="Bikubemønster baggrund"
      />
    </>
  );
}
