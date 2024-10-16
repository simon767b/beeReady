import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lister from "./pages/lister";
import Bruger from "./pages/bruger";
import Indstillinger from "./pages/indstillinger";
import Nav from "./components/Nav";
import Header from "./components/Header";

function App() {
  return (
    <div className="mobile_view">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Lister />} />
          <Route path="/lister" element={<Lister />} />
          <Route path="/bruger" element={<Bruger />} />
          <Route path="/indstillinger" element={<Indstillinger />} />
        </Routes>
        <Nav />
      </BrowserRouter>
    </div>
  );
}

export default App;
