import React from 'react';
import { auth } from './FirebaseComponent';

const Logout = () => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('User logged out successfully');
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
