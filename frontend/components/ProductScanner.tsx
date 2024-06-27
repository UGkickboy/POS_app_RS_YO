// frontend/components/ProductScanner.tsx
"use client";

import { useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const ProductScanner = ({ onScan }) => {
  const [showScanner, setShowScanner] = useState(false);

  const handleScan = (data) => {
    if (data) {
      onScan(data);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const startScanner = () => {
    setShowScanner(true);
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      /* verbose= */ false
    );
    scanner.render(handleScan, handleError);
  };

  return (
    <div>
      <button onClick={startScanner}>カメラを表示</button>
      {showScanner && <div id="reader" style={{ width: '300px' }}></div>}
    </div>
  );
};

export default ProductScanner;
