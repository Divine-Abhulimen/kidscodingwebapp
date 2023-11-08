import logo from './logo.svg';
import Home from './pages/home';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import { Routes, Route, path } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/signin" element={ <SignIn/> } />
        <Route path="/signup" element={ <SignUp/> } />
      </Routes>
    </div>
  );
}

export default App;
