
import { useState, useEffect } from "react"
import "./list.css"

interface Product {
  id: string
  name: string
  category: string
  type: string
  purchasePrice: number
  sellingPrice: number
}

interface EditProdoctProps {
  initialData: Product;
  onClose: () => void;
}

export default function EditProdoct({ initialData, onClose }: EditProdoctProps) {
  const [editedProduct, setEditedProduct] = useState<Product>(initialData);

  useEffect(() => {
    setEditedProduct(initialData);
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: name === "purchasePrice" || name === "sellingPrice" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Product:", editedProduct);
    // Here you would typically send the editedProduct to your backend
    onClose(); // Close the form after submission
  };

  return (
    <div className="edit-product-form">
      <h3 className="edit-form-title">Edit Product</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={editedProduct.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={editedProduct.category}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <input
            type="text"
            id="type"
            name="type"
            value={editedProduct.type}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="purchasePrice">Purchase Price</label>
          <input
            type="number"
            id="purchasePrice"
            name="purchasePrice"
            value={editedProduct.purchasePrice}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="sellingPrice">Selling Price</label>
          <input
            type="number"
            id="sellingPrice"
            name="sellingPrice"
            value={editedProduct.sellingPrice}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="Actin-btn">Save Changes</button>
          <button type="button" className="Actin-btn" onClick={onClose} style={{backgroundColor: '#e74c3c'}}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
