import { useState } from 'react';
import { Form, Checkbox, Button } from 'semantic-ui-react';
import CodeEditor from './CodeEditor';
import MarkdownPreview from './MarkdownPreview';
import { isPremium } from '../utils/premium';

function QuestionForm({ title, setTitle, description, setDescription, tags, setTags, code, setCode }) {
  const [showCode, setShowCode] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const userIsPremium = isPremium();

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
        {userIsPremium ? (
          <Checkbox
            label='Add code snippet'
            checked={showCode}
            onChange={() => setShowCode(!showCode)}
            style={{ marginRight: '1.5rem' }}
          />
        ) : (
          <Button basic size='tiny' onClick={() => window.location.assign('/plans')} style={{ marginRight: '1.5rem' }}>Upgrade for code</Button>
        )}
        <Checkbox
          label='Show preview'
          checked={showPreview}
          onChange={() => setShowPreview(!showPreview)}
        />
      </div>

      {showCode && userIsPremium && <CodeEditor code={code} setCode={setCode} />}
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
