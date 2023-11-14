import React from 'react';
import './App.css';

import { Flex, Typography } from 'antd';
import AudioComponent from './components/AudioComponent';

const { Title, Paragraph } = Typography;

function App() {
  return (
    <div className="App">
      <Flex vertical>
        <div style={{ margin: 'auto', textAlign: 'left' }}>
          <Title> Record Your Moments</Title>
          <Paragraph style={{ fontSize: '18px' }}>
            Start recording your thoughts
          </Paragraph>
        </div>
        <AudioComponent />
      </Flex>
    </div>
  );
}

export default App;
