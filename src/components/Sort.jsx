// LAVET AF INGER-MARGRETHE
// SORTERING- OG SØGE-FUNKTIONALITET AF SIMON

import { useState } from "react";
import RadioHex from "./RadioHex";

import search from "../assets/img/icons/search.svg";
import arrow from "../assets/img/icons/sort_arrow.svg";

export default function Sort({
  sortType,
  setSortType,
  setSearchQuery,
  searchQuery,
}) {
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
          <img className="search" src={search} alt="Søg ikon" />
          <input
            type="search"
            placeholder="Søg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button type="button" className="sort_btn" onClick={showSorting}>
          Sortér{" "}
          <img className={sortArrowClass} src={arrow} alt="drop-down pil" />
          <section className={sortDropdownClass}>
            <label className="option">
              <RadioHex
                name={"Senest ændret"}
                sortType={sortType}
                setSortType={setSortType}
              />
              <p>Senest ændret</p>
            </label>
            <label className="option">
              <RadioHex
                name={"A til Å"}
                sortType={sortType}
                setSortType={setSortType}
              />
              <p>A til Å</p>
            </label>
            <label className="option">
              <RadioHex
                name={"Å til A"}
                sortType={sortType}
                setSortType={setSortType}
              />
              <p>Å til A</p>
            </label>
            <label className="option">
              <RadioHex
                name={"Afrejse nyeste"}
                sortType={sortType}
                setSortType={setSortType}
              />
              <p>Afrejse nyeste</p>
            </label>
            <label className="option">
              <RadioHex
                name={"Afrejse ældste"}
                sortType={sortType}
                setSortType={setSortType}
              />
              <p>Afrejse ældste</p>
            </label>
          </section>
        </button>
      </form>
    </section>
  );
}
