import styled from 'styled-components';

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const ProductList = ({ products }) => {
  return (
    <List>
      {products.map((product, index) => (
        <ListItem key={index}>
          <span>{product.product_name}</span>
          <span>{product.price}円</span>
        </ListItem>
      ))}
    </List>
  );
};

export default ProductList;
