import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
        <Route path="/beeReady" element={<Lister />} />
        <Route path="/beeReady/bruger" element={<Bruger />} />
        <Route path="/beeReady/indstillinger" element={<Indstillinger />} />
        <Route path="/beeReady/pakkeliste" element={<Pakkeliste />} />
        <Route path="/beeReady/essentials" element={<Essentials />} />
        <Route path="*" element={<Navigate to="/beeReady" />} />
      </Routes>
      <Nav />
    </>
  );

  // variable holding all public routes without nav bar
  const publicRoutes = (
    <Routes>
      <Route path="/beeReady/log-ind" element={<LogInd />} />
      <Route path="/beeReady/opret-bruger" element={<OpretBruger />} />
      <Route path="*" element={<Navigate to="/beeReady/log-ind" />} />
    </Routes>
  );

  return (
    // if user is authenticated, show privateRoutes, else show publicRoutes
    <BrowserRouter>{isAuth ? privateRoutes : publicRoutes}</BrowserRouter>
  );
}
export default App;
