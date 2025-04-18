import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import PageCall from "./pages/PageCall";
import PagePrint from "./pages/PagePrint";
import PageView from "./pages/PageView";
import PageTest from "./pages/PageTest";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/call" element={<PageCall />} />
        <Route path="/print" element={<PagePrint />} />
        <Route path="/" element={<PageView />} />
        <Route path="/test" element={<PageTest />} />
      </Routes>
    </Router>
  );
};

export default App;
