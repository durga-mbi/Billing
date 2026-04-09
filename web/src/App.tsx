import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import { authService } from './services/auth.service';
import { config } from './config';
import './App.css';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = authService.getCurrentUser();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

function Home() {
  const user = authService.getCurrentUser();

  return (
    <div className="home-container">
      <div className="env-badge" style={{
        background: config.mode === 'production' ? '#ef4444' : '#22c55e',
      }}>
        {(config.mode || 'development').toUpperCase()} MODE
      </div>

      <h1>Welcome, {user?.profile?.firstName || user?.email}!</h1>
      <p>Billing-V2 is ready.</p>
      <code>Connected to: {config.apiUrl}</code>

      <button className="logout-btn" onClick={() => {
        authService.logout();
        window.location.reload();
      }}>Logout</button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
