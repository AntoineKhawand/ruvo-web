import React from 'react';

const ComingSoon = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: 'Arial, sans-serif'
    }}>
      <img src="/public/Ruvo Logo Original.png" alt="Ruvo Logo" style={{ width: '150px', marginBottom: '20px' }} />
      <h1 style={{ fontSize: '48px', color: '#343a40' }}>Coming Soon</h1>
      <p style={{ fontSize: '18px', color: '#6c757d', marginBottom: '30px' }}>
        We are working hard to bring you something amazing. Stay tuned!
      </p>
    </div>
  );
};

export default ComingSoon;
