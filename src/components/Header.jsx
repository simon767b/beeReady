import { Link } from "react-router-dom";

export default function Header() {
   return (
      <div className="header">
         <Link to="/" className="logo-header">
            <img className="logo-img" src="img/logo/logo.svg" alt="" />
            <img className="logo-text" src="img/logo/logo-tekst-lang.svg" alt="" />
         </Link>
      </div>
   );
}
