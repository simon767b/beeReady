import { useState, useEffect } from "react";
import Check from "./Check";

export default function Category({ id, name, onUpdateCounts }) {
   const [isExpanded, setIsExpanded] = useState(true);
   const [items, setItems] = useState([
      { id: 1, label: "Laptop 1", checked: false },
      { id: 2, label: "Laptop 2", checked: false },
      { id: 3, label: "Laptop 3", checked: false },
      { id: 4, label: "Laptop 4", checked: false },
      { id: 5, label: "Tilføj element", checked: false },
   ]);

   // Load checked state from localStorage on mount
   useEffect(() => {
      const savedItems = JSON.parse(localStorage.getItem(`category-${id}`)) || [];
      if (savedItems.length > 0) {
         setItems(savedItems);
      }
      updateCounts(savedItems.length > 0 ? savedItems : items); // Update counts based on loaded items
   }, []);

   // Update counts whenever items change
   useEffect(() => {
      updateCounts(items);
   }, [items]);

   const toggleList = () => {
      setIsExpanded((prevState) => !prevState);
   };

   const handleCheckboxChange = (id) => {
      setItems((prevItems) => {
         const updatedItems = prevItems.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
         );

         // Save updated items to localStorage
         localStorage.setItem(`category-${id}`, JSON.stringify(updatedItems));
         return updatedItems;
      });
   };

   const updateCounts = (updatedItems) => {
      const totalItems = updatedItems.length - 1; // Exclude "Tilføj element"
      const totalCheckedItems = updatedItems.filter((item) => item.checked).length;

      // Notify parent component with the current counts
      onUpdateCounts(totalItems, totalCheckedItems);
   };

   return (
      <>
         <div className="category">
            <div className="category-header">
               <h2>{name}</h2>
               <div>
                  <h2>{`${items.filter((item) => item.checked).length}/${items.length - 1}`}</h2>
                  <img
                     src="img/icons/down-arrow.svg"
                     alt="Toggle list"
                     onClick={toggleList}
                     style={{
                        transform: isExpanded ? "rotate(360deg)" : "rotate(270deg)",
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
