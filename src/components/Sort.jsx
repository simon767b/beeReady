import { useState } from "react";
import RadioHex from "./RadioHex";

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
               <img
                  className="search"
                  src="/img/icons/search.svg"
                  alt="Søg ikon"
               />
               <input type="search" placeholder="Søg" />
            </div>
            <button type="button" className="sort_btn" onClick={showSorting}>
               Sortér{" "}
               <img
                  className={sortArrowClass}
                  src="/img/icons/sort_arrow.svg"
                  alt="drop-down pil"
               />
               <section className={sortDropdownClass}>
                  <label className="option">
                     <RadioHex name={"sorting"} />
                     <p>Senest ændret</p>
                  </label>
                  <label className="option">
                     <RadioHex name={"sorting"} />
                     <p>A til Å</p>
                  </label>
                  <label className="option">
                     <RadioHex name={"sorting"} />
                     <p>Å til A</p>
                  </label>
                  <label className="option">
                     <RadioHex name={"sorting"} />
                     <p>Afrejse (nyeste)</p>
                  </label>
                  <label className="option">
                     <RadioHex name={"sorting"} />
                     <p>Afrejse (ældste)</p>
                  </label>
               </section>
            </button>
         </form>
      </section>
   );
}
