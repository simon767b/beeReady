import { useNavigate } from "react-router-dom";
import { auth } from "../pages/firebase-config";
import { useEffect, useState } from "react";

export default function Manual({ isOpen, onClose }) {
   const navigate = useNavigate();

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
         formData.icon &&
         formData.name &&
         formData.dateStart &&
         formData.dateEnd; // will return false if one of the properties doesn't have a value

      if (validForm && formData.dateStart <= formData.dateEnd) {
         // if all fields/ properties are filled, then call createList
         createList(formData);
         setErrorMessage("");
         navigate("/bruger");
         // navigate(`/lists/${list.id}`)
      } else if (formData.dateStart > formData.dateEnd) {
         setErrorMessage("Afrejsedato skal være før hjemrejsedato.");
      } else {
         setErrorMessage("Venligst udfyld alle felter.");
      }
   }

   return (
      <div
         className={"dialog-overlay"}
         style={{
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? "all" : "none",
         }}>
         <form
            onSubmit={handleSubmit}
            className="dialog-content"
            // onClick={(e) => e.stopPropagation()}
         >
            <div>
               <h2>Manuel Liste</h2>
               <button type="button" className="close-btn" onClick={onClose}>
                  <img src="/img/icons/x.svg" alt="Kryds ikon" />
               </button>
            </div>

            <div className="dialog_ikons">
               <p>Vælg ikon:</p>
               <label>
                  <img
                     onClick={() => {
                        setChosenIcon("hiker");
                        setIcon("/img/icons/hiker.svg");
                     }}
                     src="/img/icons/hiker.svg"
                     alt="Rejse ikon"
                     className={chosenIcon === "hiker" ? "chosen" : "unchosen"}
                  />
                  <img
                     onClick={() => {
                        setChosenIcon("house");
                        setIcon("/img/icons/house.svg");
                     }}
                     src="/img/icons/house.svg"
                     alt="Rejse ikon"
                     className={chosenIcon === "house" ? "chosen" : "unchosen"}
                  />
                  <img
                     onClick={() => {
                        setChosenIcon("skier");
                        setIcon("/img/icons/skiier.svg");
                     }}
                     src="/img/icons/skiier.svg"
                     alt="Rejse ikon"
                     className={chosenIcon === "skier" ? "chosen" : "unchosen"}
                  />
                  <img
                     onClick={() => {
                        setChosenIcon("swimmer");
                        setIcon("/img/icons/swimmer.svg");
                     }}
                     src="/img/icons/swimmer.svg"
                     alt="Rejse ikon"
                     className={
                        chosenIcon === "swimmer" ? "chosen" : "unchosen"
                     }
                  />
                  <img
                     onClick={() => {
                        setChosenIcon("tent");
                        setIcon("/img/icons/tent.svg");
                     }}
                     src="/img/icons/tent.svg"
                     alt="Rejse ikon"
                     className={chosenIcon === "tent" ? "chosen" : "unchosen"}
                  />
                  <img
                     onClick={() => {
                        setChosenIcon("tourist");
                        setIcon("/img/icons/tourist.svg");
                     }}
                     src="/img/icons/tourist.svg"
                     alt="Rejse ikon"
                     className={
                        chosenIcon === "tourist" ? "chosen" : "unchosen"
                     }
                  />
               </label>
            </div>

            <div className="dialog_input_div">
               <p>Navn:</p>
               <input
                  type="text"
                  placeholder="Angiv listens navn"
                  name="name"
                  value={name}
                  aria-label="Listens navn"
                  onChange={(e) => setName(e.target.value)}
               />
            </div>

            <div className="dialog_input_div">
               <p>Fra:</p>
               <input
                  type="date"
                  name="dateStart"
                  value={dateStart}
                  aria-label="Listens afrejsedato"
                  onChange={(e) => setDateStart(e.target.value)}
               />
            </div>

            <div className="dialog_input_div">
               <p>Til:</p>
               <input
                  type="date"
                  name="dateEnd"
                  value={dateEnd}
                  aria-label="Listens hjemrejsedato"
                  onChange={(e) => setDateEnd(e.target.value)}
               />
            </div>

            <p className="error message">{errorMessage}</p>

            <button className="opret-btn">Opret liste</button>
         </form>
      </div>
   );
}
