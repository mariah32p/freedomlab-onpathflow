import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import RouteGuard from './components/RouteGuard';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import GetStartedPage from './pages/GetStartedPage';
import DashboardPage from './pages/DashboardPage';
import PricingPage from './pages/PricingPage';
import DemoPage from './pages/DemoPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/get-started" element={
          <ProtectedRoute>
            <GetStartedPage />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <RouteGuard>
              <DashboardPage />
            </RouteGuard>
          </ProtectedRoute>
        } />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/demo" element={<DemoPage />} />
      </Routes>
    </Router>
  );
}

export default App;