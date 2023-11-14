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
					<Title> Record Your Thoughts</Title>
					<Paragraph style={{ fontSize: '18px' }}>
						Start recording your thoughts. Please note that you can only record 60 second audio
						files.
					</Paragraph>
				</div>
				<AudioComponent />
			</Flex>
		</div>
	);
}

export default App;
