import { useState } from "react";
import Category from "../components/Category";

export default function Pakkeliste() {
  const [categories, setCategories] = useState([1]); // State to hold categories

  const addCategory = () => {
    const newCategory = { id: Date.now(), name: "New Category" }; // Create a new category with a unique ID
    setCategories([newCategory, ...categories]); // Add new category to the list
  };

  return (
    <main>
      <div className="packinglist">
        <div className="packinglist-fixed">
          <div className="packinglist-header">
            <h1>Riga</h1>
            <h1>
              0/0
              {/*`${totalCheckedCategoryItemsAdded}/${totalCategoryItemsAdded}`*/}
            </h1>
          </div>
          <div className="packinglist-info">
            <h4>16.-23. maj 2024</h4>
            <button onClick={addCategory}>+ tilføj kategori</button>
          </div>
          <div className="linje-moenster"></div>
        </div>
        {/* Render categories dynamically */}
        {categories.map((category) => (
          <Category key={category.id} name={category.name} />
        ))}
      </div>
    </main>
  );
}
