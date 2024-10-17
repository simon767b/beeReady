import { useState } from "react";
import Category from "../components/Category";

export default function Pakkeliste() {
   const [totalCategoryItems, setTotalCategoryItems] = useState(0);
   const [totalCheckedCategoryItems, setTotalCheckedCategoryItems] = useState(0);

   return (
      <main>
         <div className="packinglist">
            <div className="packinglist-fixed">
               <div className="packinglist-header">
                  <h1>Riga</h1>
                  <h1>{`${totalCheckedCategoryItems}/${totalCategoryItems}`}</h1>
               </div>
               <div className="packinglist-info">
                  <h4>16.-23. maj 2024</h4>
                  <button>+ tilføj kategori</button>
               </div>
               <div className="linje-moenster"></div>
            </div>
            {/* Pass the totalCategoryItems and setter to each Category component */}
            <Category totalCategoryItems={totalCategoryItems} setTotalCategoryItems={setTotalCategoryItems} totalCheckedCategoryItems={totalCheckedCategoryItems} setTotalCheckedCategoryItems={setTotalCheckedCategoryItems}/>
            <Category totalCategoryItems={totalCategoryItems} setTotalCategoryItems={setTotalCategoryItems} totalCheckedCategoryItems={totalCheckedCategoryItems} setTotalCheckedCategoryItems={setTotalCheckedCategoryItems}/>
            {/* If you need another Category, you can add it like this: */}
            {/* <Category totalCategoryItems={totalCategoryItems} setTotalCategoryItems={setTotalCategoryItems} /> */}
         </div>
      </main>
   );
}
