import { useState } from 'react';

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [usernameError, setUsernameError] = useState('');

  function validateUsername(username) {
    if (username.length < 8) {
      setUsernameError('Username must be at least 8 characters long');
      return false;
    } else {
      setUsernameError('');
      return true;
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validateUsername(username)) {
      return;
    }

    const payload = { username, password };

    try {
      const response = await fetch(
        'https://fsa-jwt-practice.herokuapp.com/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setToken(result.token);
        console.log(result);
      } else {
        setError(result.message || 'Failed');
      }
    } catch (error) {
      setError(error.message);
    }
  }

  function handleUsernameChange(event) {
    setUsername(event.target.value);
    setUsernameError('');
  }

  return (
    <>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input value={username} onChange={handleUsernameChange} />
        </label>

        {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}

        <label>
          Password:
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>
    </>
  );
}
