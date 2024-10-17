import { useState, useEffect, useRef } from "react";
import Check from "./Check";

export default function Category() {
   // Fold kategorier ud
   const [isExpanded, setIsExpanded] = useState(true); // State to track whether the list is expanded

   const toggleList = () => {
      setIsExpanded((prevState) => !prevState); // Toggle state on image click
   };

   // Antal elementer i hver kategori
   const [totalItems, setTotalItems] = useState(0); // State to store total number of list items
   const ulRef = useRef(null); // Reference for the specific ul element

   useEffect(() => {
      // Calculate total items dynamically when the component is mounted
      if (ulRef.current) {
         const totalListItems = ulRef.current.querySelectorAll("li").length; // Scope to the ul within this component
         setTotalItems(totalListItems);
      }
   }, []); // Recalculate when the list is expanded or collapsed

   // Antal checked elementer i hver kategori
   const [items, setItems] = useState([
      { id: 1, label: 'Laptop 1', checked: false },
      { id: 2, label: 'Laptop 2', checked: false },
      { id: 3, label: 'Laptop 3', checked: false },
      { id: 4, label: 'Laptop 4', checked: false },
      { id: 5, label: 'Tilføj element', checked: false },
   ]); // State to store each item and its checked state

   const totalCheckedItems = items.filter(item => item.checked).length; // Count of checked items

   const handleCheckboxChange = (id) => {
      setItems(prevItems =>
         prevItems.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
         )
      ); // Toggle the checked state of the item
   };

   return (
      <>
         <div className="category">
            <div className="category-header">
               <h2>Elektronik</h2>
               <div>
                  <h2>{`${totalCheckedItems}/${totalItems}`}</h2>
                  {/* Click on image to toggle the list */}
                  <img
                     src="img/icons/down-arrow.svg"
                     alt="Toggle list"
                     onClick={toggleList}
                     style={{
                        transform: isExpanded
                           ? "rotate(360deg)"
                           : "rotate(270deg)", // Rotate arrow if expanded
                        transition: "transform 0.5s", // Smooth transition
                        cursor: "pointer", // Show pointer on hover
                     }}
                  />
               </div>
            </div>
            {/* Conditionally render the <ul> based on isExpanded state */}
            {isExpanded && (
               <ul ref={ulRef}>
                  {items.map(item => (
                     <li key={item.id}>
                        <Check
                           checked={item.checked}
                           onChange={() => handleCheckboxChange(item.id)}
                        />
                        {item.label}
                     </li>
                  ))}
               </ul>
            )}
         </div>
         <div className="linje-moenster"></div>
      </>
   );
}
