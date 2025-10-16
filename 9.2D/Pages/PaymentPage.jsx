import { Segment, Header, Icon, Message, Divider } from 'semantic-ui-react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../Components/CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_YOUR_KEY');

function PaymentPage() {
  return (
    <div className='page-container animate-in'>
      <Segment className='custom-segment' style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
        <Header as='h1' textAlign='center' style={{ color: '#1e1e1e', marginBottom: '1rem' }}>
          <Icon name='credit card' color='blue' />
          Complete Payment
        </Header>
        <Divider />

        <Segment style={{ background: '#f9f9f9', padding: '1.5rem', border: '1px solid #e0e0e0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong style={{ fontSize: '1.2em', color: '#1e1e1e' }}>Premium Plan</strong>
              <p style={{ color: '#666', margin: '0.5rem 0 0 0' }}>Monthly Subscription</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <strong style={{ fontSize: '2em', color: '#2185d0' }}>$9.99</strong>
              <p style={{ color: '#666', margin: '0.5rem 0 0 0' }}>per month</p>
            </div>
          </div>
        </Segment>

        <Divider />

        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>

        <Message info style={{ marginTop: '1.5rem' }}>
          <Icon name='lock' />
          Your payment is secure and encrypted
        </Message>
      </Segment>
    </div>
  );
}

export default PaymentPage;
