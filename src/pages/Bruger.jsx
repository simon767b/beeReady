import { useEffect, useRef, useState } from "react";
import { auth } from "./firebase-config";

export default function Bruger() {
   const [image, setImage] = useState("");
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [phone, setPhone] = useState("");
   const [errorMessage, setErrorMessage] = useState("");
   const [confirmation, setConfirmation] = useState("");
   const url = `https://beeready-8e5f5-default-rtdb.europe-west1.firebasedatabase.app/users/${auth.currentUser?.uid}.json`;
   const fileInputRef = useRef(null);

   const [isProfileChangeActive, setIsProfileChangeActive] = useState(false);

   const btnChangeProfile = (
      <button onClick={() => setIsProfileChangeActive(true)}>
         Rediger bruger
      </button>
   );
   const btnSaveProfile = (
      <button type="button" onClick={() => setIsProfileChangeActive(false)}>
         Gem ændringer
      </button>
   );

   function giveConfirmation() {
      setConfirmation("Dine ændringer er gemt.");
      setTimeout(() => {
         setConfirmation("");
      }, 3000); // vis confirmation i 3 sekunder
   }

   //load existing user data
   useEffect(() => {
      async function getUser() {
         const response = await fetch(url);
         const userData = await response.json();

         if (userData) {
            // if userData exists set states with values from userData (data from firebase)
            setName(userData.name || "");
            setEmail(auth.currentUser?.email || "");
            setPhone(userData.phone || "");
            setImage(userData.image || "/img/icons/profile_dummy.webp");
         }
      }
      getUser();
   }, [auth.currentUser, url]); // dependencies: useEffect is executed when url changes

   async function handleSubmit(event) {
      event.preventDefault();

      const userToUpdate = { name, mail: email, phone, image }; // create an object to hold the user to update properties
      console.log(userToUpdate);

      const response = await fetch(url, {
         method: "PUT",
         body: JSON.stringify(userToUpdate),
      });
      if (response.ok) {
         const data = await response.json();
         console.log("User updated: ", data);
         giveConfirmation();
      } else {
         console.log("Sorry, something went wrong");
      }
   }

   /**
    * handleImageChange is called every time the user chooses an image in the fire system.
    * The event is fired by the input file field in the form
    */
   function handleImageChange(event) {
      const file = event.target.files[0];
      if (file.size < 500000) {
         // image file size must be below 0,5MB
         const reader = new FileReader();
         reader.onload = (event) => {
            setImage(event.target.result);
         };
         reader.readAsDataURL(file);
         setErrorMessage(""); //reset errorMessage state
      } else {
         // if not below 0.5MB display an error message using the errorMessage state
         setErrorMessage("Den valgte billedfil er for stor.");
      }
   }

   return (
      <>
         <main className="bruger page">
            <form onSubmit={handleSubmit} className="user_info content">
               <div className="hex_profile_img">
                  <img
                     src={image ? image : "/img/icons/profile_dummy.webp"}
                     onError={(e) =>
                        (e.target.src = "/img/icons/profile_dummy.webp")
                     }
                     onClick={() => fileInputRef.current.click()}
                     alt="Vælg billede"
                     className="profile"
                     style={{
                        opacity: isProfileChangeActive ? "0.5" : "1",
                     }}
                  />
                  <img
                     src="/img/icons/indstillinger.svg"
                     alt="Ændr profilbillede"
                     className="icon"
                     style={{
                        display: isProfileChangeActive ? "inline" : "none",
                     }}
                  />
                  <input
                     className="hide"
                     type="file"
                     accept="image/*"
                     onChange={handleImageChange}
                     ref={fileInputRef}
                     disabled={!isProfileChangeActive}
                  />
               </div>
               <label className="content_line">
                  E-mail:
                  <input
                     type="mail"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     name="email"
                     disabled
                  />
               </label>
               <label className="content_line">
                  Navn:
                  <input
                     type="text"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     name="name"
                     disabled={!isProfileChangeActive}
                     style={{
                        backgroundColor: isProfileChangeActive
                           ? "var(--color3)"
                           : "transparent",
                     }}
                  />
               </label>
               <label className="content_line">
                  Telefon:
                  <input
                     type="tel"
                     value={phone}
                     onChange={(e) => setPhone(e.target.value)}
                     placeholder="Tilføj telefonnummer"
                     name="phone"
                     disabled={!isProfileChangeActive}
                     style={{
                        backgroundColor: isProfileChangeActive
                           ? "var(--color3)"
                           : "transparent",
                     }}
                  />
               </label>
               {errorMessage ? (
                  <div className="message content_line">
                     <img src="/img/icons/error_x.svg" alt="X" />
                     <p className="error">{errorMessage}</p>
                  </div>
               ) : (
                  ""
               )}
               {confirmation ? (
                  <div className="message content_line">
                     <img
                        src="/img/icons/confirmation_tick.svg"
                        alt="flueben"
                     />
                     <p className="confirmation">{confirmation}</p>
                  </div>
               ) : (
                  ""
               )}
               {isProfileChangeActive ? btnSaveProfile : btnChangeProfile}
            </form>
            <button>Tilpas essentials</button>
         </main>
         <img
            className="hex_bg_pattern"
            src="/img/hex_bg_pattern.svg"
            alt="Bikubemønster baggrund"
         />
      </>
   );
}
