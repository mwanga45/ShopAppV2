export interface Product {
  id: number;
  product_name: string;
  product_category: 'wholesales' | 'retailsales';
  product_type: string;
  wholesales_price: string | null;
  retailsales_price: string | null;
  Total_stock: number | null;
}
export interface wProduct {
  id: number;
  product_name: string;
  product_category: 'wholesales' 
  product_type: string;
  wholesales_price: string 
  Total_stock: number | null;
}

export interface rProduct {
  id: number;
  product_name: string;
  product_category: 'retailsales';
  product_type: string;
  retailsales_price: string 
  Total_stock: number | null;
}
export interface receiveProduct{
    wholesales:wProduct[];
    retailsales:rProduct[]
}