import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Notes() {
  const [notes, setNotes] = useState("notes");
  const [notesActive, setNotesActive] = useState(false);
  const params = useParams();

  /* get notes*/
  useEffect(() => {
    async function getNotes() {
      const url = `https://beeready-8e5f5-default-rtdb.europe-west1.firebasedatabase.app/lists/${params.listId}/notes.json`;

      const response = await fetch(url);
      const notes = await response.json();
      console.log(notes);
      // const sortedArray = listsArray.sort((a, b) => {
      //   // Convert editedAt to numbers, handling cases where it's an empty string or invalid
      //   const editedAtA = Number(a.editedAt) || 0;
      //   const editedAtB = Number(b.editedAt) || 0;

      //   return editedAtA - editedAtB;
      // });
      setNotes(notes);
    }

    getNotes(notes);
  }, [params.listId]);

  /* update notes to database*/
  async function updateNotes(notes) {
    const url = `https://beeready-8e5f5-default-rtdb.europe-west1.firebasedatabase.app/lists/${params.listId}/notes.json`;
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(notes),
    });
    if (response.ok) {
      const data = await response.json();
      setNotes(data);
      console.log("isChecked updated", data);
    } else {
      console.log("Sorry, something went wrong");
    }
  }
  return (
    <>
      <div className="category">
        <div className="category-header">
          <h2>Noter</h2>
          {notesActive ? (
            <button
              onClick={() => {
                updateNotes(notes), setNotesActive(!notesActive);
              }}
              style={{ backgroundColor: "var(--color8)" }}
            >
              Gem noter
            </button>
          ) : (
            <button
              onClick={() => {
                setNotesActive(!notesActive);
              }}
              style={{ backgroundColor: "var(--color8)" }}
            >
              Rediger noter
            </button>
          )}
        </div>
        {notesActive ? (
          <textarea
            style={{
              width: "100%",
              padding: "10px",
              height: "100px",
            }}
            value={notes ? notes : ""}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="- Tjek om pas er gyldigt"
          ></textarea>
        ) : (
          <p>{notes ? notes : "Tryk for at skrive noter"}</p>
        )}
      </div>
    </>
  );
}
