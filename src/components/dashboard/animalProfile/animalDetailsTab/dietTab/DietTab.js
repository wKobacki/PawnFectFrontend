import { useEffect, useState } from "react";
import { addPetProduct, removePetProduct } from "../../../../../api/petApi";
import { useAnimal } from "../../../../../context/AnimalContext";
import ProductCard from "./ProductCard";
import "./DietTab.css";

const DietTab = ({ animal }) => {
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const { triggerRefresh } = useAnimal();
  const [newProductData, setNewProductData] = useState({
    productName: "",
    isAllergic: false,
    productDescription: "",
  });

  useEffect(() => {
    setProducts(animal.diet || []);
  }, [animal.diet]);

  const handleAddFood = async () => {
    try {
      const newProduct = await addPetProduct(animal.id, newProductData);
      if (!newProduct) {
        throw new Error("Nie mozna dodac produktu");
      }
      setProducts([...products, newProduct]);
      setNewProductData({
        productName: "",
        isAllergic: false,
        productDescription: "",
      });
      setShowAddForm(false);
      triggerRefresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveProduct = async (product) => {
    const idx = products.findIndex((p) => p.id === product.id);
    products.splice(idx, 1);
    setProducts(products);
    await removePetProduct(product.id);
    triggerRefresh();
  };

  return (
    <div className="diet-info-container">
      <div className="diet-column">
        <h3>Alergeny</h3>
        <ul>
          {products.length > 0 ? (
            products
              .filter((p) => p.is_allergic)
              .map((item, index) => (
                <ProductCard
                  product={item}
                  key={index}
                  handleRemove={handleRemoveProduct}
                />
              ))
          ) : (
            <p>Brak danych o alergiach.</p>
          )}
        </ul>
      </div>
      <div className="diet-column">
        <h3>Żywienie</h3>
        <ul>
          {products.length > 0 ? (
            products
              .filter((p) => !p.is_allergic)
              .map((item, index) => (
                <ProductCard
                  product={item}
                  key={index}
                  handleRemove={handleRemoveProduct}
                />
              ))
          ) : (
            <p>Brak danych o dobrym żywieniu.</p>
          )}
        </ul>
      </div>
      <button onClick={() => setShowAddForm(true)} className="add-food-button">
        Dodaj produkt
      </button>

      {showAddForm && (
        <div className="add-food-form">
          <h3>Dodaj nowy produkt</h3>
          <input
            type="text"
            placeholder="Nazwa produktu"
            value={newProductData.productName}
            onChange={(e) =>
              setNewProductData({
                ...newProductData,
                productName: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Dawkowanie produktu"
            value={newProductData.productDescription}
            onChange={(e) =>
              setNewProductData({
                ...newProductData,
                productDescription: e.target.value,
              })
            }
          />
          <label>
            Alergen
            <input
              type="checkbox"
              checked={newProductData.isAllergic}
              onChange={() =>
                setNewProductData({
                  ...newProductData,
                  isAllergic: !newProductData.isAllergic,
                })
              }
            />
          </label>
          <button onClick={handleAddFood} className="addd-food-button">
            Dodaj
          </button>
          <button
            onClick={() => setShowAddForm(false)}
            className="cancel-food-button"
          >
            Anuluj
          </button>
        </div>
      )}
    </div>
  );
};

export default DietTab;
