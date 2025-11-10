import { Form, Button, Image, Icon, Segment } from 'semantic-ui-react';
import { uploadArticleImage } from '../../imageupload';
import { validateImage, compressImage } from '../../imageUtils';

function ImageUploader({ image, setImage, imagePreview, setImagePreview, setImageType, setError }) {
  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (setError) {
      setError('');
    }

    // Validate image
    const { isValid, error } = validateImage(file);
    if (!isValid) {
      alert(error);
      if (setError) {
        setError(error);
      }
      e.target.value = '';
      return;
    }

    try {
      // Upload and get base64
      const { dataUrl } = await uploadArticleImage(file);
      // Compress for preview
      const previewDataUrl = await compressImage(dataUrl);

      setImage(file);
      setImagePreview(previewDataUrl);
      setImageType?.(file.type);
    } catch (err) {
      console.error('Error processing image:', err);
      const errorMsg = 'Failed to process image. Please try a different file.';
      alert(errorMsg);
      if (setError) {
        setError(errorMsg);
      }
      setImage(null);
      setImagePreview(null);
      setImageType?.(null);
    } finally {
      e.target.value = '';
    }
  };

  return (
    <>
      <Form.Field>
        <label>Image (Optional)</label>
        <Button as='label' htmlFor='image' icon labelPosition='left' basic>
          <Icon name='image' />
          Choose Image
        </Button>
        <input
          id='image'
          type='file'
          accept='image/*'
          onChange={handleChange}
          style={{ display: 'none' }}
        />
      </Form.Field>

      {imagePreview && (
        <Segment className='custom-segment'>
          <Image src={imagePreview} size='medium' rounded />
          <Button basic color='red' onClick={() => {
            setImage(null);
            setImagePreview(null);
            setImageType?.(null);
          }} style={{ marginTop: '1rem' }}>
            Remove
          </Button>
        </Segment>
      )}
    </>
  );
}

export default ImageUploader;
