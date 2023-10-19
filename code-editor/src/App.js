import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [code, setCode] = useState('');
  const [isLocked, setIsLocked] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  const handleSave = () => {
    // Implement save functionality here
    alert('Code saved!');
  };

  const handleToggleLock = () => {
    setIsLocked(!isLocked);
  };

  const handleInputChange = (event) => {
    if (!isLocked) {
      setCode(event.target.value);
    }
  };

  return (
    <div className="code-editor">
      <div className="code-toolbar">
        <button onClick={handleCopy}>Copy</button>
        <button onClick={handleSave}>Save</button>
        <button onClick={handleToggleLock}>{isLocked ? 'Unlock' : 'Lock'}</button>
      </div>
      <textarea
        className="code-input"
        value={code}
        onChange={handleInputChange}
        placeholder="Enter your code here..."
      />
    </div>
  );
};

export default App;
