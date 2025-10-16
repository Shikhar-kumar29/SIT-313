import { useState } from 'react';
import { Dropdown, Segment } from 'semantic-ui-react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';

const languages = [
  { key: 'js', text: 'JavaScript', value: 'javascript' },
  { key: 'py', text: 'Python', value: 'python' },
  { key: 'java', text: 'Java', value: 'java' },
  { key: 'cpp', text: 'C++', value: 'cpp' },
];

const extensions = {
  javascript: javascript({ jsx: true }),
  python: python(),
  java: java(),
  cpp: cpp(),
};

function CodeEditor({ code, setCode }) {
  const [lang, setLang] = useState('javascript');

  return (
    <Segment className='custom-segment'>
      <Dropdown
        placeholder='Language'
        selection
        options={languages}
        value={lang}
        onChange={(e, { value }) => setLang(value)}
        style={{ marginBottom: '1rem' }}
      />
      <CodeMirror
        value={code}
        height="200px"
        extensions={[extensions[lang]]}
        onChange={setCode}
        theme="dark"
      />
    </Segment>
  );
}

export default CodeEditor;
