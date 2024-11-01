import { useEffect, useState } from "react";
import Check from "./Check";
import AddElementHex from "./AddElementHex";
import { useParams } from "react-router-dom";

import arrow from "../assets/img/icons/sort_arrow.svg";
import deleteicon from "../assets/img/icons/delete.svg";

export default function Category({
  category,
  setTotalChecked,
  total,
  setTotal,
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [name, setName] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false); // Track input field visibility
  const [isAddingElement, setIsAddingElement] = useState(false); // Track if we are adding an element
  const [elements, setElements] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryNameActive, setCategoryNameActive] = useState(true);
  const params = useParams();

  async function updateIsChecked(element) {
    const url = `https://beeready-8e5f5-default-rtdb.europe-west1.firebasedatabase.app/lists/${params.listId}/categories/${category.id}/elements/${element.id}/isChecked.json`;
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(!element.isChecked),
    });
    if (response.ok) {
      const data = await response.json();
      setIsChecked(!isChecked);
      console.log("isChecked updated", data);
    } else {
      console.log(name, isChecked, "Sorry, something went wrong");
    }
  }

  async function handleUpdateCategoryName() {
    // Only proceed if categoryName is non-empty
    if (!categoryName.trim()) {
      console.log("Category name is empty, not updating.");
      return;
    } //Another possible solution: if(categoryName !== category.name) / const [categoryName, setCategoryName] = useState(category.name || ""); / const [categoryNameActive, setCategoryNameActive] = useState(false);

    const url = `https://beeready-8e5f5-default-rtdb.europe-west1.firebasedatabase.app/lists/${params.listId}/categories/${category.id}/name.json`;
    setCategoryNameActive(false);
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(categoryName),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Category name updated: ", data);
    } else {
      console.log("Sorry, something went wrong");
    }
  }

  useEffect(() => {
    if (category.name) {
      setCategoryNameActive(false);
      setCategoryName(category.name);
    } else if (category.name === "") {
      // setCategoryNameActive(false);
      setCategoryName("Intet navn");
      console.log("Der skete en fejl med den tomme string");
    } else {
      // setCategoryName("Intet navn");
      console.log("Der skete en fejl");
    }
  }, [category.name]);

  function handleCheckboxChange(element) {
    // Update the totalChecked state
    if (element.isChecked) {
      setTotalChecked((prevTotalChecked) => prevTotalChecked - 1); // Decrement totalChecked
    } else {
      setTotalChecked((prevTotalChecked) => prevTotalChecked + 1); // Increment totalChecked
    }

    // Update the isChecked state of the element
    setElements((prevElements) =>
      prevElements.map((elm) =>
        elm.id === element.id ? { ...elm, isChecked: !elm.isChecked } : elm
      )
    );
    updateIsChecked(element);
  }

  async function createElement(newElement) {
    const url = `https://beeready-8e5f5-default-rtdb.europe-west1.firebasedatabase.app/lists/${params.listId}/categories/${category.id}/elements.json`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newElement),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("New element created: ", data);
      return data.name;
    } else {
      console.log(name, isChecked, "Sorry, something went wrong");
    }
  }

  // Add a new element to the list when input loses focus
  const addElement = async () => {
    setName("");
    const newElement = {
      name: name,
      isChecked: isChecked,
    };
    const id = await createElement(newElement);
    newElement.id = id;
    setElements((prevElements) => [
      ...prevElements.slice(0, prevElements.length - 1), // Exclude "Tilføj element"
      newElement,
      prevElements[prevElements.length - 1], // Add "Tilføj element" back at the end
    ]);
    setIsInputVisible(false); // Hide the input field after adding the element
    setIsAddingElement(false); // Reset adding element state
    setTotal(total + 1);
  };

  const handleEnterOnElement = (event) => {
    if (event.key === "Enter") {
      addElement();
    }
  };

  const handleEnterOnCategoryName = (event) => {
    if (event.key === "Enter") {
      handleUpdateCategoryName();
    }
  };

  // Show input field when "Tilføj element" is clicked
  const showInputField = () => {
    setIsInputVisible(true);
    setIsAddingElement(true); // Set adding element state to true
  };

  const totalCheckedElements = elements.filter(
    (element) => element?.isChecked
  ).length;
  const totalElements = elements.length; // Assuming the last element is "Tilføj element"

  const toggleList = () => {
    setIsExpanded((prevState) => !prevState);
  };

  //map through a specific category's elements
  useEffect(() => {
    async function getElements() {
      const elementsArray = Object.keys(category.elements).map((key) => ({
        id: key,
        ...category.elements[key],
      })); // from object to array

      // const sortedArray = listsArray.sort((a, b) => {
      //   // Convert editedAt to numbers, handling cases where it's an empty string or invalid
      //   const editedAtA = Number(a.editedAt) || 0;
      //   const editedAtB = Number(b.editedAt) || 0;

      //   return editedAtA - editedAtB;
      // });
      setElements(elementsArray); // Add new category to the list
    }
    if (category.elements) {
      getElements();
    }
  }, [category]);

  async function deleteCategory(itemToBeDeleted) {
    console.log("Delete category", itemToBeDeleted);
    const url = `https://beeready-8e5f5-default-rtdb.europe-west1.firebasedatabase.app/lists/${params.listId}/categories/${itemToBeDeleted.id}.json`;

    const confirmDelete = window.confirm(
      `Vil du slette kategorien: ${itemToBeDeleted.name}?`
    );
    if (confirmDelete) {
      const response = await fetch(url, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Category deleted");
        location.reload();
      } else {
        console.log("Sorry, something went wrong");
      }
    }
  }

  async function deleteElement(itemToBeDeleted) {
    console.log("Delete element", itemToBeDeleted);
    const url = `https://beeready-8e5f5-default-rtdb.europe-west1.firebasedatabase.app/lists/${params.listId}/categories/${category.id}/elements/${itemToBeDeleted.id}.json`;

    const confirmDelete = window.confirm(
      `Vil du slette elementet: ${itemToBeDeleted.name}?`
    );
    if (confirmDelete) {
      const response = await fetch(url, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Element deleted");
        location.reload();
      } else {
        console.log("Sorry, something went wrong");
      }
    }
  }

  return (
    <>
      <div className="category">
        <div className="category-header">
          {categoryNameActive ? (
            <input
              // style={{
              //   display: isAddingElement ? "block" : "none", // Change display based on isAddingElement
              // }}
              className="input-category"
              type="text"
              placeholder="Tilføj kategorinavn"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              onBlur={handleUpdateCategoryName} // Submit when user clicks away
              onKeyDown={handleEnterOnCategoryName} // Submit when user presses enter
              autoFocus // Automatically focus on the input field when it's shown
            />
          ) : (
            <h2 onClick={() => setCategoryNameActive(true)}> {categoryName}</h2>
          )}

          {/* Or you can replace with dynamic category name */}
          <div>
            <h2>{`${totalCheckedElements}/${totalElements}`}</h2>
            <img
              src={arrow}
              alt="Toggle list"
              onClick={toggleList}
              style={{
                transform: isExpanded ? "rotate(360deg)" : "rotate(270deg)",
                transition: "transform 0.5s",
                cursor: "pointer",
              }}
            />
            <img
              src={deleteicon}
              alt="delete icon"
              onClick={() => {
                deleteCategory(category);
              }}
            />
          </div>
        </div>
        {isExpanded && (
          <ul style={{ transition: "transform 0.5s" }}>
            {elements.map((element) => (
              <li key={element.id}>
                {element.name !== "Tilføj element" && (
                  <>
                    <Check
                      checked={element.isChecked}
                      onChange={() => handleCheckboxChange(element)}
                    />
                    {element.name}
                    <img
                      src={deleteicon}
                      alt="delete icon"
                      onClick={() => {
                        deleteElement(element);
                      }}
                    />
                  </>
                )}
              </li>
            ))}

            {/* Conditionally render input field only when isInputVisible is true */}
            {isInputVisible && (
              <li key="input-field">
                <Check />
                <input
                  style={{
                    display: isAddingElement ? "block" : "none", // Change display based on isAddingElement
                  }}
                  className="input-category"
                  type="text"
                  placeholder="Add new element"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={addElement} // Submit when user clicks away
                  onKeyDown={handleEnterOnElement} // Submit when user presses enter
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
