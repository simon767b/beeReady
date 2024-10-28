import { Link } from "react-router-dom";
import bruger from "../assets/img/icons/bruger.svg";
import lister from "../assets/img/icons/lister.svg";
import indstillinger from "../assets/img/icons/indstillinger.svg";

export default function Nav() {
   return (
      <div className="navbar">
         <Link to="/bruger" className="navbar_navitems navLinks">
            <img src={bruger} alt="nav ikon" />
            <p>Bruger</p>
         </Link>
         <Link to="/" className="navbar_navitems navLinks">
            <img src={lister} alt="nav ikon" />
            <p>Lister</p>
         </Link>
         <Link to="/Indstillinger" className="navbar_navitems navLinks">
            <img src={indstillinger} alt="nav ikon" />
            <p>Indstillinger</p>
         </Link>
      </div>
   );
}
