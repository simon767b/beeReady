import { useState } from "react";
import Category from "../components/Category";

export default function Pakkeliste() {
   const [totalCheckedCategoryItemsAdded, setTotalCheckedCategoryItemsAdded] = useState(0);
   const [totalCategoryItemsAdded, setTotalCategoryItemsAdded] = useState(0);
   const [categories, setCategories] = useState([]); // Start with an empty array

   const addCategory = () => {
      const newCategory = { id: Date.now(), name: "New Category" }; // Create a new category with a unique ID
      setCategories((prevCategories) => {
         // Add the new category
         return [newCategory, ...prevCategories];
      });
   };

   // Callback to update counts from each category
   const handleUpdateCounts = (totalCount, checkedCount) => {
      // Update the totals for checked items and total items
      setTotalCheckedCategoryItemsAdded((prev) => prev + checkedCount);
      setTotalCategoryItemsAdded((prev) => {
         // To avoid jumping counts, adjust total items only when we add new category
         return prev + (totalCount > 0 ? totalCount : 0); // Only add totalCount if it is positive
      });
   };

   return (
      <main>
         <div className="packinglist">
            <div className="packinglist-fixed">
               <div className="packinglist-header">
                  <h1>Riga</h1>
                  <h1>{`${totalCheckedCategoryItemsAdded}/${totalCategoryItemsAdded}`}</h1>
               </div>
               <div className="packinglist-info">
                  <h4>16.-23. maj 2024</h4>
                  <button onClick={addCategory}>+ tilføj kategori</button>
               </div>
               <div className="linje-moenster"></div>
            </div>
            {/* Render categories dynamically */}
            {categories.map((category) => (
               <Category 
                  key={category.id} 
                  name={category.name} 
                  onUpdateCounts={handleUpdateCounts} 
               />
            ))}
         </div>
      </main>
   );
}
