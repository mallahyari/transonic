import React, { ReactNode } from 'react';
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';
import { SignOutButton } from '@clerk/clerk-react';
import { LogoutOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

interface MainLayoutProps {
	children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const signout = () => {};

	return (
		<Layout className="layout">
			<Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
				<div className="demo-logo" />
				<SignOutButton>
					<Button type="primary" icon={<LogoutOutlined />}>
						Sign out
					</Button>
				</SignOutButton>
			</Header>
			<Content style={{ padding: '0 50px', minHeight: '100vh', background: colorBgContainer }}>
				{children}
			</Content>
			{/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer> */}
		</Layout>
	);
};

export default MainLayout;
