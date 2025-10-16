import { Form, Button, Image, Icon, Segment } from 'semantic-ui-react';

function ImageUploader({ image, setImage, imagePreview, setImagePreview }) {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
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
          }} style={{ marginTop: '1rem' }}>
            Remove
          </Button>
        </Segment>
      )}
    </>
  );
}

export default ImageUploader;
