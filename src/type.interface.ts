import type React from "react";

export interface ServiceIcon {
  name: string;
  icon: React.ReactNode;
  color: string;
  icon_name:string
}

export interface ServiceCategory {
  category: string;
  icons: ServiceIcon[];
}

export interface ServiceIconchoose {
  Icon: ServiceCategory[];
}

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

export const paymentvia = {
  Bank: 'bank',
  Cash: 'cash'
} as const;

export type PaymentVia = typeof paymentvia[keyof typeof paymentvia]; 
export interface StockStatus{
  Enough:'Enough',
  NotEnough:'NotEnough'

}

export interface override{
  override: 'Override'
  
}
export interface Salerequest {
  Total_pc_pkg_litre?: number;
  ProductId?: number;
  Expecte_profit?: number;
  Net_profit?: number;
  Discount_percentage?: string;
  Percentage_deviation?: number ;
  Revenue?: number | null;
  profit_deviation?: number;
  Stock_status?: string;
  paymentstatus?: string;
  payment_via?: PaymentVia;
}
export interface FetchLastRec {
  Total_pc_pkg_litre?: number;
  Revenue?: number;
  Net_profit?: number;
  Expected_Profit?: number;
  profit_deviation?: string;
  percentage_deviation?: string;
  percentage_discount?: string;
  paymentstatus?: string;
  product: {
    product_name?: string;
  };
  Onclick?:() => void
}

export interface SalesRecord {
  product_id?: number;
  product_name?: string;
  product_category?: string;
  seller?: string;
  total_quantity?: string;
  total_revenue?: string;
  total_profit?: string;
  status?:string
}

export interface SalesSummaryDatasales {
  Normalsaleswholereturn?: SalesRecord[];
  Normalsalesretailreturn?: SalesRecord[];
  Pendingsalesreturn?:SalesRecord[];
  AllDebtRecord?:DebtRecord[]
  Allcombined?: SalesRecord[];
  totalRevenue?: number;
  totalWholeRevenue?: number;
  totolRetailRevenue?: number;
  category?:string
  Onclick:(id:string) => void
}

export type Result = {
  title_name: string;
  total_value: number;
  color: any;
  ispending?:boolean
  howmany?:number
};
export interface SalesSummaryResponsesales {
  data: SalesSummaryDatasales;
}

export interface Debtinfo{
  Debtor_name?:string
  paidmoney?:number
  Phone_number?:string
  location?:string
  PaymentDateAt?:Date

}

 export interface DebtorOtherinfoProps {
    Debtnumber?: number,
    countUnpaid?: number,
    countpaid?: number,
    CountPaidMoney?:number,
    countUnpaidMoney?: number,
    total_revenue?: number
    Location?:string
    Debtor_name?:string
    Phone_number?:string
    PaidOutDate?:number

}
export  interface PersonOverallDebtRec {
    Debtnumber?: number,
    countUnpaid?: number,
    countpaid?: number,
    CountPaidMoney?:number,
    countUnpaidMoney?: number,
    total_revenue?: number
    Location?:{
     Location?:string 
     Phone_number?:string
    }
    customer_name?:string
    PaidOutDate?:number
}
export interface DebtResponse {
    findUserDebtInfo?: DebtRecord[];
    findtrack?: TrackRecord[];
    PersonDebt?: DebtRecord[];
    PersonOverallDebtRec?:PersonOverallDebtRec
  
}

export interface DebtRecord {
  debt_id?: number;
  total_quantity?: string;
  total_revenue?: string;
  payment_status?: string;
  latest_paid_amount?: number;
  debtor_name?: string;
  phone_number?: string;
  product_name?: string;
  updated_at?: string;
  createdat?: string;
  deadlinedate?: string; 
  tracks?:TrackRecord[];
  Onclose?:() => void
  
}


export interface TrackRecord {
  paidmoney?: number;
  updated_at?:string
}


export interface CardDiscriptionInterface {
  name?:string;
  date?:string;
  amount?:string;
  title?:string;
  id?:any
  Icon?:React.ElementType
  color:string
}
export interface CustomerInfo {
  Location?:string,
  phone_number?:string,
  customer_name?:string,
  Cid?:string
}
export interface UpdateDebt{
  
}
export interface ICreateOrder {
  product_name?: string;
  client_name?: string;
  client_phone?: string;
  OrderDate?: string;
  paidMoney?: number;
  payamount?: number;
  Quantity?: string;
  Phone_number?: string;
  Orderstatus?: string;
  Order_Description?: string;
}

export interface Oncloseform {
  onclose?: ()=> void
}

export interface ProductItem {
  product_name?: string;
  selling_price?: string;
}
export interface CombinedProductUNoN {
  combinedResult?: ProductItem[]
}

export interface weekChartData {
  day: string;
  Revenue: number;
  Date?: string;
  Quantity?: number;
  product_id?: number;
  product_name?: string;
}

export interface ChartPops {
  Thisweek?: weekChartData[];
  LastWeek?: weekChartData[];
  RevenueRateChange?: Array<{
    date?: string | Date;
    rate?: number;
  }>;
}


export interface TodayRev {
  generated_today?: string;
  bankRevenue?: string;
}

export interface RevenueRatechange {
  date?: string | Date;
  rate?: number;

}
export interface ShowInfoCard {
   totalAmount?:string,
   discription?:string,
   rate?:number,
   rate_status?:string
}
export interface PendingReturnResult {
  id?:number
  product_id?: number;
  product_name?: string;
  seller?: string;
  Revenue?: string;
  revenue?: string; // Backend returns lowercase
  total_quantity?: string | number; 
  CreatedAt?: string;
  createdat?: string; // Backend returns lowercase
  Category?: string;
  category?: string; // Backend returns lowercase
}
export interface TokenPayload {
  sub: string | null;
  email: string | null;
  role: string | null;
  fullname:string |null
}
export interface TransactionInterface{
  capital?:number
  withdraw?:number
}