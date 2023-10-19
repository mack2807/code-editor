import React, { useState } from 'react';
import './App.css';


const App = () => {
  
  const [code, setCode] = useState(''); 
  const [isLocked, setIsLocked] = useState(false); 

  // Function to copy the code to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  // Function to save the code as a downloadable file
  const handleSave = () => {
    if (code) {
      // Create a Blob containing the code data
      const blob = new Blob([code], { type: 'text/plain' });
      // Create a URL for the Blob and create a download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'code.txt'; // Set the download file name
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      // Revoke the object URL and remove the download link from the DOM
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } else {
      // Show an alert if the code is empty and user tries to save
      alert('Code is empty. Please enter some code before saving.');
    }
  };

  // Function to toggle the lock/unlock status of the code editor
  const handleToggleLock = () => {
    setIsLocked(!isLocked);
  };

  // Function to handle input change in the code textarea
  const handleInputChange = (event) => {
    // Update the code only if the editor is not locked
    if (!isLocked) {
      setCode(event.target.value);
    }
  };

  // Function to handle tab key press for code indentation
  const handleKeyDown = (event) => {
    if (event.key === 'Tab' && !isLocked) {
      event.preventDefault();
      const { selectionStart, selectionEnd } = event.target;
      // Insert two spaces for indentation at the cursor position
      const newCode =
        code.substring(0, selectionStart) +
        '  ' + // Two spaces for indentation
        code.substring(selectionEnd);
      setCode(newCode);
      // Move the cursor position after the inserted spaces
      event.target.selectionStart = event.target.selectionEnd = selectionStart + 2;
    }
  };

  
  return (
    <div className="code-editor">
      <div className="title">
        <h1 >CODE EDITOR</h1> 
      </div>
      
      <div className="code-toolbar">
        <button onClick={handleCopy}>Copy</button>
        <button onClick={handleSave}>Save</button>
        <button onClick={handleToggleLock}>{isLocked ? 'Unlock' : 'Lock'}</button>
      </div>
      {/* Textarea for entering and displaying code */}
      <textarea
        className="code-input"
        value={code}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter your code here..." // Placeholder text for the textarea
      />
    </div>
  );
};


export default App;
