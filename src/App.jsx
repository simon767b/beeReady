import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lister from "./pages/Lister";
import Bruger from "./pages/Bruger";
import Indstillinger from "./pages/Indstillinger";
import Nav from "./components/Nav";
import Header from "./components/Header";
import Pakkeliste from "./pages/Pakkeliste";

function App() {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Lister />} />
          <Route path="/Bruger" element={<Bruger />} />
          <Route path="/Indstillinger" element={<Indstillinger />} />
          <Route path="/Pakkeliste" element={<Pakkeliste />} />

        </Routes>
        <Nav />
      </BrowserRouter>
  );
}
export default App;
