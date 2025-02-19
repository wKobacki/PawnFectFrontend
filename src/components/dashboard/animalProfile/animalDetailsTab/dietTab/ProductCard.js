import "./ProductCard.css";

const ProductCard = ({ product, handleRemove }) => {
  return (
    <div className="product-card">
      <div className="product-details">
        <p> {product.name}</p>
        <p>Dawkowanie: {product.description}</p>
      </div>
      <button onClick={() => handleRemove(product)}>Usuń</button>
    </div>
  );
};

export default ProductCard;
