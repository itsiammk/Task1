import logo from './logo.svg';
import './App.css';
import Temp from './components/Form';
import CostomLayout from './components/layout';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

function App() {
  return (
    <div >
      <Router>
        <CostomLayout />
      </Router>
    </div>
  );
}

export default App;
