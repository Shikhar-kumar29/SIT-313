import { Button } from 'semantic-ui-react';

function SubmitButton({ loading }) {
  return (
    <Button 
      primary 
      type="submit" 
      loading={loading}
      disabled={loading}
      size="large"
    >
      Post
    </Button>
  );
}

export default SubmitButton;
