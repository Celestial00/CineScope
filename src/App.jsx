import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Mainlayout from "./layout/Mainlayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Mainlayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
