import { Button, Icon } from 'semantic-ui-react';

function SubmitButton({ loading }) {
  return (
    <Button 
      primary 
      type='submit' 
      loading={loading}
      disabled={loading}
      size='large'
      fluid
      style={{ marginTop: '1.5rem' }}
    >
      <Icon name='send' />
      Publish Post
    </Button>
  );
}

export default SubmitButton;
