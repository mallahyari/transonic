import React from 'react';
import './App.css';

import { Flex, Typography } from 'antd';
import AudioComponent from './components/AudioComponent';

const { Title, Paragraph } = Typography;

function App() {
  return (
    <div className="App">
      <Flex vertical>
        <div style={{ margin: 'auto', textAlign: 'center' }}>
          <Title> Convert your thoughts into Tweets Fast!</Title>
          <Paragraph style={{ fontSize: '18px' }}>
            Start recording your thoughts. Please note that you can only record
            30 seconds every time.
          </Paragraph>
        </div>
        <AudioComponent />
      </Flex>
    </div>
  );
}

export default App;
