import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Category from "../components/Category";
import Notes from "../components/Notes";
import deleteicon from "../assets/img/icons/delete.svg";

export default function Pakkeliste() {
  const [categories, setCategories] = useState([]); // State to hold categories
  const [list, setList] = useState({ categories: [] });
  const [total, setTotal] = useState(0);
  const [totalChecked, setTotalChecked] = useState(0);
  const navigate = useNavigate();
  //useParams kæder route /lists/:listId sammen med url - listId er et parameter vi har defineret
  const params = useParams();

  async function handleAddCategory() {
    const newCategory = { name: "" };
    const id = await createCategory(newCategory);
    newCategory.id = id;
    setCategories([newCategory, ...categories]); // Add new category to the list
  }

  async function createCategory(newCategory) {
    const url = `https://beeready-8e5f5-default-rtdb.europe-west1.firebasedatabase.app/lists/${params.listId}/categories.json`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newCategory),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("New category created: ", data);
      return data.name;
    } else {
      console.log("Sorry, something went wrong");
    }
  }

  // total elements in all categories number
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

  // total checked elements in all categories number
  useEffect(() => {
    let totalCheckedNum = 0; //counter for checked elements
    for (const category of categories) {
      //loop through categories
      if (category?.elements) {
        //check if category has elements
        for (const element of Object.values(category.elements)) {
          //loop through elements
          if (element.isChecked) {
            //check if element is checked
            totalCheckedNum++;
          }
        }
      }
    }
    setTotalChecked(totalCheckedNum);
  }, [categories]);

  useEffect(() => {
    async function getList() {
      const url = `https://beeready-8e5f5-default-rtdb.europe-west1.firebasedatabase.app/lists/${params.listId}.json`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      // Convert object to array of categories with id as key for each category
      if (data.categories) {
        const categoryArray = Object.keys(data?.categories).map((key) => ({
          id: key,
          ...data?.categories[key],
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

  async function deleteList(itemToBeDeleted) {
    console.log("Delete list", itemToBeDeleted);
    const url = `https://beeready-8e5f5-default-rtdb.europe-west1.firebasedatabase.app/lists/${params.listId}.json`;

    const confirmDelete = window.confirm(
      `Vil du slette listen: ${itemToBeDeleted.name}?`
    );
    if (confirmDelete) {
      const response = await fetch(url, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("List deleted");
        navigate("/");
      } else {
        console.log("Sorry, something went wrong");
      }
    }
  }

  return (
    <main>
      <div className="packinglist">
        <div className="packinglist-fixed">
          <div className="packinglist-header">
            <h1>{list.name}</h1>
            <h1>
              {totalChecked} / {total}
            </h1>
            <img
              src={deleteicon}
              alt="delete icon"
              onClick={() => {
                deleteList(list);
              }}
            />
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
        {categories.map((category) => (
          <Category
            key={category.id}
            category={category}
            setTotalChecked={setTotalChecked}
            total={total}
            setTotal={setTotal}
          />
        ))}
        <Notes></Notes>
      </div>
    </main>
  );
}
