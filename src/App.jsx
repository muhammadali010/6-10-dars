import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';


function App() { 
  const [token, setToken] = useState(localStorage.getItem("token"));
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    } else {
      if(!location.pathname.includes("/register")) {
        navigate("/login");
      }
    }
  }, [navigate, location]);

  function PrivateRoute({isAuth, children}) {
    if(!isAuth) {
      return navigate("/login"); 
    }
    return children;
  }

  return (
    <div>
      <Routes>
        <Route 
          index 
          element={
            <PrivateRoute isAuth={!!token}>
                <Home />
            </PrivateRoute>
          }
        />
        <Route path='/login' element={<Login setToken={setToken} />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
