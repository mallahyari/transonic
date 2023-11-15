import React from 'react';
import './App.css';

import { Flex, Typography } from 'antd';
import AudioComponent from './components/AudioComponent';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  RedirectToSignIn,
} from '@clerk/clerk-react';
import Dashboard from './components/Dashboard';

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw 'Missing Publishable Key';
}

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function PublicPage() {
  return (
    <>
      <h1>Public page</h1>
      <a href="/protected">Go to protected page</a>
    </>
  );
}

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <SignedIn>
        <Dashboard />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  );
}

export default App;
