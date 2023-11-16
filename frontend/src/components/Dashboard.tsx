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
						<Title> Convert your thoughts into Tweets Fast!</Title>
						<Paragraph style={{ fontSize: '18px' }}>
							Start recording your thoughts. Please note that you can only record 30 seconds every
							time.
						</Paragraph>
					</div>
					<AudioComponent />
				</Flex>
			</div>
		</MainLayout>
	);
}
