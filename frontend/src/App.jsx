import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import PageCall from './pages/PageCall';
import PagePrint from './pages/PagePrint';
import PageView from './pages/PageView';
import PageViewAndCall from './pages/PageViewAndCall';
import PagePrintAndCall from './pages/PagePrintAndCall';
import './App.css';

const App = () => {
  return (

      <Router>
        <Routes>
          {/* <Route path="/" element={<PageCall />} /> */}
          <Route path="/print" element={<PagePrint />} />
          <Route path="/view" element={<PageView />} />
          <Route path="/viewandcall" element={<PageViewAndCall />} />
          <Route path="/printandcall" element={<PagePrintAndCall />} />
        </Routes>
      </Router>

  );
};

export default App;
