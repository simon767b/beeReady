import { useState } from "react"; // Import useState to manage state
import Check from "../components/Check";

export default function Indstillinger() {
   const [emailChecked, setEmailChecked] = useState(true);
   const [smsChecked, setSmsChecked] = useState(false);
   const [darkModeChecked, setDarkModeChecked] = useState(false);

   return (
      <>
         <main className="settings">
            <div className="settings-div">
               <h1>Indstillinger</h1>
               <div>
                  <p>E-mail</p>
                  <Check
                     checked={emailChecked}
                     onChange={() => setEmailChecked()}
                  />
               </div>
               <div>
                  <p>SMS</p>
                  <Check
                     checked={smsChecked}
                     onChange={() => setSmsChecked()}
                  />
               </div>
            </div>

            <div className="settings-div">
               <h1>Tema</h1>
               <div>
                  <p>Dark Mode</p>
                  <Check
                     checked={darkModeChecked}
                     onChange={() => setDarkModeChecked()}
                  />
               </div>
            </div>
         </main>
         <img
            className="hex_bg_pattern"
            src="img/hex_bg_pattern.svg"
            alt="Bikubemønster baggrund"
         />
      </>
   );
}
