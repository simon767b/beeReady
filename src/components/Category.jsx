import { useEffect, useState } from "react";
import Check from "./Check";
import AddElementHex from "./AddElementHex";
import { useParams } from "react-router-dom";

import arrow from "../assets/img/icons/sort_arrow.svg";

export default function Category({ category, setTotalChecked }) {
   const [isExpanded, setIsExpanded] = useState(true);
   const [name, setName] = useState("");
   const [isChecked, setIsChecked] = useState(false);
   const [isInputVisible, setIsInputVisible] = useState(false); // Track input field visibility
   const [isAddingElement, setIsAddingElement] = useState(false); // Track if we are adding an element
   const [elements, setElements] = useState([]);
   const params = useParams();

  // useEffect(() => {
  //   const checkedNum = elements.filter(element => element.isChecked).length;
  //   console.log("Checked elements: ", checkedNum);
  //   console.log("Total checked elements: ", totalChecked);

  //   setTotalChecked(checkedNum);
  // }, [elements]);

  // Handle checkbox toggle
  // const handleCheckboxChange = id => {

  //   setElements(prevElements =>
  //     prevElements.map(element =>
  //       element.id === id
  //         ? { ...element, isChecked: !element.isChecked }
  //         : element
  //     )
  //   );
  // };

  function handleCheckboxChange(element) {
    // Update the totalChecked state
    if (element.isChecked) {
      setTotalChecked(prevTotalChecked => prevTotalChecked - 1); // Decrement totalChecked
    } else {
      setTotalChecked(prevTotalChecked => prevTotalChecked + 1); // Increment totalChecked
    }

    // Update the isChecked state of the element
    setElements(prevElements =>
      prevElements.map(elm =>
        elm.id === element.id ? { ...elm, isChecked: !elm.isChecked } : elm
      )
    );
  }

  async function createElement(newElement) {
    const url = `https://beeready-8e5f5-default-rtdb.europe-west1.firebasedatabase.app/lists/${params.listId}/categories/${category.id}/elements.json`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newElement)
    });
    if (response.ok) {
      const data = await response.json();
      console.log("New element created: ", data);
    } else {
      console.log(name, isChecked, "Sorry, something went wrong");
    }
  }

  // Add a new element to the list when input loses focus
  const addElement = () => {
    if (name.trim() === "") {
      setIsInputVisible(false); // Hide the input field if no element was added
      setIsAddingElement(false); // Reset adding element state
      return;
    }
    const newElement = {
      // id: elements.length + 1, // Assign a new ID
      name: name,
      isChecked: isChecked
    };
    setElements(prevElements => [
      ...prevElements.slice(0, prevElements.length - 1), // Exclude "Tilføj element"
      newElement,
      prevElements[prevElements.length - 1] // Add "Tilføj element" back at the end
    ]);
    setIsInputVisible(false); // Hide the input field after adding the element
    setIsAddingElement(false); // Reset adding element state
    createElement(newElement);
  };

   // Show input field when "Tilføj element" is clicked
   const showInputField = () => {
      setIsInputVisible(true);
      setIsAddingElement(true); // Set adding element state to true
   };

  const totalCheckedElements = elements.filter(
    element => element.isChecked
  ).length;
  const totalElements = elements.length; // Assuming the last element is "Tilføj element"

  const toggleList = () => {
    setIsExpanded(prevState => !prevState);
  };

  //map through a specific category's elements
  useEffect(() => {
    async function getElements() {
      const elementsArray = Object.keys(category.elements).map(key => ({
        id: key,
        ...category.elements[key]
      })); // from object to array

         // const sortedArray = listsArray.sort((a, b) => {
         //   // Convert editedAt to numbers, handling cases where it's an empty string or invalid
         //   const editedAtA = Number(a.editedAt) || 0;
         //   const editedAtB = Number(b.editedAt) || 0;

         //   return editedAtA - editedAtB;
         // });
         setElements(elementsArray); // Add new category to the list
      }

      getElements();
   }, [category]);

  return (
    <>
      <div className="category">
        <div className="category-header">
          <h2>{category.name}</h2>{" "}
          {/* Or you can replace with dynamic category name */}
          <div>
            <h2>{`${totalCheckedElements}/${totalElements}`}</h2>
            <img
              src="/img/icons/sort_arrow.svg"
              alt="Toggle list"
              onClick={toggleList}
              style={{
                transform: isExpanded ? "rotate(360deg)" : "rotate(270deg)",
                transition: "transform 0.5s",
                cursor: "pointer"
              }}
            />
          </div>
        </div>
        {isExpanded && (
          <ul style={{ transition: "transform 0.5s" }}>
            {elements.map(element => (
              <li key={element.id}>
                {element.name !== "Tilføj element" && (
                  <>
                    <Check
                      checked={element.isChecked}
                      onChange={() => handleCheckboxChange(element)}
                    />
                    {element.name}
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
                    display: isAddingElement ? "block" : "none" // Change display based on isAddingElement
                  }}
                  className="input-category"
                  type="text"
                  placeholder="Add new element"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onBlur={addElement} // Submit when user clicks away
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
