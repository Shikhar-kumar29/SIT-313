import { useNavigate } from 'react-router-dom';
import { Container, Segment, Header, Icon, Button, List } from 'semantic-ui-react';

function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className='page-container animate-in'>
      <Segment placeholder textAlign='center' padded='very' className='custom-segment' style={{ maxWidth: '700px', margin: '0 auto' }}>
        <Icon name='check circle' size='massive' color='green' />
        <Header as='h1' style={{ color: '#667eea', marginTop: '1rem' }}>
          Payment Successful!
        </Header>
        <p style={{ fontSize: '1.2em', margin: '1.5rem 0', color: '#666' }}>
          Welcome to Premium! Your account has been upgraded.
        </p>

        <Segment raised style={{ margin: '2rem auto', maxWidth: '450px', background: '#f8f9fa' }}>
          <Header as='h3' style={{ color: '#667eea' }}>What's Next?</Header>
          <List size='large' style={{ textAlign: 'left' }}>
            <List.Item>
              <Icon name='star' color='yellow' />
              <List.Content>Access premium features</List.Content>
            </List.Item>
            <List.Item>
              <Icon name='chart line' color='blue' />
              <List.Content>View analytics dashboard</List.Content>
            </List.Item>
            <List.Item>
              <Icon name='paint brush' color='purple' />
              <List.Content>Customize your themes</List.Content>
            </List.Item>
            <List.Item>
              <Icon name='bell' color='red' />
              <List.Content>Get priority support</List.Content>
            </List.Item>
          </List>
        </Segment>

        <div style={{ marginTop: '2rem' }}>
          <Button 
            primary 
            size='large' 
            onClick={() => navigate('/')}
          >
            <Icon name='home' />
            Go to Home
          </Button>
          <Button 
            color='violet'
            size='large' 
            onClick={() => navigate('/post')}
            style={{ marginLeft: '1rem' }}
          >
            <Icon name='pencil' />
            Create Post
          </Button>
        </div>
      </Segment>
    </div>
  );
}

export default PaymentSuccess;
