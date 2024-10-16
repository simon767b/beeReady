import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lister from "./pages/lister";
import Bruger from "./pages/Bruger";
import Indstillinger from "./pages/Indstillinger";
import Nav from "./components/Nav";
import Header from "./components/Header";

/*hej*/
function App() {
  return (
    <div className="mobile_view">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Lister />} />
          <Route path="/Bruger" element={<Bruger />} />
          <Route path="/Indstillinger" element={<Indstillinger />} />
        </Routes>
        <Nav />
      </BrowserRouter>
    </div>
  );
}

export default App;
