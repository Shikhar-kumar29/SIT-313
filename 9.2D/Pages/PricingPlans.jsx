import { useNavigate } from 'react-router-dom';
import { Card, Button, Header, Icon, List, Segment } from 'semantic-ui-react';
import { isPremium } from '../utils/premium';

function PricingPlans() {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: ['Post unlimited questions', 'Post unlimited articles', 'Basic community access', 'Standard support'],
      buttonText: 'Current Plan',
      disabled: true,
      color: 'grey'
    },
    {
      name: 'Premium',
      price: '$9.99',
      period: 'per month',
      features: [
        'All Free features',
        'Priority support',
        'Analytics dashboard',
        'Delete questions',
        'Ad-free experience',
        'Advanced code editor'
      ],
      buttonText: 'Upgrade Now',
      disabled: false,
      color: 'blue',
      popular: true
    }
  ];

  return (
    <div className='page-container animate-in' style={{ padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Header as='h1' style={{ fontSize: '2.5em', color: '#1e1e1e' }}>
          <Icon name='star' color='orange' />
          Choose Your Plan
        </Header>
        <p style={{ fontSize: '1.2em', color: '#666' }}>
          Select the perfect plan for your journey
        </p>
      </div>

      <Card.Group centered itemsPerRow={2} stackable>
        {plans.map((plan, i) => {
          const userIsPremium = isPremium();
          // if user already premium, disable upgrade and change label
          const isPremiumPlan = plan.name.toLowerCase() === 'premium';
          const disabled = isPremiumPlan ? (userIsPremium || plan.disabled) : plan.disabled;
          const buttonText = isPremiumPlan && userIsPremium ? 'Subscribed' : plan.buttonText;

          return (
            <Card key={i} className='custom-card' style={{ position: 'relative' }}>
              {plan.popular && (
                <Segment inverted color='blue' style={{
                  margin: 0,
                  borderRadius: '8px 8px 0 0',
                  padding: '0.5rem',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: '0.9em'
                }}>
                  ⭐ MOST POPULAR
                </Segment>
              )}
              <Card.Content style={{ textAlign: 'center', padding: '2rem' }}>
                <Card.Header style={{ fontSize: '2em', marginBottom: '1rem', color: '#1e1e1e' }}>
                  {plan.name}
                </Card.Header>
                <div style={{ fontSize: '2.5em', margin: '1rem 0', color: '#2185d0', fontWeight: 'bold' }}>
                  {plan.price}
                </div>
                <div style={{ fontSize: '1em', color: '#666', marginBottom: '2rem' }}>
                  {plan.period}
                </div>
                <List size='large' style={{ textAlign: 'left' }}>
                  {plan.features.map((feature, idx) => (
                    <List.Item key={idx} style={{ padding: '0.5rem 0' }}>
                      <Icon name='check circle' color='green' />
                      <List.Content>{feature}</List.Content>
                    </List.Item>
                  ))}
                </List>
              </Card.Content>
              <Card.Content extra style={{ padding: '1.5rem' }}>
                <Button
                  fluid
                  size='large'
                  color={plan.color}
                  disabled={disabled}
                  onClick={() => !disabled && navigate('/payment')}
                >
                  {buttonText}
                </Button>
              </Card.Content>
            </Card>
          );
        })}
      </Card.Group>

      <Segment textAlign='center' basic style={{ marginTop: '2rem', padding: '2rem' }}>
        <Icon name='question circle' size='large' color='grey' />
        <Header as='h3' style={{ color: '#1e1e1e', margin: '1rem 0' }}>
          Have questions about our plans?
        </Header>
        <p style={{ color: '#666' }}>Contact our support team for more information</p>
      </Segment>
    </div>
  );
}

export default PricingPlans;
