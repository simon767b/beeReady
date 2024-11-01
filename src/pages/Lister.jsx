import { useEffect, useState } from "react";
import List from "../components/List";
import PlusButton from "../components/PlusButton";
import Sort from "../components/Sort";
import { getAuth } from "@firebase/auth";

export default function Lister() {
  const [lists, setLists] = useState([]);
  const [sortType, setSortType] = useState("Senest ændret");
  const auth = getAuth();

  useEffect(() => {
    async function getLists() {
      const url = `https://beeready-8e5f5-default-rtdb.europe-west1.firebasedatabase.app/lists.json?orderBy="uid"&equalTo="${auth?.currentUser?.uid}"`;
      const response = await fetch(url);
      const data = await response.json();
      const listsArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      })); // from object to array
      console.log(listsArray);

      /* sort after choice*/

      /* declare array */
      let sortedArray = [];

      /* look at sorting */
      if (sortType === "Senest ændret") {
        sortedArray = listsArray.sort((a, b) => a.editedAt - b.editedAt);
        console.log(sortedArray);
      } else if (sortType === "A til Å") {
        sortedArray = listsArray.sort((a, b) => {
          // First, compare the names alphabetically
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;

          // If names are the same, compare the numbers numerically
          return a.number - b.number;
        });
      } else if (sortType === "Å til A") {
        sortedArray = listsArray.sort((a, b) => {
          // First, compare the names alphabetically
          if (a.name > b.name) return -1;
          if (a.name < b.name) return 1;

          // If names are the same, compare the numbers numerically
          return b.number - a.number;
        });
      } else if (sortType === "Afrejse nyeste") {
        sortedArray = listsArray.sort((a, b) => {
          // First, compare the names alphabetically
          if (a.dateStart > b.dateStart) return -1;
          if (a.dateStart < b.dateStart) return 1;

          // If names are the same, compare the numbers numerically
          return b.number - a.number;
        });
      } else {
        sortedArray = listsArray.sort((a, b) => {
          // First, compare the names alphabetically
          if (a.dateStart < b.dateStart) return -1;
          if (a.dateStart > b.dateStart) return 1;

          // If names are the same, compare the numbers numerically
          return a.number - b.number;
        });
      }

      setLists(sortedArray);
    }

    getLists();
  }, [auth?.currentUser?.uid, sortType]);

  return (
    <>
      <main className="lister page">
        <Sort setSortType={setSortType} sortType={sortType} />
        <section className="beehive">
          {lists.length ? (
            lists.map((list) => <List props={list} key={list.id} />)
          ) : (
            <p>Du har ikke nogen lister endnu.</p>
          )}
        </section>
      </main>
      <PlusButton />
    </>
  );
}
