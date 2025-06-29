import React, { useEffect, useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(async () => {
      const newCount = await window.electronAPI.getCounter();
      setCount(newCount);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h2>Electron Background Counter</h2>
      <p style={{ fontSize: '48px' }}>{count}</p>
    </div>
  );
}

export default App;
