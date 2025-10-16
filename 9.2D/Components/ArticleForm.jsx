import { useState } from 'react';
import { Form, Checkbox } from 'semantic-ui-react';
import CodeEditor from './CodeEditor';
import MarkdownPreview from './MarkdownPreview';

function ArticleForm({ title, setTitle, abstract, setAbstract, articleText, setArticleText, tags, setTags, code, setCode }) {
  const [showCode, setShowCode] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      <Form.Input
        label='Title'
        placeholder='Enter article title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <Form.TextArea
        label='Abstract'
        placeholder='Brief summary of your article'
        value={abstract}
        onChange={(e) => setAbstract(e.target.value)}
        rows={3}
        required
      />

      <Form.TextArea
        label='Article Content'
        placeholder='Write your article... (Markdown supported)'
        value={articleText}
        onChange={(e) => setArticleText(e.target.value)}
        rows={8}
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
      {showPreview && <MarkdownPreview content={articleText} />}

      <Form.Input
        label='Tags'
        placeholder='tutorial, javascript, react (max 3 tags)'
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        required
      />
    </>
  );
}

export default ArticleForm;
