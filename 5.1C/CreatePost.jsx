import React, { useState } from 'react';
import { Container, Header, Segment, Divider } from 'semantic-ui-react';
import PostTypeSelector from './PostTypeSelector.jsx';
import QuestionForm from './QuestionForm.jsx';
import ArticleForm from './ArticleForm.jsx';
import SubmitButton from './SubmitButton.jsx';

export default function CreatePost() {
  const [postType, setPostType] = useState('');
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [tags, setTags] = useState('');
  const [abstract, setAbstract] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    alert(
      `Post Created!\nType: ${postType}\nTitle: ${title}\n` +
      (postType === 'question'
        ? `Details: ${details}\nTags: ${tags}`
        : `Abstract: ${abstract}\nContent: ${content}\nTags: ${tags}`)
    );
  };

  return (
    <Container text style={{ marginTop: '2em' }}>
      <Segment>
        <Header as="h2">New Post</Header>

        {/* Post Type Selector */}
        <PostTypeSelector postType={postType} setPostType={setPostType} />

        {/* Divider only if a type is selected */}
        {postType && (
          <>
            <Divider />
            <Header as="h3" block>
              What do you want to ask or share
            </Header>
          </>
        )}

        {/* Conditional Rendering */}
        {postType === 'question' && (
          <QuestionForm
            title={title}
            setTitle={setTitle}
            details={details}
            setDetails={setDetails}
            tags={tags}
            setTags={setTags}
          />
        )}

        {postType === 'article' && (
          <ArticleForm
            title={title}
            setTitle={setTitle}
            abstract={abstract}
            setAbstract={setAbstract}
            content={content}
            setContent={setContent}
            tags={tags}
            setTags={setTags}
          />
        )}

        {postType && (
          <div style={{ marginTop: '2em' }}>
            <SubmitButton handleSubmit={handleSubmit} />
          </div>
        )}
      </Segment>
    </Container>
  );
}
