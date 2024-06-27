"use client";

import { useState } from 'react';
import styled from 'styled-components';
import ProductScanner from '../components/ProductScanner';
import ProductList from '../components/ProductList';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 15px 32px;
  text-align: center;
  font-size: 16px;
  margin: 10px 2px;
  cursor: pointer;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  font-size: 16px;
`;

export default function Home() {
  const [barcode, setBarcode] = useState('');
  const [scannedData, setScannedData] = useState('');
  const [productList, setProductList] = useState([]);
  const [total, setTotal] = useState(0);

  const handleScan = (data) => {
    if (data) {
      setScannedData(data);
      fetchProduct(data);
    }
  };

  const fetchProduct = async (barcode) => {
    const response = await fetch(`http://localhost:8000/products/${barcode}`);
    const product = await response.json();
    if (product) {
      const updatedProductList = [...productList, product];
      setProductList(updatedProductList);
      calculateTotal(updatedProductList);
    }
  };

  const calculateTotal = (products) => {
    const total = products.reduce((sum, product) => sum + product.price, 0);
    setTotal(total);
  };

  const handleAddProduct = () => {
    if (scannedData) {
      fetchProduct(scannedData);
      setScannedData('');
    }
  };

  return (
    <Container>
      <Title>POSシステム</Title>
      <Input
        type="text"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        placeholder="商品コードを入力"
      />
      <Button onClick={handleAddProduct}>商品コード読み込み</Button>
      <ProductScanner onScan={handleScan} />
      <div>
        <h3>スキャンされたデータ: {scannedData}</h3>
        <h3>購入リスト</h3>
        <ProductList products={productList} />
        <h3>合計: {total}円</h3>
      </div>
      <Button onClick={() => alert('購入完了')}>購入する</Button>
    </Container>
  );
}
