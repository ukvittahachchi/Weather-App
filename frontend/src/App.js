import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Weather from './components/Weather';
import './App.css';

function App() {
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } = useAuth0();

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>🌤️ Weather Dashboard</h1>
          <div className="auth-section">
            {isAuthenticated ? (
              <div className="user-info">
                <span>Welcome, {user?.name || user?.email}!</span>
                <button 
                  onClick={() => logout({ returnTo: window.location.origin })}
                  className="btn btn-logout"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <button 
                onClick={() => loginWithRedirect()}
                className="btn btn-login"
              >
                Log In
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="app-main">
        {isAuthenticated ? (
          <Weather />
        ) : (
          <div className="welcome-section">
            <div className="welcome-card">
              <h2>Welcome to Weather App</h2>
              <p>Please log in to view weather information from cities around the world.</p>
              <button 
                onClick={() => loginWithRedirect()}
                className="btn btn-primary"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;