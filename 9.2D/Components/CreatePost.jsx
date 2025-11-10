import { useState } from 'react';
import { Form, Message, Segment, Header, Icon } from 'semantic-ui-react';
import { db } from '../Firebase/firebase-config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import PostTypeSelector from './PostTypeSelector';
import QuestionForm from './QuestionForm';
import ArticleForm from './ArticleForm';
import ImageUploader from './ImageUploader';
import SubmitButton from './SubmitButton';

function CreatePost() {
  const [postType, setPostType] = useState('question');
  const [formData, setFormData] = useState({
    title: '', description: '', tags: '', abstract: '', 
    articleText: '', code: ''
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageType, setImageType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const updateField = (field, value) => 
    setFormData(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const imageData = imagePreview ? imagePreview.split(',')[1] ?? null : null;

      const postData = {
        type: postType,
        title: formData.title,
        description: formData.description,
        abstract: formData.abstract,
        articleText: formData.articleText,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        code: formData.code?.trim() || null,
        imageData,
        imageType: imageData ? (imageType || image?.type || null) : null,
        createdAt: serverTimestamp(),
      };

      if (!postData.imageData) {
        delete postData.imageData;
        delete postData.imageType;
      }

      if (postData.tags.length === 0) {
        delete postData.tags;
      }

      if (!postData.code) {
        delete postData.code;
      }

      await addDoc(collection(db, 'posts'), postData);
      setSuccess(true);
      setFormData({ title: '', description: '', tags: '', abstract: '', articleText: '', code: '' });
      setImage(null);
      setImagePreview(null);
      setImageType(null);
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ The JSX return should be here, outside handleSubmit
  return (
    <div className='page-container animate-in'>
      <Segment className='custom-segment' style={{ padding: '2rem' }}>
        <Header as='h2' textAlign='center' style={{ color: '#1e1e1e', marginBottom: '2rem' }}>
          <Icon name='pencil alternate' color='blue' />
          Create New Post
        </Header>

        {success && (
          <Message positive icon>
            <Icon name='check circle' />
            <Message.Content>
              <Message.Header>Success!</Message.Header>
              Your {postType} has been published.
            </Message.Content>
          </Message>
        )}

        {error && (
          <Message negative icon>
            <Icon name='warning' />
            <Message.Content>
              <Message.Header>Error</Message.Header>
              {error}
            </Message.Content>
          </Message>
        )}

        <Form onSubmit={handleSubmit}>
          <PostTypeSelector postType={postType} setPostType={setPostType} />

          {postType === 'question' ? (
            <QuestionForm
              title={formData.title}
              setTitle={(v) => updateField('title', v)}
              description={formData.description}
              setDescription={(v) => updateField('description', v)}
              tags={formData.tags}
              setTags={(v) => updateField('tags', v)}
              code={formData.code}
              setCode={(v) => updateField('code', v)}
            />
          ) : (
            <ArticleForm
              title={formData.title}
              setTitle={(v) => updateField('title', v)}
              abstract={formData.abstract}
              setAbstract={(v) => updateField('abstract', v)}
              articleText={formData.articleText}
              setArticleText={(v) => updateField('articleText', v)}
              tags={formData.tags}
              setTags={(v) => updateField('tags', v)}
              code={formData.code}
              setCode={(v) => updateField('code', v)}
            />
          )}

          <ImageUploader
            image={image}
            setImage={setImage}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            setImageType={setImageType}
            setError={setError}
          />

          <SubmitButton loading={loading} />
        </Form>
      </Segment>
    </div>
  );
}

export default CreatePost;
