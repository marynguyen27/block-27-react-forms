import React, { useEffect, useState } from 'react';
import './Authenticate.css';

export default function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');

  async function handleClick(event) {
    event.preventDefault();

    if (!token) {
      setError('Please sign up first!');
      return;
    }

    if (!validateUsername(username)) {
      return;
    }

    try {
      const response = await fetch(
        'https://fsa-jwt-practice.herokuapp.com/authenticate',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error('Failed to authenticate');
      }

      setSuccessMessage(result.message);
      if (result.data && result.data.username) {
        setUsername(result.data.username);
      } else {
        setUsername('UnknownUsername');
      }
    } catch (error) {
      setError(error.message);
    }
  }

  function validateUsername(username) {
    if (username.length < 8) {
      setUsernameError('Cannot Authenticate');
      return false;
    } else {
      setUsernameError('');
      return true;
    }
  }

  function handleUsernameChange(event) {
    setUsername(event.target.value);
    setUsernameError('');
  }

  return (
    <div className='authenticate-container'>
      <h2>Authenticate</h2>
      {successMessage && <p className='success-message'>{successMessage}</p>}
      <form onSubmit={handleClick}>
        <label>
          Username:
          <input
            type='text'
            value={username}
            onChange={handleUsernameChange}
            className='username-input'
          />
        </label>
        {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}
        {error && <p className='error-message'>{error}</p>}
        <button type='submit' className='submit-button'>
          Authenticate Token!
        </button>
      </form>
    </div>
  );
}
