import { Form } from 'semantic-ui-react';

function ArticleForm({ 
  title, 
  setTitle, 
  abstract, 
  setAbstract, 
  articleText, 
  setArticleText, 
  tags, 
  setTags 
}) {
  return (
    <>
      <Form.Input
        label='Title'
        placeholder='Enter a descriptive title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <Form.TextArea
        label='Abstract'
        placeholder='Enter a 1-paragraph abstract'
        value={abstract}
        onChange={(e) => setAbstract(e.target.value)}
        rows={3}
        required
      />

      <Form.TextArea
        label='Article Text'
        placeholder='Enter your article content'
        value={articleText}
        onChange={(e) => setArticleText(e.target.value)}
        rows={8}
        required
      />

      <Form.Input
        label='Tags'
        placeholder='Please add up to 3 tags to describe your article (e.g., javascript, react, tutorial)'
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        required
      />
    </>
  );
}

export default ArticleForm;
