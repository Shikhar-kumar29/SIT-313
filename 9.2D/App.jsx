import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import CreatePost from './Components/CreatePost';
import HomePage from './Pages/HomePage';
import FindQuestions from './Pages/FindQuestions';
import PricingPlans from './Pages/PricingPlans';
import PaymentPage from './Pages/PaymentPage';
import PaymentSuccess from './Pages/PaymentSuccess';
import PremiumHome from './Pages/PremiumFeatures/PremiumHome';
import AnalyticsDashboard from './Pages/PremiumFeatures/AnalyticsDashboard';
import PrioritySupport from './Pages/PremiumFeatures/PrioritySupport';
import LoginPage from './Pages/Auth/LoginPage';
import RegisterPage from './Pages/Auth/RegisterPage';
import { useAuth } from './context/AuthContext';

function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function RequirePremium({ children }) {
  const { user, isPremium, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isPremium) {
    return <Navigate to="/plans" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post" element={<CreatePost />} />
            <Route path="/find-questions" element={<FindQuestions />} />
            <Route path="/plans" element={<PricingPlans />} />
            <Route path="/payment" element={<RequireAuth><PaymentPage /></RequireAuth>} />
            <Route path="/payment-success" element={<RequireAuth><PaymentSuccess /></RequireAuth>} />
            <Route path="/premium" element={<RequirePremium><PremiumHome /></RequirePremium>} />
            <Route path="/premium/analytics" element={<RequirePremium><AnalyticsDashboard /></RequirePremium>} />
            <Route path="/premium/support" element={<RequirePremium><PrioritySupport /></RequirePremium>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
