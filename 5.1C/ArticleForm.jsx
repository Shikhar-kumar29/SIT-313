import React from 'react';
import { Form } from 'semantic-ui-react';

export default function ArticleForm({ title, setTitle, abstract, setAbstract, content, setContent, tags, setTags }) {
  return (
    <Form>
      <Form.Input
        label="Title"
        placeholder="Enter a descriptive title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Form.Input
        label="Abstract"
        placeholder="Enter a 1-paragraph abstract"
        value={abstract}
        onChange={(e) => setAbstract(e.target.value)}
      />
      <Form.TextArea
        label="Article Text"
        placeholder="Write your article here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Form.Input
        label="Tags"
        placeholder="Please add up to 3 tags to describe what your article is about e.g., Java"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
    </Form>
  );
}
