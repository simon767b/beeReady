import { useEffect, useRef, useState } from "react";
import { auth } from "./firebase-config";
import { signOut } from "@firebase/auth";

export default function Bruger() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const url = `https://beeready-8e5f5-default-rtdb.europe-west1.firebasedatabase.app/users/${auth.currentUser?.uid}.json`;
  const fileInputRef = useRef(null);

  const [isProfileChangeActive, setIsProfileChangeActive] = useState(false);

  const btnChangeProfile = (
    <button type="button" onClick={() => setIsProfileChangeActive(true)}>
      Rediger bruger
    </button>
  );
  const btnSaveProfile = (
    <button type="submit" onClick={() => setIsProfileChangeActive(false)}>
      Gem ændringer
    </button>
  );

  //load existing user data
  useEffect(() => {
    async function getUser() {
      const response = await fetch(url);
      const userData = await response.json();

      if (userData) {
        // if userData exists set states with values from userData (data from firebase)
        setName(userData.name);
        setEmail(auth.currentUser?.email);
        setPhone(userData.phone || "");
        setImage(userData.image || "img/dummy_profile_img.jpg");
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
    } else {
      console.log("Sorry, something went wrong");
    }
  }

  function handleSignOut() {
    console.log("hej");
    signOut(auth); // sign out from firebase/auth
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
      setErrorMessage("Den valgte billedefil er for stor.");
    }
  }

  return (
    <>
      <main className="bruger">
        <form onSubmit={handleSubmit} className="user_info">
          <div className="hex_profile_img">
            <img
              src={image ? image : "img/dummy_profile_img.jpg"}
              onError={(e) => (e.target.src = "img/dummy_profile_img.jpg")}
              onClick={() => fileInputRef.current.click()}
              alt="Vælg billede"
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
          <label>
            Navn:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              disabled={!isProfileChangeActive}
            />
          </label>
          <label>
            E-mail:
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              disabled={!isProfileChangeActive}
            />
          </label>
          <label>
            Telefon:
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Tilføj telefonnummer"
              name="phone"
              disabled={!isProfileChangeActive}
            />
          </label>
          <p>{errorMessage}</p>
          {isProfileChangeActive ? btnSaveProfile : btnChangeProfile}
        </form>
        <button>Tilpas essentials</button>
        <button type="button" onClick={handleSignOut}>
          Log ud
        </button>
      </main>
      <img
        className="hex_bg_pattern"
        src="img\hex_bg_pattern.svg"
        alt="Bikubemønster baggrund"
      />
    </>
  );
}
