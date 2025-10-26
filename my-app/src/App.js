import React, { useState } from 'react';
import './App.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Modules from './pages/Modules';
import ModuleBuilder from './pages/ModuleBuilder';
import Quiz from './pages/Quiz';
import Lesson from './pages/Lesson';
import Navbar from './components/Navbar';
import PoseMonitor from './components/CameraComponents/PoseMonitor';
import CameraPreview from './components/CameraComponents/CameraPreview';

function App() {
  // simple client-side routing using state
  const [route, setRoute] = useState('home'); // 'home' | 'login' | 'register' | 'modules' | 'module' | 'quiz'
  const [user, setUser] = useState(null);
  const [moduleData, setModuleData] = useState(null); // store selected module descriptor
  const [quizConfig, setQuizConfig] = useState(null);

  const navigate = (to, opts) => {
    if (to === 'module' && opts?.module) {
      setModuleData(opts.module); // save selected module
    }
    if (opts && to !== 'module') setQuizConfig(opts);
    setRoute(to);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setRoute('modules');
  };

  const handleLogout = () => {
    setUser(null);
    setRoute('home');
  };

  return (
    <div className="App-root">
      <Navbar onNavigate={navigate} user={user} onLogout={handleLogout} />

      <main className="App-main">
        {route === 'home' && <Home onNavigate={navigate} user={user} />}
        {route === 'login' && <Login onLogin={handleLogin} onNavigate={navigate} />}
        {route === 'register' && <Register onRegister={handleLogin} onNavigate={navigate} />}
        {route === 'modules' && <Modules onNavigate={navigate} user={user} />}
        {route === 'module' && <ModuleBuilder module={moduleData} onNavigate={navigate} user={user} />}
        {route === 'lesson' && <Lesson quizConfig={quizConfig} onNavigate={navigate} />}
        {route === 'quiz' && <Quiz quizConfig={quizConfig} onNavigate={navigate} />}

        <CameraPreview />
        {/* PoseMonitor still non-functional */}
        {/* <PoseMonitor /> */}
      </main>

      <footer className="App-footer">C++ ITS Template — simple educational template</footer>
    </div>
  );
}

export default App;
