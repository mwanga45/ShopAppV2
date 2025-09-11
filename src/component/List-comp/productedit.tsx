
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

const sampleProducts: Product[] = [
  {
    id: "P001",
    name: "Wireless Headphones",
    category: "Electronics",
    type: "Audio",
    purchasePrice: 50.0,
    sellingPrice: 89.99,
  },
  {
    id: "P002",
    name: "Coffee Mug",
    category: "Kitchen",
    type: "Drinkware",
    purchasePrice: 5.0,
    sellingPrice: 12.99,
  },
  {
    id: "P003",
    name: "Laptop Stand",
    category: "Office",
    type: "Accessories",
    purchasePrice: 25.0,
    sellingPrice: 45.99,
  },
  {
    id: "P004",
    name: "Bluetooth Speaker",
    category: "Electronics",
    type: "Audio",
    purchasePrice: 30.0,
    sellingPrice: 59.99,
  },
  {
    id: "P005",
    name: "Desk Lamp",
    category: "Office",
    type: "Lighting",
    purchasePrice: 20.0,
    sellingPrice: 39.99,
  },
]

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
  
    setTimeout(() => {
      setProducts(sampleProducts)
      setIsLoaded(true)
    }, 500)
  }, [])

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">Product Inventory</h2>

      <div className="product-list-wrapper">
        <ul className="product-list">

          <li className="product-list-header">
            <div className="product-id">Product ID</div>
            <div className="product-name">Product Name</div>
            <div className="product-category">Product Category</div>
            <div className="product-type">Product Type</div>
            <div className="purchase-price">Purchase Price</div>
            <div className="selling-price">Selling Price</div>
          </li>

          {products.map((product, index) => (
            <li
              key={product.id}
              className={`product-list-item ${isLoaded ? "animate-in" : ""}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="product-id">{product.id}</div>
              <div className="product-name">{product.name}</div>
              <div className="product-category">{product.category}</div>
              <div className="product-type">{product.type}</div>
              <div className="purchase-price">${product.purchasePrice.toFixed(2)}</div>
              <div className="selling-price">${product.sellingPrice.toFixed(2)}</div>
            </li>
          ))}
        </ul>

        {!isLoaded && (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading products...</p>
          </div>
        )}
      </div>
    </div>
  )
}
