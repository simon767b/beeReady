import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Lister from "./pages/Lister";
import Bruger from "./pages/Bruger";
import Indstillinger from "./pages/Indstillinger";
import Nav from "./components/Nav";
import Header from "./components/Header";
import Pakkeliste from "./pages/Pakkeliste";
import LogInd from "./pages/LogInd";
import Essentials from "./pages/Essentials";
import OpretBruger from "./pages/OpretBruger";
import "./pages/firebase-config";
// import { auth } from "./pages/firebase-config";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

function App() {
  const auth = getAuth();
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth")); // start default value comes from localStorage

  onAuthStateChanged(auth, (user) => {
    if (user) {
      //user is authenticated / signed in
      setIsAuth(true); // set isAuth to true
      localStorage.setItem("isAuth", true); // also, save isAuth in localStorage
    } else {
      // user is not authenticated / not signed in
      setIsAuth(false); // set isAuth to false
      localStorage.removeItem("isAuth"); // remove isAuth from localStorage
    }
  });

  // variable holding all private routes including the nav bar
  const privateRoutes = (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Lister />} />
        <Route path="/bruger" element={<Bruger />} />
        <Route path="/indstillinger" element={<Indstillinger />} />
        <Route path="/pakkeliste" element={<Pakkeliste />} />
        <Route path="/essentials" element={<Essentials />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Nav />
    </>
  );

  // variable holding all public routes without nav bar
  const publicRoutes = (
    <Routes>
      <Route path="/log-ind" element={<LogInd />} />
      <Route path="/opret-bruger" element={<OpretBruger />} />
      <Route path="*" element={<Navigate to="/log-ind" />} />
    </Routes>
  );

  return (
    // if user is authenticated, show privateRoutes, else show publicRoutes
    <>{isAuth ? privateRoutes : publicRoutes}</>
  );
}
export default App;
