import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Chat from './components/chat/Main';
import Home from './components/Home';
import Signup from './components/Signup';
import { createContext } from 'react';
import './style.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Forget from './components/Forget';
import Reset from './components/Reset';
import Video from './components/chat/video/Video';

export const navContext = createContext();
function App() {
  const [privateNavigateSmall, setPrivateNavigateSmall] = useState(false);
  const [groupNavigateSmall, setGroupNavigateSmall] = useState(false);
  return (
    <navContext.Provider
      value={{ 
        privateNavigateSmall, 
        setPrivateNavigateSmall, 
        groupNavigateSmall,
        setGroupNavigateSmall,
      }}
    >
      <div className="h-[100vh] bottom-10 bg-indigo-500">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forget" element={<Forget />}></Route>
          <Route path="/reset" element={<Reset />}></Route>
          <Route path="/video" element={[<Video />]} />
          {window.localStorage.getItem('skylight-jwt') && (
            <Route
              path="/dashboard"
              element={
                <Dashboard currentUser={window.localStorage.getItem('user')} />
              }
            ></Route>
          )}
          {window.localStorage.getItem('skylight-jwt') && (
            <Route
              path="/chat"
              element={
                <Chat currentUser={window.localStorage.getItem('user')} />
              }
            ></Route>
          )}
        </Routes>
      </div>
    </navContext.Provider>
  ); 
}

export default App;
