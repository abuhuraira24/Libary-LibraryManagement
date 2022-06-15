
import './App.css';

import NavBar from './components/Navbar/NavBar';

import Register from "./components/Register/Register"

import {useState, useEffect} from "react"

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from './components/pages/Home';

import Login from './components/Login/Login';

import PublicRouter from './hooks/PublicRouter';

import { AuthProvider } from './context/auth';
import QueryPage from './components/SearchPage/QueryPage';

import People from './components/People';
import PostDetails from './components/PostDetails';
import SmallNavbar from './components/Navbar/SmallNavbar';
import Profile from './components/Profile';

function App() {

  return (
    <AuthProvider>
      <Router>

        <SmallNavbar />
         <NavBar />
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/search' element={<QueryPage />} />
        <Route path='/search/people' element={<People />} />
        <Route path='/post/:id' element={<PostDetails />} />
        <Route path='/search/post/:id' element={<PostDetails />} />
        {/* <Route path='*' element={<NotFound />} /> */}
          <Route path='/register' element={
            <PublicRouter rediredct="/">
              <Register />
            </PublicRouter>
          } />
          <Route path='/login' element={
          <PublicRouter rediredct="/">
             <Login />
           </PublicRouter>} />
        </Routes>
      </Router>
    </AuthProvider>
      
      
  );    
}

export default App
