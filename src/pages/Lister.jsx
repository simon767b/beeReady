import { useEffect, useState } from "react";
import List from "../components/List";
import PlusButton from "../components/PlusButton";
import Sort from "../components/Sort";

export default function Lister({ uid }) {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    async function getLists() {
      const url = `https://beeready-8e5f5-default-rtdb.europe-west1.firebasedatabase.app/lists.json?orderBy="uid"&equalTo="${uid}"`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const listsArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      })); // from object to array
      setLists(listsArray);
    }
    if (uid) {
      getLists();
    }
  }, [uid]);

  return (
    <>
      <main className="lister page">
        <Sort />
        <section className="beehive">
          {lists.length ? (
            lists.map((list) => <List props={list} key={list.id} />)
          ) : (
            <p>Du har ikke nogen lister endnu.</p>
          )}
          <PlusButton />
        </section>
      </main>
    </>
  );
}
