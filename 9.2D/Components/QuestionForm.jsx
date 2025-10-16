import { useState } from 'react';
import { Form, Checkbox } from 'semantic-ui-react';
import CodeEditor from './CodeEditor';
import MarkdownPreview from './MarkdownPreview';

function QuestionForm({ title, setTitle, description, setDescription, tags, setTags, code, setCode }) {
  const [showCode, setShowCode] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      <Form.Input
        label='Title'
        placeholder='How do I...? What is...? Why does...?'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <Form.TextArea
        label='Description'
        placeholder='Describe your problem... (Markdown supported)'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={6}
        required
      />

      <div style={{ marginBottom: '1rem' }}>
        <Checkbox
          label='Add code snippet'
          checked={showCode}
          onChange={() => setShowCode(!showCode)}
          style={{ marginRight: '1.5rem' }}
        />
        <Checkbox
          label='Show preview'
          checked={showPreview}
          onChange={() => setShowPreview(!showPreview)}
        />
      </div>

      {showCode && <CodeEditor code={code} setCode={setCode} />}
      {showPreview && <MarkdownPreview content={description} />}

      <Form.Input
        label='Tags'
        placeholder='javascript, react, node (max 3 tags)'
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        required
      />
    </>
  );
}

export default QuestionForm;
