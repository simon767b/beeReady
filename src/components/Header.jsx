import { Link } from "react-router-dom";

import logo from "../assets/img/logo/logo.svg";
import logoTekstLang from "../assets/img/logo/logo-tekst-lang.svg";

export default function Header() {
   return (
      <div className="header">
         <Link to="/beeReady" className="logo-header">
            <img className="logo-img" src={logo} alt="" />
            <img className="logo-text" src={logoTekstLang} alt="" />
         </Link>
      </div>
   );
}
