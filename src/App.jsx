import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Lister from "./pages/Lister";
import Bruger from "./pages/Bruger";
import Indstillinger from "./pages/Indstillinger";
import Nav from "./components/Nav";
import Header from "./components/Header";
import Pakkeliste from "./pages/Pakkeliste";
import LogInd from "./pages/LogInd";

function App() {
  const [side, setSide] = useState(false);
  const [mainUrl, setMainUrl] = useState(window.location.href);

  useEffect(() => {
    let url = window.location.href;
    if (url == "http://localhost:5173/LogInd") {
      setSide(false);
    } else {
      setSide(true);
    }
    // console.log(side, url);
  }, [side]);

  return (
    <BrowserRouter>
      {side ? <Header /> : null}
      <Routes>
        <Route
          index
          element={<Lister />}
          mainUrl={mainUrl}
          setMainUrl={setMainUrl}
        />
        <Route path="/Bruger" element={<Bruger />} />
        <Route path="/Indstillinger" element={<Indstillinger />} />
        <Route path="/Pakkeliste" element={<Pakkeliste />} />
        <Route path="/LogInd" element={<LogInd />} />
      </Routes>
      {side ? <Nav /> : null}
    </BrowserRouter>
  );
}
export default App;
