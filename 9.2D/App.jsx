import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import CreatePost from './Components/CreatePost';
import HomePage from './Pages/HomePage';
import FindQuestions from './Pages/FindQuestions';
import PricingPlans from './Pages/PricingPlans';
import PaymentPage from './Pages/PaymentPage';
import PaymentSuccess from './Pages/PaymentSuccess';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post" element={<CreatePost />} />
          <Route path="/find-questions" element={<FindQuestions />} />
          <Route path="/plans" element={<PricingPlans />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
