import React from 'react';
import { Form } from 'semantic-ui-react';

export default function QuestionForm({ title, setTitle, details, setDetails, tags, setTags }) {
  return (
    <Form>
      <Form.Input
        label="Title"
        placeholder="Start your question with how, what, why, etc."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Form.TextArea
        label="Describe your problem"
        placeholder="Describe your problem..."
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />
      <Form.Input
        label="Tags"
        placeholder="Please add up to 3 tags to describe what your question is about e.g., Java"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
    </Form>
  );
}
