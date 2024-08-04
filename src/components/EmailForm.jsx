import React, { useState } from 'react';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://mighty-island-16463-cdb9931bccaa.herokuapp.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(result.message);
      } else {
        setMessage('Failed to save email');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while saving the email');
    }
  };

  return (
    <form onSubmit={handleEmailSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />
      <button type="submit">Submit</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default EmailForm;