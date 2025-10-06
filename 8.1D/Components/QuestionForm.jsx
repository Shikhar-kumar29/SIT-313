import { Form } from 'semantic-ui-react';

function QuestionForm({ title, setTitle, description, setDescription, tags, setTags }) {
  return (
    <>
      <Form.Input
        label='Title'
        placeholder='Start your question with how, what, why, etc.'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <Form.TextArea
        label='Describe your problem'
        placeholder='Describe your problem in detail...'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={6}
        required
      />

      <Form.Input
        label='Tags'
        placeholder='Please add up to 3 tags to describe your question (e.g., javascript, react, node)'
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        required
      />
    </>
  );
}

export default QuestionForm;
