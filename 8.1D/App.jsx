import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import CreatePost from './Components/CreatePost';
import FindQuestions from './Pages/FindQuestions';
import { Container, Header, Segment } from 'semantic-ui-react';

// Simple Home Page Component
function HomePage() {
  return (
    <Container style={{ marginTop: '2rem' }}>
      <Segment padded='very' textAlign='center'>
        <Header as='h1'>Welcome to DEV@Deakin</Header>
        <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
          A community platform for developers to share questions, articles, and knowledge.
        </p>
        <p style={{ fontSize: '1.1rem', marginTop: '1rem' }}>
          Use the navigation bar above to create posts or find questions from the community.
        </p>
      </Segment>
    </Container>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post" element={<CreatePost />} />
          <Route path="/find-questions" element={<FindQuestions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
