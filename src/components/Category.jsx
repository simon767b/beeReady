import Check from "./Check";

export default function Category() {
   return (
      <>
         <div className="linje-moenster"></div>

         <div className="category">
            <div className="category-header">
               <h2>Elektronik</h2>
               <div>
                  <h2>0/4</h2>
                  <img src="img/icons/down-arrow.svg" alt="" />
               </div>
            </div>
            <ul>
               <li>
                  <Check />
                  Mobil
               </li>
               <li>
                  <Check />
                  Mobil
               </li>
               <li>
                  <Check />
                  Mobil
               </li>
               <li>
                  <Check />
                  Mobil
               </li>
            </ul>
         </div>
      </>
   );
}
