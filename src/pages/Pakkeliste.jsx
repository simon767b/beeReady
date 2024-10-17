import Category from "../components/Category";

export default function Pakkeliste() {
   return (
    <main>
      <div className="packinglist">
         <div className="packinglist-fixed">
         <div className="packinglist-header">
            <h1>Riga</h1>
            <h1>17/20</h1>
         </div>
         <div className="packinglist-info">
            <h4>16.-23. maj 2024</h4>
            <button>+ tilføj kategori</button>
         </div>
         <div className="linje-moenster"></div>
         </div>
         <Category />
         <Category />
         <Category />
         <Category />
         <Category />
      </div>
      </main>
   );
}
