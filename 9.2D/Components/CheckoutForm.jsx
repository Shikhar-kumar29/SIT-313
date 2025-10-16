import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Form, Button, Message, Segment } from 'semantic-ui-react';

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const { error: stripeError } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: { name: formData.name, email: formData.email },
      });

      if (stripeError) {
        setError(stripeError.message);
      } else {
        navigate('/payment-success');
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && (
        <Message negative>{error}</Message>
      )}

      <Form.Input
        label='Full Name'
        placeholder='John Doe'
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />

      <Form.Input
        label='Email'
        type='email'
        placeholder='john@example.com'
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />

      <Form.Field>
        <label>Card Details</label>
        <Segment style={{ padding: '1rem' }}>
          <CardElement options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': { color: '#aab7c4' },
              },
            },
          }} />
        </Segment>
      </Form.Field>

      <Button
        primary
        fluid
        size='large'
        type='submit'
        disabled={!stripe || loading}
        loading={loading}
      >
        Pay $9.99
      </Button>
    </Form>
  );
}

export default CheckoutForm;
