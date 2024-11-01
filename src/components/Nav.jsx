import { Link, NavLink } from "react-router-dom";
import bruger from "../assets/img/icons/bruger.svg";
import lister from "../assets/img/icons/lister.svg";
import indstillinger from "../assets/img/icons/indstillinger.svg";
import biMedTaske from "../assets/img/bi-med-taske.gif";
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
        <img
          src={biMedTaske}
          alt="gif af bi med taske"
          className="mini_bi"
          style={{
            display: animationActive === "Bruger" ? "inline" : "none",
            animation:
              animationActive === "Bruger"
                ? "mini_flyv 1s ease-in-out"
                : "none",
          }}
        />
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
        <img
          src={biMedTaske}
          alt="gif af bi med taske"
          className="mini_bi"
          style={{
            display: animationActive === "Lister" ? "inline" : "none",
            animation:
              animationActive === "Lister"
                ? "mini_flyv 1s ease-in-out"
                : "none",
          }}
        />
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
        <img
          src={biMedTaske}
          alt="gif af bi med taske"
          className="mini_bi"
          style={{
            display: animationActive === "Indstillinger" ? "inline" : "none",
            animation:
              animationActive === "Indstillinger"
                ? "mini_flyv 1s ease-in-out"
                : "none",
          }}
        />
      </NavLink>
    </div>
  );
}
