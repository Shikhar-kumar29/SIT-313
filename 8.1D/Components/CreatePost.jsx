import { useState } from 'react';
import { Container, Form, Message, Segment, Header } from 'semantic-ui-react';
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
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [abstract, setAbstract] = useState('');
  const [articleText, setArticleText] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      let imageUrl = null;

      // Upload image if exists
      if (image) {
        const imageRef = ref(storage, `images/${Date.now()}_${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      // Prepare post data
      const postData = {
        type: postType,
        title,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
        createdAt: serverTimestamp(),
        imageUrl
      };

      if (postType === 'question') {
        postData.description = description;
        // Save to questions collection
        await addDoc(collection(db, 'questions'), postData);
      } else {
        postData.abstract = abstract;
        postData.articleText = articleText;
        // Save to articles collection
        await addDoc(collection(db, 'articles'), postData);
      }

      setSuccess(true);
      
      // Reset form after 2 seconds
      setTimeout(() => {
        resetForm();
      }, 2000);
      
    } catch (err) {
      console.error('Error submitting post:', err);
      setError('Error submitting post: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setTags('');
    setAbstract('');
    setArticleText('');
    setImage(null);
    setImagePreview(null);
    setSuccess(false);
  };

  return (
    <Container style={{ marginTop: '2rem', marginBottom: '2rem' }}>
      <Segment padded="very">
        <Header as="h2" textAlign="center">
          Create a New Post
        </Header>
        
        {success && (
          <Message positive>
            <Message.Header>Success!</Message.Header>
            <p>Your {postType} has been posted successfully.</p>
          </Message>
        )}

        {error && (
          <Message negative>
            <Message.Header>Error</Message.Header>
            <p>{error}</p>
          </Message>
        )}

        <Form onSubmit={handleSubmit}>
          <PostTypeSelector postType={postType} setPostType={setPostType} />

          {postType === 'question' ? (
            <QuestionForm
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              tags={tags}
              setTags={setTags}
            />
          ) : (
            <ArticleForm
              title={title}
              setTitle={setTitle}
              abstract={abstract}
              setAbstract={setAbstract}
              articleText={articleText}
              setArticleText={setArticleText}
              tags={tags}
              setTags={setTags}
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
    </Container>
  );
}

export default CreatePost;
