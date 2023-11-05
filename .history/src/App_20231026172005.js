import logo from './logo.svg';
import Home from './pages/home';
import { Routes, Route, path } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={ <Home/> } />
      </Routes>
    </div>
  );
}

export default App;
