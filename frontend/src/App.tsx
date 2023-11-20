import React from 'react';
import './App.css';
import { Analytics } from '@vercel/analytics/react';
import { ConfigProvider } from 'antd';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from '@clerk/clerk-react';
import Dashboard from './components/Dashboard';

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw 'Missing Publishable Key';
}

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: '"Montserrat", sans-serif',
          },
        }}
      >
        <SignedIn>
          <Dashboard />
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
        <Analytics />
      </ConfigProvider>
    </ClerkProvider>
  );
}

export default App;
