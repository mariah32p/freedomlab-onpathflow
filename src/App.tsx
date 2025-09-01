import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import GetStartedPage from './pages/GetStartedPage';
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
        <Route path="/get-started" element={<GetStartedPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/demo" element={<DemoPage />} />
      </Routes>
    </Router>
  );
}

export default App;