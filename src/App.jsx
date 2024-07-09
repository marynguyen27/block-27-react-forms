import { useState } from 'react';
import Authenticate from './components/Authenticate.jsx';
import SignUpForm from './components/SignUpForm.jsx';

export default function App() {
  const [token, setToken] = useState(null);
  return (
    <>
      <SignUpForm setToken={setToken} />
      <Authenticate token={token} />
    </>
  );
}
