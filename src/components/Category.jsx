import { useState } from "react";
import Check from "./Check";

export default function Category() {
   const [isExpanded, setIsExpanded] = useState(true);
   const [items, setItems] = useState([
      { id: 1, label: "Laptop 1", checked: false },
      { id: 2, label: "Laptop 2", checked: false },
      { id: 3, label: "Laptop 3", checked: false },
      { id: 4, label: "Laptop 4", checked: false },
   ]);
   const [isAdding, setIsAdding] = useState(false);
   const [newItemLabel, setNewItemLabel] = useState("");

   const handleCheckboxChange = (id) => {
      setItems((prevItems) =>
         prevItems.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
         )
      );
   };

   const handleAddItem = () => {
      if (newItemLabel.trim() === "") return;
      
      const newItem = {
         id: items.length + 1,
         label: newItemLabel,
         checked: false,
      };

      // Prepend the new item to the array
      setItems((prevItems) => [newItem, ...prevItems]);
      setNewItemLabel(""); // Clear input after adding
      setIsAdding(false); // Hide input field after adding
   };

   const totalCheckedItems = items.filter((item) => item.checked).length;
   const totalItems = items.length;

   const toggleList = () => {
      setIsExpanded((prevState) => !prevState);
   };

   return (
      <>
         <div className="category">
            <div className="category-header">
               <h2>{Category.name}</h2>
               <div>
                  <h2>{`${totalCheckedItems}/${totalItems}`}</h2>
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
                  <li key="add-item">
                     {isAdding ? (
                        <>
                           <input
                              type="text"
                              value={newItemLabel}
                              onChange={(e) => setNewItemLabel(e.target.value)}
                              placeholder="New item"
                           />
                           <button onClick={handleAddItem}>Add</button>
                        </>
                     ) : (
                        <span
                           onClick={() => setIsAdding(true)}
                           style={{ cursor: "pointer", color: "blue" }}
                        >
                           Tilføj element
                        </span>
                     )}
                  </li>
               </ul>
            )}
         </div>
         <div className="linje-moenster"></div>
      </>
   );
}
