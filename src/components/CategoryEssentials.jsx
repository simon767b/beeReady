import { useState } from "react";
import CheckEssentials from "./CheckEssentials";
import AddElementHex from "./AddElementHex";

import arrow from "../assets/img/icons/sort_arrow.svg";

export default function Category() {
   const [isExpanded, setIsExpanded] = useState(true);
   const [newItemLabel, setNewItemLabel] = useState(""); // Track the new item label
   const [isInputVisible, setIsInputVisible] = useState(false); // Track input field visibility
   const [isAddingItem, setIsAddingItem] = useState(false); // Track if we are adding an item
   const [items, setItems] = useState([
      { id: 1, label: "Laptop 1", checked: false },
      { id: 2, label: "Laptop 2", checked: false },
      { id: 3, label: "Laptop 3", checked: false },
      { id: 4, label: "Laptop 4", checked: false },
      { id: 5, label: "Tilføj element", checked: false }, // This is the "Add item" button
   ]);

   // Handle checkbox toggle
   const handleCheckboxChange = (id) => {
      setItems((prevItems) =>
         prevItems.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
         )
      );
   };

   // Add a new item to the list when input loses focus
   const addItem = () => {
      if (newItemLabel.trim() === "") {
         setIsInputVisible(false); // Hide the input field if no item was added
         setIsAddingItem(false); // Reset adding item state
         return;
      }
      const newItem = {
         id: items.length + 1, // Assign a new ID
         label: newItemLabel,
         checked: false,
      };
      setItems((prevItems) => [
         ...prevItems.slice(0, prevItems.length - 1), // Exclude "Tilføj element"
         newItem,
         prevItems[prevItems.length - 1], // Add "Tilføj element" back at the end
      ]);
      setNewItemLabel(""); // Clear the input field after adding
      setIsInputVisible(false); // Hide the input field after adding the item
      setIsAddingItem(false); // Reset adding item state
   };

   // Show input field when "Tilføj element" is clicked
   const showInputField = () => {
      setIsInputVisible(true);
      setIsAddingItem(true); // Set adding item state to true
   };

   const totalItems = items.length - 1; // Assuming the last item is "Tilføj element"

   const toggleList = () => {
      setIsExpanded((prevState) => !prevState);
   };

   return (
      <>
         <div className="category">
            <div className="category-header">
               <h2>Category</h2>{" "}
               {/* Or you can replace with dynamic category name */}
               <div>
                  <h2>{`${totalItems}`}</h2>
                  <img
                     src={arrow}
                     alt="Toggle list"
                     onClick={toggleList}
                     style={{
                        transform: isExpanded
                           ? "rotate(360deg)"
                           : "rotate(270deg)",
                        transition: "transform 0.5s",
                        cursor: "pointer",
                     }}
                  />
               </div>
            </div>
            {isExpanded && (
               <ul style={{ transition: "transform 0.5s" }}>
                  {items.map((item) => (
                     <li key={item.id}>
                        {item.label !== "Tilføj element" && (
                           <>
                              <CheckEssentials
                                 checked={item.checked}
                                 onChange={() => handleCheckboxChange(item.id)}
                              />
                              {item.label}
                           </>
                        )}
                     </li>
                  ))}

                  {/* Conditionally render input field only when isInputVisible is true */}
                  {isInputVisible && (
                     <li key="input-field">
                        <CheckEssentials />
                        <input
                           style={{
                              display: isAddingItem ? "block" : "none", // Change display based on isAddingItem
                           }}
                           className="input-category"
                           type="text"
                           placeholder="Add new item"
                           value={newItemLabel}
                           onChange={(e) => setNewItemLabel(e.target.value)}
                           onBlur={addItem} // Submit when user clicks away
                           autoFocus // Automatically focus on the input field when it's shown
                        />
                     </li>
                  )}

                  {/* Always show "Tilføj element" button in its own line */}
                  <li
                     onClick={showInputField}
                     key="tilfoj-element" // Ensure a key is present
                  >
                     <AddElementHex /> Tilføj element
                  </li>
               </ul>
            )}
         </div>
         <div className="linje-moenster"></div>
      </>
   );
}
