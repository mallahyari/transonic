import React from 'react';
import AudioComponent from './AudioComponent';
import { Flex, Typography } from 'antd';
import MainLayout from './MainLayout';

const { Title, Paragraph } = Typography;

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="App">
        <Flex vertical>
          <div style={{ margin: 'auto', textAlign: 'center' }}>
            <Title> Turn Your Thoughts into Tweets Quickly!</Title>
            <Paragraph style={{ fontSize: '18px' }}>
              Record up to 30 seconds at a time. Turn into a tweet!
            </Paragraph>
          </div>
          <AudioComponent />
        </Flex>
      </div>
    </MainLayout>
  );
}
