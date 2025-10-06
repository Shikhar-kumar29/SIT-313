import { Form, Radio } from 'semantic-ui-react';

function PostTypeSelector({ postType, setPostType }) {
  return (
    <Form.Field>
      <label>Select Post Type:</label>
      <div style={{ marginTop: '0.5rem' }}>
        <Radio
          label='Question'
          name='postType'
          value='question'
          checked={postType === 'question'}
          onChange={() => setPostType('question')}
          style={{ marginRight: '2rem' }}
        />
        <Radio
          label='Article'
          name='postType'
          value='article'
          checked={postType === 'article'}
          onChange={() => setPostType('article')}
        />
      </div>
    </Form.Field>
  );
}

export default PostTypeSelector;
