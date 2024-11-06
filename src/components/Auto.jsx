// LAVET AF SIMON
// DATA-IMPLEMENTERING LAVET I FÆLLESSKAB

import { useEffect, useState } from "react";
import { auth } from "../pages/firebase-config";

import X from "../assets/img/icons/x.svg";
import hiker from "../assets/img/icons/hiker.svg";
import house from "../assets/img/icons/house.svg";
import skier from "../assets/img/icons/skiier.svg";
import swimmer from "../assets/img/icons/swimmer.svg";
import tent from "../assets/img/icons/tent.svg";
import tourist from "../assets/img/icons/tourist.svg";

export default function Auto({ isOpen, onClose }) {
  async function createList(newList) {
    newList.uid = auth.currentUser.uid; //authenticated user id

    const url = `https://beeready-8e5f5-default-rtdb.europe-west1.firebasedatabase.app/lists.json`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newList),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("New list created: ", data);
    } else {
      console.log("Sorry, something went wrong");
    }
  }

  // functionality for the form with input data
  const [list, setList] = useState("");
  const [icon, setIcon] = useState("");
  const [name, setName] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [editedAt, setEditedAt] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [chosenIcon, setChosenIcon] = useState("");

  useEffect(() => {
    if (list?.icon && list?.name && list?.dateStart && list?.dateEnd) {
      // if post, set the states with values from the post object.
      // The post object is a prop, passed from UpdatePage
      setIcon(list.icon);
      setName(list.name);
      setDateStart(list.dateStart);
      setDateEnd(list.dateEnd);
    }
  }, [list]); // useEffect is called every time list changes

  function handleSubmit(event) {
    event.preventDefault();
    setEditedAt(new Date().getTime());
    const formData = {
      // create a new objebt to store the value from states / input fields
      icon: icon,
      name: name,
      dateStart: dateStart,
      dateEnd: dateEnd,
      editedAt: editedAt,
    };

    const validForm =
      formData.icon && formData.name && formData.dateStart && formData.dateEnd; // will return false if one of the properties doesn't have a value

    if (validForm && formData.dateStart <= formData.dateEnd) {
      // if all fields/ properties are filled, then call createList
      createList(formData);
      setErrorMessage("");
      // navigate("/lists/:listId");
      // navigate(`/lists/${params.id}`); //virker ikke korrekt
      location.reload();
    } else if (formData.dateStart > formData.dateEnd) {
      setErrorMessage("Afrejse skal være før hjemrejse.");
    } else {
      setErrorMessage("Venligst udfyld alle felter.");
    }
  }

  return (
    <div
      className={"dialog-overlay"}
      onClick={onClose}
      style={{
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "all" : "none",
      }}
    >
      <form onSubmit={handleSubmit} className="dialog-content">
        <div className="container">
          <h2>Autogenereret liste</h2>
          <button className="close-btn" onClick={onClose}>
            <img src={X} alt="Kryds ikon" />
          </button>
        </div>

        <div className="dialog_icons container">
          <p>Vælg ikon:</p>
          <label>
            <img
              onClick={() => {
                setChosenIcon("hiker");
                setIcon("img/icons/hiker.svg");
              }}
              src={hiker}
              alt="Rejse ikon"
              className={chosenIcon === "hiker" ? "chosen" : "unchosen"}
            />
            <img
              onClick={() => {
                setChosenIcon("house");
                setIcon("img/icons/house.svg");
              }}
              src={house}
              alt="Rejse ikon"
              className={chosenIcon === "house" ? "chosen" : "unchosen"}
            />
            <img
              onClick={() => {
                setChosenIcon("skier");
                setIcon("img/icons/skiier.svg");
              }}
              src={skier}
              alt="Rejse ikon"
              className={chosenIcon === "skier" ? "chosen" : "unchosen"}
            />
            <img
              onClick={() => {
                setChosenIcon("swimmer");
                setIcon("img/icons/swimmer.svg");
              }}
              src={swimmer}
              alt="Rejse ikon"
              className={chosenIcon === "swimmer" ? "chosen" : "unchosen"}
            />
            <img
              onClick={() => {
                setChosenIcon("tent");
                setIcon("img/icons/tent.svg");
              }}
              src={tent}
              alt="Rejse ikon"
              className={chosenIcon === "tent" ? "chosen" : "unchosen"}
            />
            <img
              onClick={() => {
                setChosenIcon("tourist");
                setIcon("img/icons/tourist.svg");
              }}
              src={tourist}
              alt="Rejse ikon"
              className={chosenIcon === "tourist" ? "chosen" : "unchosen"}
            />
          </label>
        </div>

        <div className="dialog_input_div container">
          <p>Land:</p>
          <input type="text" placeholder="Frankrig" />
        </div>

        <div className="dialog_input_div container">
          <p>By:</p>
          <input type="text" placeholder="Paris" />
        </div>

        <div className="dialog_input_div container">
          <p>Fra:</p>
          <input type="date" />
        </div>

        <div className="dialog_input_div container">
          <p>Til:</p>
          <input type="date" />
        </div>

        <div className="dialog_icons">
          <p>Angiv aktivitetsniveau:</p>

          <input type="range" />
        </div>
        <div className="message">
          <p className="error">Denne funktion virker desværre ikke.</p>
        </div>
      </form>
    </div>
  );
}
