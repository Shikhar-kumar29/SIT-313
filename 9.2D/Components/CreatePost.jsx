import { useState } from 'react';
import { Form, Message, Segment, Header, Icon } from 'semantic-ui-react';
import { db, storage } from '../Firebase/firebase-config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
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
      let imageUrl = null;
      if (image) {
        const imageRef = ref(storage, `images/${Date.now()}_${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      const postData = {
        type: postType,
        title: formData.title,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        createdAt: serverTimestamp(),
        imageUrl,
        code: formData.code || null
      };

      if (postType === 'question') {
        postData.description = formData.description;
        await addDoc(collection(db, 'questions'), postData);
      } else {
        postData.abstract = formData.abstract;
        postData.articleText = formData.articleText;
        await addDoc(collection(db, 'articles'), postData);
      }

      setSuccess(true);
      setTimeout(() => {
        setFormData({ title: '', description: '', tags: '', abstract: '', articleText: '', code: '' });
        setImage(null);
        setImagePreview(null);
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
          />

          <SubmitButton loading={loading} />
        </Form>
      </Segment>
    </div>
  );
}

export default CreatePost;
