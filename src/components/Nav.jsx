import { Link } from "react-router-dom";

export default function Nav() {
   return (
      <div className="navbar">
         <Link to="/bruger" className="navbar_navitems navLinks">
            <img src="/img/icons/bruger.svg" alt="nav ikon" />
            <p>Bruger</p>
         </Link>
         <Link to="/" className="navbar_navitems navLinks">
            <img src="/img/icons/lister.svg" alt="nav ikon" />
            <p>Lister</p>
         </Link>
         <Link to="/Indstillinger" className="navbar_navitems navLinks">
            <img src="/img/icons/indstillinger.svg" alt="nav ikon" />
            <p>Indstillinger</p>
         </Link>
      </div>
   );
}
