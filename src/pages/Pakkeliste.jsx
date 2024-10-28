import { useEffect, useState } from "react";
import Category from "../components/Category";
import { useParams } from "react-router-dom";

export default function Pakkeliste() {
  const [categories, setCategories] = useState([]); // State to hold categories
  const [list, setList] = useState({ categories: [] });
  const [total, setTotal] = useState(0);
  const [totalChecked, setTotalChecked] = useState(0);
  //useParams kæder route /lists/:listId sammen med url - listId er et parameter vi har defineret
  const params = useParams();

  const addCategory = () => {
    const newCategory = { id: Date.now(), name: "New Category" }; // Create a new category with a unique ID
    setCategories([newCategory, ...categories]); // Add new category to the list
  };

  useEffect(() => {
    let totalNum = 0;
    for (const category of categories) {
      console.log(category);
      totalNum += Object.keys(category.elements).length;
    }
    setTotal(totalNum); // Add element count to total when elements change
  }, [categories]);

  useEffect(() => {
    async function getList() {
      const url = `https://beeready-8e5f5-default-rtdb.europe-west1.firebasedatabase.app/lists/${params.listId}.json`;

      const response = await fetch(url);
      const data = await response.json();
      const categoryArray = Object.keys(data.categories).map((key) => ({
        id: key,
        ...data.categories[key],
      })); // from object to array

      // const sortedArray = listsArray.sort((a, b) => {
      //   // Convert editedAt to numbers, handling cases where it's an empty string or invalid
      //   const editedAtA = Number(a.editedAt) || 0;
      //   const editedAtB = Number(b.editedAt) || 0;

      //   return editedAtA - editedAtB;
      // });
      setList(data);
      setCategories(categoryArray); // Add new category to the list
    }

    getList();
  }, [params.listId]);

  return (
    <main>
      <div className="packinglist">
        <div className="packinglist-fixed">
          <div className="packinglist-header">
            <h1>{list.name}</h1>
            <h1>
              {totalChecked} / {total}
            </h1>
          </div>
          <div className="packinglist-info">
            <h4>
              {list.dateStart} - {list.dateEnd}
            </h4>
            <button onClick={addCategory}>+ tilføj kategori</button>
          </div>
          <div className="linje-moenster"></div>
        </div>
        {/* Render categories dynamically */}
        {categories.map((category) => (
          <Category
            key={category.id}
            category={category}
            setTotalChecked={setTotalChecked}
          />
        ))}
      </div>
    </main>
  );
}
