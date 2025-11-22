// components/BarcodeScanner.jsx
import React, { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const BarcodeScanner = ({ onScanSuccess, onScanFailure }) => {
  useEffect(() => {
    
    const config = {
      fps: 10, 
      qrbox: { width: 250, height: 150 }, 
      aspectRatio: 1.0,
    };

    const scanner = new Html5QrcodeScanner("reader", config, false);

    scanner.render(
      (decodedText) => {
       
        onScanSuccess(decodedText);
        scanner.clear(); 
      },
      (error) => {
        
        if (onScanFailure) onScanFailure(error);
      }
    );

   
    return () => {
      scanner.clear().catch(error => console.error("Failed to clear scanner. ", error));
    };
  }, [onScanSuccess, onScanFailure]);

  return (
    <div className="scanner-container">
      <div id="reader" style={{ width: "100%" }}></div>
      <p style={{textAlign: 'center', color: 'white'}}>Point camera at the barcode</p>
    </div>
  );
};

export default BarcodeScanner;