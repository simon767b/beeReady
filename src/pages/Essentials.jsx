// LAVET AF ANDREA

import { useState } from "react";
import CategoryEssentials from "../components/CategoryEssentials";

export default function Pakkeliste() {
  const [categories, setCategories] = useState([1]); // State to hold categories

  const addCategory = () => {
    const newCategory = { id: Date.now(), name: "New Category" }; // Create a new category with a unique ID
    setCategories([newCategory, ...categories]); // Add new category to the list
  };

  return (
    <main>
      <div className="packinglist essentials">
        <div className="packinglist-fixed">
          <div className="packinglist-header packinglist-info">
            <h1>Essentials</h1>
            <button onClick={addCategory}>+ tilføj kategori</button>
          </div>
          <div className="packinglist-info"></div>
          <div className="linje-moenster"></div>
        </div>
        {/* Render categories dynamically */}
        {categories.map((category) => (
          <CategoryEssentials key={category.id} name={category.name} />
        ))}
      </div>
    </main>
  );
}
