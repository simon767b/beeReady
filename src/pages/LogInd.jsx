import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "./firebase-config";

import biMedTaske from "../assets/img/bi-med-taske.gif";
import logoTekstKort from "../assets/img/logo/logo-tekst-kort.svg";

export default function LogInd() {
   const [errorMessage, setErrorMessage] = useState("");

   function handleSignIn(event) {
      event.preventDefault();
      const mail = event.target.mail.value; // mail value from inout field in sign in form
      const password = event.target.password.value; // password value from inout field in sign in form

      // read the docs: https://firebase.google.com/docs/auth/web/password-auth#sign_in_a_user_with_an_email_address_and_password
      signInWithEmailAndPassword(auth, mail, password)
         .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user); // for test purposes: logging the authenticated user
         })
         .catch((error) => {
            let code = error.code; // saving error code in variable
            console.log(code);
            code = code.replaceAll("-", " "); // some JS string magic to display error message. See the log above in the console
            code = code.replaceAll("auth/", "");
            setErrorMessage(code);
         });
   }
   return (
      <main className="log_ind">
         <img src={biMedTaske} alt="flyvende bi" className="bi_fixed" />
         <section className="logind_center page">
            <img src={biMedTaske} alt="flyvende bi" className="biGIF" />
            <img
               src={logoTekstKort}
               alt="Bee Ready, logo tekst"
               className="bi_skrift opacity_vis"
            />
            <form className="opacity_vis" onSubmit={handleSignIn}>
               <section className="log_in_form">
                  <h1>Log ind</h1>
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
                     Kode:
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
               <button>Log ind</button>
            </form>
         </section>

         <p className="option_bottom opret_bruger opacity_vis">
            Har du ikke en bruger?
            <Link className="btn" to="/opret-bruger">
               Opret bruger
            </Link>
         </p>
      </main>
   );
}
