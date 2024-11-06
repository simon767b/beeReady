import { Link, NavLink } from "react-router-dom";
import bruger from "../assets/img/icons/bruger.svg";
import lister from "../assets/img/icons/lister.svg";
import indstillinger from "../assets/img/icons/indstillinger.svg";
import { useState } from "react";

export default function Nav() {
  const [animationActive, setAnimaitonActive] = useState(false);

  return (
    <div className="navbar">
      <NavLink
        to="/bruger"
        className="navbar_navitems navLinks"
        onClick={() => {
          setAnimaitonActive("Bruger");
        }}
      >
        <img src={bruger} alt="nav ikon" />
        <p>Bruger</p>
      </NavLink>
      <NavLink
        to="/"
        className="navbar_navitems navLinks"
        onClick={() => {
          setAnimaitonActive("Lister");
        }}
      >
        <img src={lister} alt="nav ikon" />
        <p>Lister</p>
      </NavLink>
      <NavLink
        to="/Indstillinger"
        className="navbar_navitems navLinks"
        onClick={() => {
          setAnimaitonActive("Indstillinger");
        }}
      >
        <img src={indstillinger} alt="nav ikon" />
        <p>Indstillinger</p>
      </NavLink>
    </div>
  );
}
