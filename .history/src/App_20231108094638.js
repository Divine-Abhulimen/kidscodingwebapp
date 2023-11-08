import logo from './logo.svg';
import Home from './pages/home';
import SignIn from './pages/signin';
import { Routes, Route, path } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/signin" element={ <SignIn/> } />
      </Routes>
    </div>
  );
}

export default App;
