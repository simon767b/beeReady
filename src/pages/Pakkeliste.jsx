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

  async function handleAddCategory() {
    const newCategory = { name: "New Category" };
    const id = await createCategory(newCategory);
    newCategory.id = id;
    setCategories([newCategory, ...categories]); // Add new category to the list
  }

  async function createCategory(newCategory) {
    const url = `https://beeready-8e5f5-default-rtdb.europe-west1.firebasedatabase.app/lists/${params.listId}/categories.json`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newCategory)
    });
    if (response.ok) {
      const data = await response.json();
      console.log("New category created: ", data);
      return data.name;
    } else {
      console.log("Sorry, something went wrong");
    }
  }

  useEffect(() => {
    let totalNum = 0;
    for (const category of categories) {
      console.log(category);
      if (category?.elements) {
        totalNum += Object.keys(category.elements).length;
      }
    }
    setTotal(totalNum); // Add element count to total when elements change
  }, [categories]);

  useEffect(() => {
    async function getList() {
      const url = `https://beeready-8e5f5-default-rtdb.europe-west1.firebasedatabase.app/lists/${params.listId}.json`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      // Convert object to array of categories with id as key for each category
      if (data.categories) {
        const categoryArray = Object.keys(data?.categories).map(key => ({
          id: key,
          ...data?.categories[key]
        })); // from object to array
        setCategories(categoryArray); // Add new category to the list
      }
      // const sortedArray = listsArray.sort((a, b) => {
      //   // Convert editedAt to numbers, handling cases where it's an empty string or invalid
      //   const editedAtA = Number(a.editedAt) || 0;
      //   const editedAtB = Number(b.editedAt) || 0;

      //   return editedAtA - editedAtB;
      // });
      setList(data);
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
            <button onClick={handleAddCategory}>+ tilføj kategori</button>
          </div>
          <div className="linje-moenster"></div>
        </div>
        {/* Render categories dynamically */}
        {categories.map(category => (
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
