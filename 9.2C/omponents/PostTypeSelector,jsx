import { Form, Button } from 'semantic-ui-react';

function PostTypeSelector({ postType, setPostType }) {
  return (
    <Form.Field>
      <label style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.8rem' }}>
        Select Post Type
      </label>
      <Button.Group fluid>
        <Button
          type='button'
          primary={postType === 'question'}
          basic={postType !== 'question'}
          onClick={() => setPostType('question')}
        >
          Question
        </Button>
        <Button
          type='button'
          primary={postType === 'article'}
          basic={postType !== 'article'}
          onClick={() => setPostType('article')}
        >
          Article
        </Button>
      </Button.Group>
    </Form.Field>
  );
}

export default PostTypeSelector;
