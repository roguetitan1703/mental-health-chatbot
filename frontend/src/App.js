import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Home, Index } from "./pages";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Index />}/>
          <Route path = "/home" element = {<Home />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
