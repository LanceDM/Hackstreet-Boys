import React, { useState, useEffect } from 'react';
import './App.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Modules from './pages/Modules';
import ModuleBuilder from './pages/ModuleBuilder';
import Quiz from './pages/Quiz';
import QuizBuilder from './pages/QuizBuilder';
import Navbar from './components/Navbar';
import PoseMonitor from './components/CameraComponents/PoseMonitor';
import CameraPreview from './components/CameraComponents/CameraPreview';
import UserSession from './Query/UserSession';
import Profile from './pages/Profile';

function App() {
  const [route, setRoute] = useState('home');
  const [user, setUser] = useState(null);
  const [moduleData, setModuleData] = useState(null);
  const [quizConfig, setQuizConfig] = useState(null);

  // Check for existing session on app load
  useEffect(() => {
    const sessionUser = UserSession.getUser();
    if (sessionUser) {
      setUser(sessionUser);
    }
  }, []);

  const navigate = (to, opts = {}) => {
    if (to === 'module' && opts.module) {
      setModuleData(opts.module);
    }
    if (opts && to !== 'module') {
      setQuizConfig(opts);
    }
    setRoute(to);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setRoute('modules');
  };

  const handleLogout = () => {
    UserSession.clearUser();
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
        {route === 'quiz' && <Quiz quizConfig={quizConfig} onNavigate={navigate} />}
        {route === 'quiz-builder' && <QuizBuilder quizConfig={quizConfig} onNavigate={navigate} />}
        {route === 'profile' && <Profile onNavigate={navigate} />}

        <CameraPreview />
        {/* PoseMonitor still non-functional */}
        {/* <PoseMonitor /> */}
      </main>
    </div>
  );
}

export default App;
