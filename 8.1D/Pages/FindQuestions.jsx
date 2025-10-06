import { useState, useEffect } from 'react';
import { 
  Container, 
  Card, 
  Button, 
  Input, 
  Header, 
  Segment, 
  Label, 
  Icon,
  Divider,
  Message
} from 'semantic-ui-react';
import { db } from '../Firebase/firebase-config';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';

function FindQuestions() {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [filterTitle, setFilterTitle] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filterTitle, filterTag, filterDate, questions]);

  const fetchQuestions = async () => {
    try {
      const q = query(collection(db, 'questions'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const questionsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setQuestions(questionsData);
      setFilteredQuestions(questionsData);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...questions];

    // Filter by title
    if (filterTitle) {
      filtered = filtered.filter(q => 
        q.title.toLowerCase().includes(filterTitle.toLowerCase())
      );
    }

    // Filter by tag
    if (filterTag) {
      filtered = filtered.filter(q => 
        q.tags && q.tags.some(tag => 
          tag.toLowerCase().includes(filterTag.toLowerCase())
        )
      );
    }

    // Filter by date
    if (filterDate) {
      filtered = filtered.filter(q => {
        if (!q.createdAt) return false;
        const qDate = new Date(q.createdAt.toDate()).toISOString().split('T')[0];
        return qDate === filterDate;
      });
    }

    setFilteredQuestions(filtered);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await deleteDoc(doc(db, 'questions', id));
        setQuestions(questions.filter(q => q.id !== id));
        alert('Question deleted successfully!');
      } catch (error) {
        console.error('Error deleting question:', error);
        alert('Error deleting question. Please try again.');
      }
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'No date';
    try {
      return new Date(timestamp.toDate()).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const clearFilters = () => {
    setFilterTitle('');
    setFilterTag('');
    setFilterDate('');
  };

  if (loading) {
    return (
      <Container style={{ marginTop: '2rem' }}>
        <Segment loading style={{ minHeight: '200px' }}>
          <p>Loading questions...</p>
        </Segment>
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: '2rem', marginBottom: '2rem' }}>
      <Header as='h1' textAlign='center'>
        <Icon name='question circle' />
        Find Questions
      </Header>
      
      <Segment raised>
        <Header as='h3'>
          <Icon name='filter' />
          Filter Questions
        </Header>
        <Divider />
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1rem', 
          marginBottom: '1rem' 
        }}>
          <Input
            icon='search'
            iconPosition='left'
            placeholder='Search by title...'
            value={filterTitle}
            onChange={(e) => setFilterTitle(e.target.value)}
          />
          <Input
            icon='tag'
            iconPosition='left'
            placeholder='Filter by tag...'
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
          />
          <Input
            icon='calendar'
            type='date'
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ margin: 0 }}>
            <strong>Showing {filteredQuestions.length}</strong> of <strong>{questions.length}</strong> questions
          </p>
          <Button basic onClick={clearFilters}>
            <Icon name='remove' />
            Clear Filters
          </Button>
        </div>
      </Segment>

      {filteredQuestions.length === 0 ? (
        <Message info>
          <Message.Header>No questions found</Message.Header>
          <p>
            {questions.length === 0 
              ? 'No questions have been posted yet. Be the first to ask a question!'
              : 'No questions match your filters. Try adjusting your search criteria.'}
          </p>
        </Message>
      ) : (
        <Card.Group>
          {filteredQuestions.map((question) => (
            <Card key={question.id} fluid raised>
              <Card.Content>
                <Card.Header style={{ fontSize: '1.5rem', color: '#2185d0' }}>
                  {question.title}
                </Card.Header>
                <Card.Meta>
                  <Icon name='clock' />
                  Posted on: {formatDate(question.createdAt)}
                </Card.Meta>
                
                <Divider />
                
                <Card.Description>
                  {expandedId === question.id ? (
                    <div>
                      <Header as='h5'>Description:</Header>
                      <p style={{ whiteSpace: 'pre-wrap' }}>
                        {question.description || 'No description provided'}
                      </p>
                      
                      {question.imageUrl && (
                        <div style={{ marginTop: '1rem' }}>
                          <img 
                            src={question.imageUrl} 
                            alt="Question" 
                            style={{ maxWidth: '100%', borderRadius: '4px' }}
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <p>
                      {question.description 
                        ? (question.description.length > 150 
                            ? question.description.substring(0, 150) + '...' 
                            : question.description)
                        : 'No description provided'}
                    </p>
                  )}
                </Card.Description>
                
                {question.tags && question.tags.length > 0 && (
                  <div style={{ marginTop: '1rem' }}>
                    <Icon name='tags' />
                    {question.tags.map((tag, index) => (
                      <Label key={index} color='blue' size='small' style={{ margin: '0.2rem' }}>
                        {tag}
                      </Label>
                    ))}
                  </div>
                )}
              </Card.Content>
              
              <Card.Content extra>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Button 
                    primary
                    basic
                    onClick={() => toggleExpand(question.id)}
                  >
                    <Icon name={expandedId === question.id ? 'angle up' : 'angle down'} />
                    {expandedId === question.id ? 'Show Less' : 'Show More'}
                  </Button>
                  <Button 
                    color='red'
                    basic
                    onClick={() => handleDelete(question.id)}
                  >
                    <Icon name='trash' />
                    Delete
                  </Button>
                </div>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      )}
    </Container>
  );
}

export default FindQuestions;
