'use client';

import { useState } from 'react';
import BarcodeScanner from '../components/BarcodeScanner';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const ProductInfo = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const ProductName = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const ProductPrice = styled.p`
  font-size: 20px;
  margin-bottom: 20px;
`;

const QuantityInput = styled.input`
  width: 50px;
  text-align: center;
  margin-right: 10px;
`;

const AddButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #008CBA;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const CartList = styled.ul`
  margin-top: 30px;
  list-style-type: none;
  padding: 0;
  width: 80%;
`;

const CartItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const TotalPrice = styled.h3`
  margin-top: 20px;
  font-size: 24px;
`;

const PurchaseButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default function Home() {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [scannedData, setScannedData] = useState('');

  const handleScan = (barcode) => {
    setScannedData(barcode);
    console.log('Scanned barcode:', barcode);

    // Simulate fetching product data from backend
    if (barcode === '1234567890123') {
      setProduct({ name: 'ペプシコーラ', price: 140 });
    } else {
      setProduct(null);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      setCart([...cart, { ...product, quantity }]);
      setProduct(null);
      setQuantity(1);
    }
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Container>
      <BarcodeScanner onScan={handleScan} />
      <p>Scanned Data: {scannedData}</p>
      {product && (
        <ProductInfo>
          <ProductName>{product.name}</ProductName>
          <ProductPrice>{product.price}円</ProductPrice>
          <QuantityInput
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
          />
          <AddButton onClick={handleAddToCart}>追加</AddButton>
        </ProductInfo>
      )}
      <h2>購入リスト</h2>
      <CartList>
        {cart.map((item, index) => (
          <CartItem key={index}>
            <span>{item.name} x {item.quantity}</span>
            <span>{item.price * item.quantity}円</span>
          </CartItem>
        ))}
      </CartList>
      <TotalPrice>合計: {totalPrice}円</TotalPrice>
      <PurchaseButton onClick={() => alert('購入完了')}>購入する</PurchaseButton>
    </Container>
  );
}
