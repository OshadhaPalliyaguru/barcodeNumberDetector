import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BarcodeScanner from './components/Scanner'

function App() {
  const [scannedNumber, setScannedNumber] = useState('')
  const [isScanning, setIsScanning] = useState(true)
  const [scanError, setScanError] = useState('')
  const [rawValue, setRawValue] = useState('')

  const handleScan = (decodedText) => {
    setRawValue(decodedText)
    // Filter to keep only numbers
    const numbersOnly = decodedText.replace(/[^0-9]/g, '')

    // RELAXED VALIDATION FOR DEBUGGING: Accept any number
    if (numbersOnly.length > 0) {
      setScannedNumber(numbersOnly)
      setScanError('')
      setIsScanning(false)
    } else {
      setScanError(`No numbers found in scan: "${decodedText}"`)
    }
  }

  const handleRestart = () => {
    setScannedNumber('')
    setScanError('')
    setRawValue('')
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
        {scanError && <p style={{ color: 'red', fontSize: '0.9em' }}>{scanError}</p>}
        {rawValue && <p style={{ color: 'gray', fontSize: '0.8em' }}>Raw Scan: {rawValue}</p>}
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
