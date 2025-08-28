import React from 'react';
import { Button } from 'semantic-ui-react';

export default function SubmitButton({ handleSubmit }) {
  return (
    <Button primary fluid onClick={handleSubmit}>
      Post
    </Button>
  );
}
