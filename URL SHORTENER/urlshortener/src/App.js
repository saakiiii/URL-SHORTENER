import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Home from './Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Redirects from './Redirects';
import Register from './Register';

function App() {

  return (
     
<>
 <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Home loginpage='true'/>}></Route>
      <Route path='/' element={<Home/>}></Route>
      <Route path="/l/:code" element={<Redirects/>}></Route>
      <Route path="/links" element={<Home showLinksOnly='true'/>}></Route>
      <Route path="/current/:code" element={<Home/>}></Route>
      <Route path='/register' element={<Home registerpage='true'/>}></Route>
      <Route path='/current/:<code>' element={<Home currentLinkPage='true'/>}></Route>
    </Routes>
 </BrowserRouter>
</>
  );
}

export default App;
