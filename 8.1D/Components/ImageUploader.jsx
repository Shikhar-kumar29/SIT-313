import { Form, Segment, Image, Header, Button, Icon } from 'semantic-ui-react';

function ImageUploader({ image, setImage, imagePreview, setImagePreview }) {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  return (
    <>
      <Form.Field>
        <label>Upload Image (Optional)</label>
        <Button
          as="label"
          htmlFor="image-upload"
          icon
          labelPosition="left"
          basic
        >
          <Icon name="image" />
          Choose Image
        </Button>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </Form.Field>

      {imagePreview && (
        <Segment>
          <Header as="h4">Image Preview:</Header>
          <Image src={imagePreview} size="medium" />
          <Button 
            basic 
            color="red" 
            onClick={removeImage}
            style={{ marginTop: '1rem' }}
          >
            Remove Image
          </Button>
        </Segment>
      )}
    </>
  );
}

export default ImageUploader;
