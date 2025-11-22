import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BarcodeScanner from './components/Scanner'

function App() {
  const [scannedNumber, setScannedNumber] = useState('')
  const [isScanning, setIsScanning] = useState(true)

  const handleScan = (decodedText) => {
    // Filter to keep only numbers
    const numbersOnly = decodedText.replace(/[^0-9]/g, '')
    setScannedNumber(numbersOnly)
    setIsScanning(false) // Scanner clears itself, but we track state to show "Scan Again" button
  }

  const handleRestart = () => {
    setScannedNumber('')
    setIsScanning(true)
  }

  return (
    <div className="app-container">
      <h1>Barcode Scanner</h1>

      <div className="input-group">
        <label>Detected Number:</label>
        <input
          type="text"
          value={scannedNumber}
          readOnly
          placeholder="Waiting for scan..."
          className="result-input"
        />
      </div>

      <div className="scanner-wrapper">
        {isScanning ? (
          <BarcodeScanner onScanSuccess={handleScan} />
        ) : (
          <button onClick={handleRestart} className="restart-btn">
            Scan Again
          </button>
        )}
      </div>
    </div>
  )
}

export default App
