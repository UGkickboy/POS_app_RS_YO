'use client';

import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import Quagga from 'quagga';
import styled from 'styled-components';

const ScannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const ScanButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const BarcodeScanner = ({ onScan }) => {
  const webcamRef = useRef(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (!scanning) return;

    Quagga.init({
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: webcamRef.current.video, // Or '#yourElement' (optional)
        constraints: {
          width: 640,
          height: 480,
          facingMode: 'environment', // or user
        },
      },
      decoder: {
        readers: ['ean_reader', 'ean_8_reader', 'upc_reader', 'upc_e_reader', 'code_128_reader'], // Add other barcode readers if needed
      },
    }, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Initialization finished. Ready to start');
      Quagga.start();
    });

    Quagga.onDetected((data) => {
      onScan(data.codeResult.code);
      Quagga.stop();
      setScanning(false);
    });

    return () => {
      Quagga.stop();
    };
  }, [scanning]);

  const startScanning = () => {
    setScanning(true);
  };

  return (
    <ScannerContainer>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="100%"
      />
      <ScanButton onClick={startScanning}>Start Scanning</ScanButton>
    </ScannerContainer>
  );
};

export default BarcodeScanner;
