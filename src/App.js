// App.js
import React, { useState } from 'react';
import BarcodeScanner from './components/BarcodeScanner';
import { FaCamera } from 'react-icons/fa'; // Assuming you use react-icons

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  // This function runs when the scanner detects a number
  const handleScan = (decodedText) => {
    // FILTER LOGIC: 
    // Even though scanners are accurate, sometimes you want to ensure
    // it only accepts numbers.
    const cleanNumber = decodedText.replace(/[^0-9]/g, ''); // Remove non-numeric chars if needed
    
    setInputValue(cleanNumber);
    setShowScanner(false); // Close camera
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Barcode Input</h2>

      {/* The Input Field Container */}
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Tracking Number:</label>
        
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type or Scan..."
          style={{
            width: '100%',
            padding: '10px 40px 10px 10px', // Extra right padding for icon
            fontSize: '16px'
          }}
        />

        {/* The Camera Icon Trigger */}
        <FaCamera 
          onClick={() => setShowScanner(true)}
          style={{
            position: 'absolute',
            right: '10px',
            top: '38px', // Adjust based on your layout
            cursor: 'pointer',
            color: '#007bff',
            fontSize: '20px'
          }}
        />
      </div>

      {/* Conditional Rendering: Only show scanner if icon was clicked */}
      {showScanner && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <button onClick={() => setShowScanner(false)} style={closeBtnStyle}>X</button>
            <h3>Scanning...</h3>
            <BarcodeScanner onScanSuccess={handleScan} />
          </div>
        </div>
      )}
      
      <button style={{ marginTop: '10px', padding: '10px 20px' }}>Submit</button>
    </div>
  );
};

// Simple styles for the popup modal
const modalStyle = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.8)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  zIndex: 1000
};

const modalContentStyle = {
  backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '90%', maxWidth: '350px'
};

const closeBtnStyle = {
  float: 'right', background: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px'
};

export default App;