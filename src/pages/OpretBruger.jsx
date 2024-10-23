import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "./firebase-config";

export default function OpretBruger() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSignUp(event) {
    event.preventDefault();
    const mail = event.target.mail.value; // mail value from inout field in sign in form
    const password = event.target.password.value; // password value from inout field in sign in form

    // read the docs: https://firebase.google.com/docs/auth/web/password-auth#create_a_password-based_account
    createUserWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        // Created and signed in
        const user = userCredential.user;
        console.log(user);
        createUser(user.uid, mail);
      })
      .catch((error) => {
        let code = error.code; // saving error code in variable
        console.log(code);
        code = code.replaceAll("-", " "); // some JS string magic to display error message. See the log above in the console
        code = code.replaceAll("auth/", "");
        setErrorMessage(code);
      });
  }

  async function createUser(uid, mail) {
    const url = `https://beeready-8e5f5-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`;
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({ name, mail }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("New user created: ", data);
    } else {
      console.log("Sorry, something went wrong");
    }
  }

  return (
    <main className="opret_bruger">
      <section className="page">
        <img src="img\bi-med-taske.gif" alt="flyvende bi" className="biGIF" />
        <img
          src="img\logo\logo-tekst-kort.svg"
          alt="Bee Ready, logo tekst"
          className="bi_skrift opacity_vis"
        />
        <form onSubmit={handleSignUp}>
          <section className="log_in_form">
            <h1>Opret bruger</h1>
            <label className="content_line">
              Navn:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                aria-label="name"
                placeholder="Skriv dit navn"
                required
              />
            </label>
            <label className="content_line">
              E-mail:
              <input
                type="email"
                name="mail"
                aria-label="mail"
                placeholder="Skriv din e-mail"
                required
                autoComplete="on"
              />
            </label>
            <label className="content_line">
              Telefon:
              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                aria-label="phone"
                placeholder="Skriv dit telefonnummer"
                autoComplete="on"
              />
            </label>
            <label className="content_line">
              Vælg adgangskode:
              <input
                type="password"
                name="password"
                aria-label="password"
                placeholder="Skriv din adgangskode"
                required
                autoComplete="on"
              />
            </label>
            <div className="error-message">
              <p>{errorMessage}</p>{" "}
            </div>
          </section>
          <button>Opret</button>
        </form>
      </section>
      <p className="option_bottom">
        Har du allerede en bruger?
        <Link className="btn" to="/log-ind">
          Log ind
        </Link>
      </p>
    </main>
  );
}
