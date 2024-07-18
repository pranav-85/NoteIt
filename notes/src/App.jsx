import LayoutWithNoteCards from './layout-with-notecards.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact  element={<LayoutWithNoteCards />} />
      </Routes>
    </Router>
  );
}





export default App
