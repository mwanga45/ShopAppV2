export interface Product {
  id?: number;
  product_name?: string;
  product_category?: 'wholesales' | 'retailsales' | '';
  product_type?: string;
  wholesales_price?: string | null;
  retailsales_price?: string | null;
  Total_stock?: number | null;
  Pnum?:number
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
export interface DiscInterface {
  product_id?: number;
  pnum?: string;
  Amount?: number;
  percentage?: PerceInterface;
  product_name?: string;
  Ws_price?: string | null;
  UpdateFlag?: boolean;
  perc?: number;
}
export interface Disc_requestInterface {
  product_id?: number;
  pnum?: number;
  Amount?: number;
  percentage?: PerceInterface;
  product_name?: string;
  Ws_price?: string | null;
  UpdateFlag?: boolean;
  perc?: number;
}
export interface PerceInterface {
  perce: number;
}

export interface FormCompProps {
  onClick?: () => void;
  onClose?: () => void;
  isOpen?: boolean;
  product_name?: string;
  product_id?: string;
  product_category?: string;
  product_type?: string;
  Rs_price?: string | null;
  Ws_price?: string | null;
  wpurchase_price?: string | null;
  rpurchase_price?: string | null;
  pId?: number;
}
export interface StockFormprops {
  onClose?: () => void;
  isOpen?: boolean;
}
export interface productInfoprops {
  id: number;
  product_category: string;
  product_name: string;
}
export interface SaleResponseOne{
    ProductId:number;
    Selling_price:number;
    Total_product:number;
}

export interface StockCheckData {
  totalstock: number;
  product_status: 'Enough' | 'Less' | string;
}

export interface StockCheckResponse {
  message: string;
  success: boolean;
  data: StockCheckData;
}

export interface DiscountItem {
  percentageDiscaunt: string;
  CashDiscount: number;
  start_from: number;
}

export interface DiscountData {
  filter_discont: DiscountItem[];
}

export interface DiscountResponse {
  message: string;
  success: boolean;
  data: DiscountData;
}

export interface DeviationData {
  Revenue: number;
  deviationFromMeanPercent: number;
  Expect_revenue: number;
  Exp_profit_pereach: number;
  Exp_Net_profit: number;
  Net_profit: number;
  Profit_deviation: number;
}

export interface DeviationResponse {
  message: string;
  success: boolean;
  data: DeviationData;
}

export interface SalesSummaryData {
  stock_check: StockCheckResponse;
  DiscontResult: DiscountResponse;
  CalculateDeviation: DeviationResponse;
}

export interface SalesSummaryResponse {
  message: string;
  success: boolean;
  data: SalesSummaryData;
}
export interface paymentstatus{
    Paid:'paid',
    Pending:'pending',
    Parctial: 'partialpaid' 
} 
export interface StockStatus{
  Enough:'Enough',
  NotEnough:'NotEnough'

}

export interface override{
  override: 'Override'
  
}
export interface UpdateStockDto {
  Total_pc_pkg_litre: number;
  ProductId: number;
  Expecte_profit: number;
  Net_profit: number;
  Discount_percentage?: number;
  Percentage_deviation?: number;
  Revenue: number;
  profit_deviation: number;
  Stock_status: StockStatus;
  paymentstatus: paymentstatus;
  override?: override;
}