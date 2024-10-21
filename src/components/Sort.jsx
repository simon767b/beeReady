import { useState } from "react";
import Check from "./Check";

export default function Sort() {
  //sort dropdown inspired from https://www.youtube.com/watch?v=gAGcjlJyKk0

  // to change classes
  const [sortArrowClass, setSortArrowClass] = useState("sort_arrow unclicked");
  const [sortDropdownClass, setSortDropdownClass] = useState(
    "sort_dropdown hidden"
  );
  const [isSortClicked, setIsSortClicked] = useState(false);

  // toggle btn change
  const showSorting = () => {
    if (!isSortClicked) {
      setSortArrowClass("sort_arrow clicked");
      setSortDropdownClass("sort_dropdown visible");
    } else {
      setSortArrowClass("sort_arrow unclicked");
      setSortDropdownClass("sort_dropdown hidden");
    }
    setIsSortClicked(!isSortClicked);
  };
  return (
    <section className="search_sort_container">
      <form className="search_sort_bar">
        <div className="search_bar">
          <img className="search" src="img\icons\search.svg" alt="Søg ikon" />
          <input type="search" placeholder="Søg" />
        </div>
        <button type="button" className="sort_btn" onClick={showSorting}>
          Sortér{" "}
          <img
            className={sortArrowClass}
            src="img\icons\sort_arrow.svg"
            alt="drop-down pil"
          />
          <section className={sortDropdownClass}>
            <div className="option">
              <Check />
              <p>Senest ændret</p>
            </div>
            <div className="option">
              <Check />
              <p>A til Å</p>
            </div>
            <div className="option">
              <Check />
              <p>Å til A</p>
            </div>
            <div className="option">
              <Check />
              <p>Afrejse (nyeste)</p>
            </div>
            <div className="option">
              <Check />
              <p>Afrejse (ældste)</p>
            </div>
          </section>
        </button>
      </form>
    </section>
  );
}
