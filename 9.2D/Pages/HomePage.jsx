import { useNavigate } from 'react-router-dom';
import { Segment, Header, Button, Icon, Card } from 'semantic-ui-react';

function HomePage() {
  const navigate = useNavigate();

  const features = [
    { icon: 'question circle', title: 'Ask Questions', description: 'Get help from the community', color: 'blue' },
    { icon: 'file alternate', title: 'Share Articles', description: 'Write and share knowledge', color: 'green' },
    { icon: 'code', title: 'Code Snippets', description: 'Share code with syntax highlighting', color: 'grey' },
    { icon: 'star', title: 'Premium Plans', description: 'Unlock advanced features', color: 'orange' }
  ];

  return (
    <div className='page-container animate-in' style={{ padding: 0 }}>
      <Segment textAlign='center' style={{ 
        padding: '3rem 2rem', 
        background: 'white',
        margin: 0,
        borderRadius: 0,
        border: 'none',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <Icon name='code' size='huge' color='blue' />
        <Header as='h1' style={{ fontSize: '2.5em', color: '#1e1e1e', margin: '1rem 0' }}>
          Welcome to DEV@Deakin
        </Header>
        <p style={{ fontSize: '1.2em', color: '#666', maxWidth: '700px', margin: '1rem auto 2rem' }}>
          A community platform for developers to share questions, articles, and knowledge
        </p>
        <Button.Group size='large'>
          <Button primary onClick={() => navigate('/post')}>
            <Icon name='pencil' />
            Create Post
          </Button>
          <Button color='blue' basic onClick={() => navigate('/find-questions')}>
            <Icon name='search' />
            Browse Questions
          </Button>
        </Button.Group>
      </Segment>

      <div style={{ background: '#f9f9f9', padding: '2rem 1rem' }}>
        <Header as='h2' textAlign='center' style={{ margin: '0 0 2rem', color: '#1e1e1e' }}>
          Why Join DEV@Deakin?
        </Header>

        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Card.Group itemsPerRow={2} stackable>
            {features.map((feature, i) => (
              <Card key={i} className='custom-card'>
                <Card.Content textAlign='center' style={{ padding: '2rem' }}>
                  <Icon name={feature.icon} size='huge' color={feature.color} />
                  <Card.Header style={{ fontSize: '1.4em', margin: '1rem 0', color: '#1e1e1e' }}>
                    {feature.title}
                  </Card.Header>
                  <Card.Description style={{ fontSize: '1em', color: '#666' }}>
                    {feature.description}
                  </Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </div>
      </div>

      <Segment textAlign='center' style={{ 
        padding: '3rem 2rem', 
        background: 'white',
        margin: 0,
        borderRadius: 0,
        border: 'none'
      }}>
        <Header as='h3' style={{ color: '#1e1e1e', marginBottom: '1.5rem' }}>
          Ready to get started?
        </Header>
        <Button primary size='huge' onClick={() => navigate('/post')}>
          <Icon name='plus' />
          Create Your First Post
        </Button>
      </Segment>
    </div>
  );
}

export default HomePage;
