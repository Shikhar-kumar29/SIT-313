import { Segment, Header } from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';

function MarkdownPreview({ content }) {
  if (!content) return null;

  return (
    <Segment className='custom-segment' style={{ background: '#f8f9fa' }}>
      <Header as='h5' style={{ color: '#667eea' }}>Preview</Header>
      <div style={{ 
        padding: '1rem',
        lineHeight: '1.6',
        minHeight: '100px'
      }}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </Segment>
  );
}

export default MarkdownPreview;
