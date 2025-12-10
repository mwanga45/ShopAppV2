import "./form_comp.css";
import { RiCloseFill } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import { Submitbtn } from "../button/Submitbtn";
import { productRegister } from "./formservice";
import { Update_Product } from "../../AdminPanel/adminservice";
import { CreateDisCount } from "../../AdminPanel/adminservice";
import { StockCreate } from "../../stock/stockservice";
import { ProductInfo } from "./formservice";
import Toggle from "../button/toggle";
import { CreateDebtrecord, UpdateDebt } from "../../Sales/service/sales.api";
import { CombinedProduct, customerInfo, CreateOrder } from "../../central-api/central-api";
import { toast, ToastContainer } from "react-toastify";

import {
  salesRequestInfo,
  makesalesrequest,
} from "../../Sales/service/sales.api";
import type {
  CustomerInfo,
  Debtinfo,
  DebtRecord,
  FetchLastRec,
  ICreateOrder,
  Oncloseform,
  ProductItem,
  Salerequest,
  SalesSummaryResponse,
} from "../../type.interface";
import { paymentvia, type PaymentVia } from "../../type.interface";

import type {
  wProduct,
  rProduct,
  receiveProduct,
  DiscInterface,
  Disc_requestInterface,
  FormCompProps,
  StockFormprops,
  productInfoprops,
  SaleResponseOne,
  Product,
} from "../../type.interface";
import { ResultComp } from "../result/Resultcomp";
export default function FormComp({ onClose, isOpen = true }: FormCompProps) {
  const [close, setClose] = useState<boolean>(isOpen);
  const [formData, setFormData] = useState({
    product_name: "",
    product_category: "wholesales",
    product_type: "Solid",
    Rs_price: "",
    Ws_price: "",
    wpurchase_price: "",
    rpurchase_price: "",
  });

  const handleClose = () => {
    setClose(false);
    if (onClose) {
      onClose();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: any = {
        product_name: formData.product_name,
        product_category: formData.product_category,
        product_type: formData.product_type,
      };

      if (formData.product_category === "retailsales") {
        if (formData.Rs_price) payload.Rs_price = formData.Rs_price;
        if (formData.rpurchase_price)
          payload.rpurchase_price = formData.rpurchase_price;
      } else if (formData.product_category === "wholesales") {
        if (formData.Ws_price) payload.Ws_price = formData.Ws_price;
        if (formData.wpurchase_price)
          payload.wpurchase_price = formData.wpurchase_price;
      }
      const decison = window.confirm("are sure  you want to registration");
      if (!decison) {
        toast.success("successfully terminate the process");
        return;
      }
      await productRegister(payload);

      alert("Product registered successfully!");

      setFormData({
     product_name: "",
    product_category: "wholesales",
    product_type: "Solid",
    Rs_price: "",
    Ws_price: "",
    wpurchase_price: "",
    rpurchase_price: "",
      })
    } catch (error: any) {
      console.error(
        "Error registering product:",
        error.response ? error.response.data : error.message
      );
      alert(
        "Failed to register product: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  if (!close) {
    return null;
  }

  return (
    <div className="form-main-container">
      <ToastContainer />
      <div className="icon-conyainer">
        <div className="icon" onClick={handleClose}>
          <RiCloseFill color="white" size={30} fontWeight={500} />
        </div>
      </div>
      <div className="frm-container">
        <div className="form-title">
          <p>Product-Register</p>
        </div>
        <form className="main-form-content" onSubmit={handleSubmit}>
          <div className="input-value">
            <label htmlFor="ProductName">Product Name</label>
            <input
              type="text"
              name="product_name"
              id="ProductName"
              value={formData.product_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="two-column-inputs">
            <div className="input-value">
              <label htmlFor="product-category">Category</label>
              <select
                name="product_category"
                id="product-category"
                value={formData.product_category}
                onChange={handleChange}
              >
                <option value="wholesales">Wholesales</option>
                <option value="retailsales">Retailsales</option>
              </select>
            </div>
            <div className="input-value">
              <label htmlFor="product-type">Type</label>
              <select
                name="product_type"
                id="product-type"
                value={formData.product_type}
                onChange={handleChange}
              >
                <option value="Solid">Solid</option>
                <option value="Liquid">Liquid</option>
              </select>
            </div>
            {formData.product_category === "retailsales" && (
              <>
                <div className="input-value">
                  <label htmlFor="rs-price">Retail Price</label>
                  <input
                    type="text"
                    name="Rs_price"
                    id="rs-price"
                    value={formData.Rs_price}
                    onChange={handleChange}
                    placeholder="e.g., 6000"
                  />
                </div>
                <div className="input-value">
                  <label htmlFor="Rpurchase-price">Retailpurchase Price</label>
                  <input
                    type="text"
                    value={formData.rpurchase_price}
                    name="rpurchase_price"
                    id="purchase-price"
                    onChange={handleChange}
                    placeholder="e.g., 5000"
                  />
                </div>
              </>
            )}
            {formData.product_category === "wholesales" && (
              <>
                <div className="input-value">
                  <label htmlFor="ws-price">Wholesale Price</label>
                  <input
                    type="text"
                    name="Ws_price"
                    id="ws-price"
                    value={formData.Ws_price}
                    onChange={handleChange}
                    placeholder="e.g., 5500"
                  />
                </div>
                <div className="input-value">
                  <label htmlFor="Wpurchase-price">Wholepurchase Price</label>
                  <input
                    type="text"
                    value={formData.wpurchase_price}
                    name="wpurchase_price"
                    id="purchase-price"
                    onChange={handleChange}
                    placeholder="e.g., 5000"
                  />
                </div>
              </>
            )}
          </div>
          <div className="btn-container">
            <Submitbtn buttonName="Create-product" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export const EditProdoct: React.FC<FormCompProps> = ({
  product_category,
  product_id,
  product_type,
  product_name,
  wpurchase_price,
  Ws_price,
  Rs_price,
  rpurchase_price,
}) => {
  const [formData, setFormData] = useState({
    product_name: product_name,
    product_category: product_category,
    product_type: product_type,
    Rs_price: Rs_price,
    Ws_price: Ws_price,
    wpurchase_price: wpurchase_price,
    rpurchase_price: rpurchase_price,
    id: product_id,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: any = {
        product_name: formData.product_name,
        product_category: formData.product_category,
        product_type: formData.product_type,
        id: Number(product_id),
      };

      if (formData.product_category === "retailsales") {
        if (formData.Rs_price != null && formData.Rs_price !== "")
          payload.Rs_price = String(formData.Rs_price);
        if (formData.rpurchase_price != null && formData.rpurchase_price !== "")
          payload.rpurchase_price = String(formData.rpurchase_price);
      } else if (formData.product_category === "wholesales") {
        if (formData.Ws_price != null && formData.Ws_price !== "")
          payload.Ws_price = String(formData.Ws_price);
        if (formData.wpurchase_price != null && formData.wpurchase_price !== "")
          payload.wpurchase_price = String(formData.wpurchase_price);
      }
      if (window.confirm("Are sure you want to make this update")) {
        console.log(payload);
        const reponse = await Update_Product(payload);
        if (!reponse.data.success) {
          alert(reponse.data.message);
        }
        alert(reponse.data.message);
      }
    } catch (error: any) {
      console.error(
        "Error registering product:",
        error.response ? error.response.data : error.message
      );
      alert(
        "Failed to register product: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  if (!close) {
    return null;
  }

  return (
    <div className="frm-container">
      <div className="form-title">
        <p>{product_name}-Update</p>
      </div>
      <form className="main-form-content" onSubmit={handleSubmit}>
        <div className="input-value">
          <label htmlFor="ProductName">Product Name</label>
          <input
            type="text"
            name="product_name"
            id="ProductName"
            value={formData.product_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="two-column-inputs">
          <div className="input-value">
            <label htmlFor="product-category">Category</label>
            <select
              name="product_category"
              id="product-category"
              value={formData.product_category}
              onChange={handleChange}
            >
              <option value="wholesales">Wholesales</option>
              <option value="retailsales">Retailsales</option>
            </select>
          </div>
          <div className="input-value">
            <label htmlFor="product-type">Type</label>
            <select
              name="product_type"
              id="product-type"
              value={formData.product_type}
              onChange={handleChange}
            >
              <option value="Solid">Solid</option>
              <option value="Liquid">Liquid</option>
            </select>
          </div>
          {formData.product_category === "retailsales" && (
            <>
              <div className="input-value">
                <label htmlFor="rs-price">Retail Price</label>
                <input
                  type="text"
                  name="Rs_price"
                  id="rs-price"
                  value={formData.Rs_price || ""}
                  onChange={handleChange}
                  placeholder="e.g., 6000"
                />
              </div>
              <div className="input-value">
                <label htmlFor="Rpurchase-price">Retailpurchase Price</label>
                <input
                  type="text"
                  value={formData.rpurchase_price || ""}
                  name="rpurchase_price"
                  id="purchase-price"
                  onChange={handleChange}
                  placeholder="e.g., 5000"
                />
              </div>
            </>
          )}
          {formData.product_category === "wholesales" && (
            <>
              <div className="input-value">
                <label htmlFor="ws-price">Wholesale Price</label>
                <input
                  type="text"
                  name="Ws_price"
                  id="ws-price"
                  value={formData.Ws_price || ""}
                  onChange={handleChange}
                  placeholder="e.g., 5500"
                />
              </div>
              <div className="input-value">
                <label htmlFor="Wpurchase-price">Wholepurchase Price</label>
                <input
                  type="text"
                  value={formData.wpurchase_price || ""}
                  name="wpurchase_price"
                  id="purchase-price"
                  onChange={handleChange}
                  placeholder="e.g., 5000"
                />
              </div>
            </>
          )}
        </div>
        <div className="btn-container">
          <Submitbtn buttonName="Update" type="submit" />
        </div>
      </form>
    </div>
  );
};

export const StockRegForm: React.FC<StockFormprops> = ({
  onClose,
  isOpen = true,
}) => {
  const [isopen, setidopen] = useState<boolean>(isOpen);
  const [wproductInfo, setwproductInfo] = useState<productInfoprops[]>();
  const [rproductInfo, setrproductInfo] = useState<productInfoprops[]>();
  const [Hearder, setHearder] = useState<String>("Wholesales-Stock-Reg");
  const [isDefault, setisDefault] = useState<boolean>(false);
  const handleClose = () => {
    setidopen(!isopen);
    if (onClose) {
      onClose();
    }
  };
  const [StockData, setStockData] = useState({
    product_id: "",
    total_stock: "",
    product_category: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "product_category") {
      const selectedProduct =
        wproductInfo?.find((p) => String(p.id) === value) ||
        rproductInfo?.find((p) => String(p.id) === value);
      setStockData((prev) => ({
        ...prev,
        product_id: value,
        product_category: selectedProduct?.product_category || "",
      }));
    } else {
      setStockData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleChangeCategory = (next: boolean) => {
    setisDefault(next);
    setHearder(next ? "Retalsales-Stock-Reg" : "Wholesales-Stock-Reg");
  };
  useEffect(() => {
    const handleproductInfo = async () => {
      try {
        const response = await ProductInfo();
        setwproductInfo(response.data.ForWholesales);
        setrproductInfo(response.data.ForRetailsales);
      } catch (err) {
        console.error("Failed to connect  to server");
        throw err;
      }
    };
    handleproductInfo();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await StockCreate(StockData);
      if (!response.data.success) {
        alert(response.data.message);
        return;
      }
      toast.success(response.data.message);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return (
    <div className="form-main-container">
      <div className="icon-conyainer">
        <ToastContainer />
        <div className="icon" onClick={handleClose}>
          <RiCloseFill color="white" size={30} fontWeight={500} />
        </div>
      </div>
      <div className="frm-container">
        <div
          className="form-title"
          style={{ background: "#2A7B9B", display: "flex", columnGap: "10px" }}
        >
          <Toggle onChange={handleChangeCategory} checked={isDefault} />
          <p>{Hearder}</p>
        </div>
        <form className="main-form-content" onSubmit={handleSubmit}>
          <div className="input-value">
            <label htmlFor="product-category">Category</label>
            <select
              name="product_category"
              id="product-category"
              value={StockData.product_id}
              onChange={handleChange}
            >
              <option value="">Please select Product category</option>
              {!isDefault ? (
                wproductInfo ? (
                  wproductInfo.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.product_name}
                    </option>
                  ))
                ) : (
                  <option>No product in this category</option>
                )
              ) : rproductInfo ? (
                rproductInfo.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.product_name}
                  </option>
                ))
              ) : (
                <option value="">No product yet in this category</option>
              )}
            </select>
          </div>
          <div className="input-value">
            <label htmlFor="cat">Category</label>
            <input
              type="text"
              name="category"
              id="cat"
              value={StockData.product_category}
              onChange={handleChange}
              required
              readOnly
            />
          </div>
          <div className="input-value">
            <label htmlFor="stock">Stock Number</label>
            <input
              type="text"
              name="total_stock"
              id="stock"
              value={StockData.total_stock}
              onChange={handleChange}
              required
            />
          </div>
          <div className="btn-container">
            <Submitbtn buttonName="Create Stock" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export const SalesRecForm: React.FC<
  receiveProduct & { onClose?: () => void }
> = ({ wholesales, retailsales, onClose }) => {
  const [isWhole, setWhole] = useState<boolean>(true);
  const [close, setClose] = useState<boolean>(true);

  const handleClose = () => {
    setClose(false);
    if (onClose) {
      onClose();
    }
  };
  const [salesResponseOne, setsalesResponseOne] = useState<SaleResponseOne>({
    ProductId: 0,
    Selling_price: 0,
    Total_product: 0,
  });
  const [displayInfo, setdisplayInfo] = useState<Product>();
  const [salesSummary, setSalesSummary] = useState<SalesSummaryResponse | null>(
    null
  );
  const [wholeprodinfo, setWholeprodinfo] = useState<wProduct[]>([]);
  const [retailprodinfo, setretailprodinfo] = useState<rProduct[]>([]);
  const [makesales, setmakesales] = useState<Salerequest>();
  const [debtorInfo, setdebtorInfo] = useState<Debtinfo>();
  const [lastdata, setlastdata] = useState<FetchLastRec>();
  const [isdbfromOpen, setdbformOpen] = useState<boolean>(false);
  const [isreturned, setisreturned] = useState<boolean>(false);
  const [isSaleSummary, setisSaleSummary] = useState<boolean>(false);
  const [iscustomerexist, setiscustomerexist] = useState<boolean>(true);
  const [customerdetails, setcustomerdetails] = useState<CustomerInfo[]>([]);
  const [paymentVia, setPaymentVia] = useState<PaymentVia>(paymentvia.Cash);

  const handleDbfrmclose = () => {
    setdbformOpen(false);
  };
  const handleCloseReturnedresult = () => {
    setisreturned(false);
  };
  const handleBdformoption = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setiscustomerexist(!iscustomerexist);
  };
  const handleCustomerDetails = async () => {
    const response = await customerInfo();
    setcustomerdetails(response.data.data);
  };
  useEffect(() => {
    handleCustomerDetails();
    console.log(customerdetails);
  }, []);

  const handleOnsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const price = isWhole
      ? displayInfo?.wholesales_price
      : (displayInfo as any)?.retailsales_price;
    if (
      displayInfo?.Pnum == null ||
      price == null ||
      salesResponseOne.ProductId == null
    ) {
      const sentpayload: any = {
        ProductId: Number(salesResponseOne.ProductId),
        Selling_price: Number(price),
        Total_product: Number(displayInfo?.Pnum),
      };
      console.log(sentpayload);
      alert("make sure  all field have value");
      return;
    }

    const sentpayload: any = {
      ProductId: Number(salesResponseOne.ProductId),
      Selling_price: Number(price),
      Total_product: Number(displayInfo?.Pnum),
    };
    setmakesales((prev) => ({
      ...prev,
      ProductId: salesResponseOne.ProductId,
      Total_pc_pkg_litre: Number(displayInfo.Pnum),
    }));

    try {
      const response = await salesRequestInfo(sentpayload);
      console.log("Sales response:", response.data);
      if (!(response as any)?.data) {
        alert("No data returned from server");
        return;
      }
      setSalesSummary(response.data as SalesSummaryResponse);
      if ((response as any)?.data?.success === false) {
        alert((response as any)?.data?.message || "Request failed");
        return;
      }
      setisSaleSummary(true);
      setisreturned(false);
      setmakesales({
        paymentstatus: "",
        payment_via: paymentvia.Cash,
      });
      setPaymentVia(paymentvia.Cash);
    } catch (err: any) {
      console.error("Sales submit error:", err?.response?.data || err);
      alert(err?.response?.data?.message || "Failed to submit sales");
    }
  };
  const handleOnchangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const SelectedId = Number(e.target.value);
    setsalesResponseOne((prev) => ({ ...prev, ProductId: SelectedId }));
    const source = isWhole ? wholesales : retailsales;
    const selectproductInfo = source.find((p) => p.id === SelectedId) as any;
    if (selectproductInfo) {
      setdisplayInfo({
        product_category: selectproductInfo.product_category,
        Total_stock: selectproductInfo.Total_stock,
        wholesales_price: isWhole ? selectproductInfo.wholesales_price : "",
        retailsales_price: !isWhole ? selectproductInfo.retailsales_price : "",
        product_type: selectproductInfo.product_type,
        Pnum: 0,
      } as any);
    } else {
      setdisplayInfo({
        product_category: "",
        Total_stock: 0,
        wholesales_price: "",
        retailsales_price: "",
        product_type: "",
        Pnum: 0,
      } as any);
    }
  };
  const handlemakesales = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const discountList =
      salesSummary?.data.DiscontResult?.data?.filter_discont || [];
    const lastDiscount =
      discountList.length > 0
        ? discountList[discountList.length - 1]
        : undefined;

    const percentageDiscount = lastDiscount
      ? String(lastDiscount.percentageDiscaunt)
      : "0";

    const nextSales: Salerequest = {
      ProductId: Number(salesResponseOne.ProductId) || 0,
      Total_pc_pkg_litre: Number(displayInfo?.Pnum) || 0,
      Revenue: salesSummary?.data?.CalculateDeviation.data.Revenue ?? 0,
      Expecte_profit:
        salesSummary?.data?.CalculateDeviation.data.Exp_Net_profit ?? 0,
      Net_profit: salesSummary?.data?.CalculateDeviation.data.Net_profit ?? 0,
      Percentage_deviation:
        salesSummary?.data?.CalculateDeviation.data.deviationFromMeanPercent ??
        0,
      profit_deviation:
        salesSummary?.data?.CalculateDeviation.data.Profit_deviation ?? 0,
      Stock_status: salesSummary?.data?.stock_check.data.product_status ?? "",
      Discount_percentage: percentageDiscount,
      paymentstatus: makesales?.paymentstatus || "paid",
      payment_via: paymentVia || paymentvia.Cash,
    };

    if (!nextSales.Total_pc_pkg_litre || nextSales.Total_pc_pkg_litre <= 0) {
      alert("Please make sure you enter valid data");
      return;
    }

    if (
      nextSales.paymentstatus === "debt" ||
      nextSales.paymentstatus === "partialpaid"
    ) {
      // Validate required fields
      if (!debtorInfo?.Debtor_name || !debtorInfo?.Phone_number) {
        alert("Please fill in all required debtor information");
        return;
      }

      const debtPayload = {
        ...debtorInfo,
        paidmoney: Number(debtorInfo?.paidmoney) || 0,
      };


      const finaldebtPayload = {
        Debtor_name: debtPayload.Debtor_name,
        paidmoney: debtPayload.paidmoney,
        Phone_number: String(debtorInfo.Phone_number), // Convert to string as required by backend
        location: debtPayload.location || "",
        PaymentDateAt: debtPayload.PaymentDateAt,
      };

      // Create the sales data with correct field names
      const salesData = {
        Total_pc_pkg_litre: nextSales.Total_pc_pkg_litre,
        ProductId: nextSales.ProductId,
        Expected_profit: nextSales.Expecte_profit, // Fix field name
        Net_profit: nextSales.Net_profit,
        Discount_percentage: nextSales.Discount_percentage || "0",
        Percentage_deviation: nextSales.Percentage_deviation || 0,
        Revenue: nextSales.Revenue,
        profit_deviation: nextSales.profit_deviation,
        Stock_status: nextSales.Stock_status, // Fix field name
        paymentstatus: nextSales.paymentstatus,
        payment_via: nextSales.payment_via || paymentvia.Cash,
      };

      const sentWithDebt = { ...salesData, ...finaldebtPayload };
      console.log("Sending debt data:", sentWithDebt);

      try {
        const response = await CreateDebtrecord(sentWithDebt);
        if (!response.data.success) {
          alert(response.data.message);
          return;
        }

        toast.success("Debt record created successfully");

        setdebtorInfo({
          Debtor_name: "",
          paidmoney: undefined,
          location: "",
          Phone_number: undefined,
          PaymentDateAt: undefined,
        });
        setPaymentVia(paymentvia.Cash);
        setmakesales({
          Total_pc_pkg_litre: 0,
          ProductId: 0,
          Expecte_profit: 0,
          Net_profit: 0,
          Discount_percentage: "0",
          Percentage_deviation: 0,
          Revenue: 0,
          profit_deviation: 0,
          Stock_status: "",
          paymentstatus: "",
          payment_via: paymentvia.Cash,
        });
      } catch (err: any) {
        console.error("Debt creation error:", err);
        alert(
          "Error: failed to create debt record - " +
            (err.response?.data?.message || err.message)
        );
      }

      return;
    }
     console.log(nextSales)
    const confirm = window.confirm("Confirm sales?");
    if (!confirm) {
      setmakesales({
        Total_pc_pkg_litre: 0,
        ProductId: 0,
        Expecte_profit: 0,
        Net_profit: 0,
        Discount_percentage: "0",
        Percentage_deviation: 0,
        Revenue: 0,
        profit_deviation: 0,
        Stock_status: "",
        paymentstatus: "",
        payment_via: paymentvia.Cash,
      });
      setPaymentVia(paymentvia.Cash);
      toast.success("Successfully terminated process");

      return;
    }

    // Validate payment_via is selected
    if (!paymentVia) {
      alert("Please select a payment method (Bank or Cash)");
      return;
    }
    console.log(nextSales)
    try {
      const response = await makesalesrequest(nextSales);
      if (!response.data.success) {
        alert(response.data.message);
        return;
      }

      setlastdata(response.data.data);
      setmakesales({
        Total_pc_pkg_litre: 0,
        ProductId: 0,
        Expecte_profit: 0,
        Net_profit: 0,
        Discount_percentage: "0",
        Percentage_deviation: 0,
        Revenue: 0,
        profit_deviation: 0,
        Stock_status: "",
        paymentstatus: "",
        payment_via: paymentvia.Cash,
      });
      setPaymentVia(paymentvia.Cash);

      toast.success("Sales processed successfully");
      setisreturned(true);
    } catch (err) {
      console.error(err);
      alert("Error: failed to submit sale");
    }
  };

  useEffect(() => {
    if (!salesResponseOne.ProductId) {
      return;
    }
    const source = isWhole ? wholesales : retailsales;
    const selectproductInfo = source.find(
      (p: any) => p.id === salesResponseOne.ProductId
    ) as any;
    if (selectproductInfo) {
      setdisplayInfo((prev: any) => ({
        ...prev,
        wholesales_price: isWhole ? selectproductInfo.wholesales_price : "",
        retailsales_price: !isWhole ? selectproductInfo.retailsales_price : "",
      }));
    }
  }, [isWhole]);
  const handleCustomerSelection = (selectedCustomerName: string) => {
    console.log("Selected customer name:", selectedCustomerName);
    console.log("Available customers:", customerdetails);

    // Find the selected customer from the customerdetails array
    const selectedCustomer = customerdetails.find(
      (customer) => customer.customer_name === selectedCustomerName
    );

    console.log("Found customer:", selectedCustomer);

    if (selectedCustomer) {
      // Update debtorInfo with the selected customer's details
      const updatedInfo = {
        Debtor_name: selectedCustomer.customer_name,
        Phone_number: selectedCustomer.phone_number
          ? String(selectedCustomer.phone_number)
          : undefined,
        location: selectedCustomer.Location, // Use the correct field name from CustomerInfo interface
      };

      setdebtorInfo((prev) => ({
        ...prev,
        ...updatedInfo,
      }));

      console.log("Updated debtorInfo with:", updatedInfo);
    } else {
      console.log("Customer not found!");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "paymentstatus") {
      if (value === "partialpaid" || value === "debt") {
        setdbformOpen(true);
      }
      if (iscustomerexist) {
        setdebtorInfo((prev) => ({ ...prev }));
      }
      setmakesales((prev) => ({ ...prev, ["paymentstatus"]: value }));
    } else if (name === "payment_via") {
      // Handle payment method selection
      setPaymentVia(value as PaymentVia);
      setmakesales((prev) => ({ ...prev, payment_via: value as PaymentVia }));
    } else if (name === "Debtor_name" && iscustomerexist) {
      // Handle customer selection specifically when customer exists
      handleCustomerSelection(value);
    } else {
      // Handle all other fields including Debtor_name when customer doesn't exist
      setdisplayInfo((prev) => ({ ...prev, [name]: value }));
      setdebtorInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    console.log(debtorInfo);
  };
  useEffect(() => {
    if (wholesales && wholesales.length > 0) {
      setWholeprodinfo(wholesales);
    }
    if (retailsales && retailsales.length > 0) {
      setretailprodinfo(retailsales);
    }
  }, [wholesales, retailsales]);
  useEffect(() => {
    let timer1: number | null = null;
    let timer2: number | null = null;
    if (isSaleSummary) {
      timer1 = window.setInterval(() => {
        setisSaleSummary(false);
      }, 200000);
    }
    if (isreturned) {
      timer2 = window.setInterval(() => {
        setisreturned(false);
      }, 100000);
    }
    return () => {
      if (timer1) clearInterval(timer1);
      if (timer2) clearInterval(timer2);
    };
  }, [isSaleSummary, isreturned]);
  if (!close) {
    return null;
  }

  return (
    <div className="form-comp-container-above">
      <div className="form-main-container">
        <div className="icon-conyainer">
          <ToastContainer />
          <div className="icon" onClick={handleClose}>
            <RiCloseFill color="white" size={30} fontWeight={500} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{ fontSize: "45px", color: "white", fontWeight: "bolder" }}
          >
            Sales record
          </span>
        </div>
        <div className="main-conatiner-sales">
          <div className="frm-container" style={{ height: "690px" }}>
            <div
              className="form-title"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p>{isWhole ? "Whole sales Record" : "Retail sales Record"}</p>
              <button
                type="button"
                className="Actin-btn"
                onClick={() => setWhole((prev) => !prev)}
              >
                {isWhole ? "Switch to Retail" : "Switch to Wholesale"}
              </button>
            </div>
            <form className="main-form-content" onSubmit={handleOnsubmit}>
              <div className="form-container-decoration">
                <div className="input-value">
                  <label htmlFor="product-category">Product</label>
                  <select
                    name="product_category"
                    id="product-category"
                    value={salesResponseOne.ProductId}
                    onChange={handleOnchangeSelect}
                  >
                    <option value="">Select product</option>
                    {(isWhole ? wholeprodinfo : retailprodinfo).map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.product_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-value">
                  <label htmlFor="cat">Category</label>
                  <input
                    type="text"
                    name="category"
                    id="cat"
                    value={displayInfo?.product_category}
                    onChange={handleChange}
                    required
                    readOnly
                  />
                </div>
                <div className="input-value">
                  <label htmlFor="pT">Product Type </label>
                  <input
                    type="text"
                    name="pType"
                    id="pT"
                    value={displayInfo?.product_type}
                    onChange={handleChange}
                    required
                    readOnly
                  />
                </div>
                <div className="input-value">
                  <label htmlFor="pc">Price</label>
                  <input
                    type="text"
                    name={isWhole ? "wholesales_price" : "retailsales_price"}
                    id="pc"
                    value={
                      isWhole
                        ? displayInfo?.wholesales_price ?? ""
                        : (displayInfo as any)?.retailsales_price ?? ""
                    }
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-value">
                  <label htmlFor="Pnum">Product Number</label>
                  <input
                    type="text"
                    name="Pnum"
                    id="Pnum"
                    value={displayInfo?.Pnum}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="btn-container">
                  <Submitbtn buttonName="calculate sales" type="submit" />
                </div>
              </div>
            </form>
          </div>
          {isreturned && (
            <div className="enter-result-returned">
              <ResultComp
                Total_pc_pkg_litre={lastdata?.Total_pc_pkg_litre}
                Revenue={lastdata?.Revenue}
                Net_profit={lastdata?.Net_profit}
                Expected_Profit={lastdata?.Expected_Profit}
                profit_deviation={lastdata?.percentage_deviation}
                percentage_deviation={lastdata?.percentage_deviation}
                percentage_discount={lastdata?.percentage_discount}
                paymentstatus={lastdata?.paymentstatus}
                product={{
                  product_name: lastdata?.product.product_name,
                }}
                Onclick={handleCloseReturnedresult}
              />
            </div>
          )}

          {isSaleSummary && salesSummary && (
            <div className="SalesBord-dispaly">
              <div className="sales-board-wrapper">
                <div className="sales-card">
                  <h4>Stock Check</h4>
                  <p>
                    Status: {salesSummary.data.stock_check.data.product_status}
                  </p>
                  <p>
                    Total stock: {salesSummary.data.stock_check.data.totalstock}
                    .Pac
                  </p>
                </div>
                <div className="sales-card">
                  <h4>Discount</h4>
                  {salesSummary.data.DiscontResult?.data?.filter_discont
                    ?.length > 0 ? (
                    salesSummary.data.DiscontResult.data.filter_discont.map(
                      (d, idx) => (
                        <div key={idx} className="discount-row">
                          <span>
                            {Number(d.percentageDiscaunt).toFixed(2)}%
                          </span>
                          <span>Amount: {d.CashDiscount}.Tsh</span>
                          <span>Start from: {d.start_from}.Pac</span>
                        </div>
                      )
                    )
                  ) : (
                    <p>No discount available for this product</p>
                  )}
                </div>
                <div className="sales-card">
                  <h4>Deviation & Revenue</h4>
                  <p>
                    Revenue:{" "}
                    {salesSummary.data.CalculateDeviation.data.Revenue.toLocaleString()}
                    .Tsh
                  </p>
                  <p>
                    Expected Revenue:{" "}
                    {salesSummary.data.CalculateDeviation.data.Expect_revenue.toLocaleString()}
                    .Tsh
                  </p>
                  <p>
                    Exp Profit/each:{" "}
                    {salesSummary.data.CalculateDeviation.data.Exp_profit_pereach.toLocaleString()}
                    .Tsh
                  </p>
                  <p>
                    Expected Net Profit:{" "}
                    {salesSummary.data.CalculateDeviation.data.Exp_Net_profit.toLocaleString()}
                    .Tsh
                  </p>
                  <p>
                    Net Profit:{" "}
                    {salesSummary.data.CalculateDeviation.data.Net_profit.toLocaleString()}
                    .Tsh
                  </p>
                  <p>
                    Profit Deviation:{" "}
                    {salesSummary.data.CalculateDeviation.data.Profit_deviation.toLocaleString()}
                  </p>
                  <p>
                    Deviation from profit %:{" "}
                    {salesSummary.data.CalculateDeviation.data.deviationFromMeanPercent.toFixed(
                      2
                    )}
                    %
                  </p>
                  <div className="submit-sales-container">
                    <Submitbtn
                      buttonName="Confirm sales"
                      onclick={handlemakesales}
                    />
                    <div className="input-value">
                      <label
                        htmlFor="paymentstatus"
                        style={{ color: "white" }}
                      >
                        Choose payment style
                      </label>
                      <select
                        name="paymentstatus"
                        value={makesales?.paymentstatus}
                        onChange={handleChange}
                      >
                        <option value="paid">Select payment style</option>
                        <option value="paid">paid</option>
                        <option value="pending">pending...</option>
                        <option value="partialpaid">partialpaid</option>
                        <option value="debt">dept</option>
                      </select>
                    </div>
                    <div className="input-value">
                      <label
                        htmlFor="payment_via"
                        style={{ color: "white" }}
                      >
                        Payment Method
                      </label>
                      <select
                        name="payment_via"
                        value={paymentVia}
                        onChange={handleChange}
                        required
                      >
                        <option value={paymentvia.Cash}>Cash</option>
                        <option value={paymentvia.Bank}>Bank</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {isdbfromOpen && (
          <div className="debt-frm-cfrm-container">
            <div className="icon-conyainer">
              <div className="icon" onClick={handleDbfrmclose}>
                <RiCloseFill color="white" size={30} fontWeight={500} />
              </div>
            </div>
            <div className="frm-container">
              <div className="form-title">
                <span>Fill Debtor information</span>
              </div>
              <form className="main-form-content">
                {iscustomerexist === true ? (
                  <>
                    <div className="input-value">
                      <label htmlFor="dbrName">Debtor Name</label>
                      <select
                        name="Debtor_name"
                        value={debtorInfo?.Debtor_name || ""}
                        onChange={handleChange}
                      >
                        <option value="">Select customer_name</option>
                        {customerdetails && customerdetails.length > 0 ? (
                          customerdetails.map((item) => (
                            <option key={item.Cid} value={item.customer_name}>
                              {item.customer_name}
                            </option>
                          ))
                        ) : (
                          <option value="">No Any details</option>
                        )}
                      </select>
                    </div>
                    <div className="input-value">
                      <label htmlFor="Phnumber">Phone_Number</label>
                      <input
                        type="text"
                        name="Phone_number"
                        id="Phnumber"
                        value={debtorInfo?.Phone_number}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="two-column-inputs">
                      <div className="input-value">
                        <label htmlFor="pydate">Payment date</label>
                        <input
                          type="date"
                          name="PaymentDateAt"
                          id="pydate"
                          value={
                            debtorInfo?.PaymentDateAt
                              ? new Date(debtorInfo.PaymentDateAt)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="input-value">
                        <label htmlFor="loca">location(Optional)</label>
                        <input
                          type="text"
                          name="location"
                          id="loca"
                          value={debtorInfo?.location}
                          onChange={handleChange}
                          placeholder="Moshi,mwanga, kiruru"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="input-value">
                      <label htmlFor="dbrName">Debtor Name</label>
                      <input
                        type="text"
                        name="Debtor_name"
                        id="dbrName"
                        value={debtorInfo?.Debtor_name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="input-value">
                      <label htmlFor="Phnumber">Phone_Number</label>
                      <input
                        type="text"
                        name="Phone_number"
                        id="Phnumber"
                        value={debtorInfo?.Phone_number}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="two-column-inputs">
                      <div className="input-value">
                        <label htmlFor="pydate">Payment date</label>
                        <input
                          type="date"
                          name="PaymentDateAt"
                          id="pydate"
                          value={
                            debtorInfo?.PaymentDateAt
                              ? new Date(debtorInfo.PaymentDateAt)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="input-value">
                        <label htmlFor="loca">location(Optional)</label>
                        <input
                          type="text"
                          name="location"
                          id="loca"
                          value={debtorInfo?.location}
                          onChange={handleChange}
                          placeholder="Moshi,mwanga, kiruru"
                        />
                      </div>
                    </div>
                  </>
                )}
                {makesales?.paymentstatus === "partialpaid" && (
                  <div className="input-value">
                    <label htmlFor="PM">Paid money</label>
                    <input
                      type="text"
                      name="paidmoney"
                      id="PM"
                      value={debtorInfo?.paidmoney}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}

                <div className="btn-container">
                  <Submitbtn
                    buttonName="Sumbit"
                    type="submit"
                    onclick={handlemakesales}
                  />
                  <button
                    onClick={handleBdformoption}
                    className="toggle-customer-btn"
                  >
                    {iscustomerexist === true
                      ? "Customer Exist"
                      : "New Customer"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const CreateDiscount: React.FC<FormCompProps> = ({
  product_name,
  pId,
  Ws_price,
}) => {
  const [formData, setformdata] = useState<DiscInterface>({
    product_id: pId,
    percentage: { perce: 0 },
    Amount: 0,
    pnum: "",
    product_name: product_name,
    Ws_price: Ws_price,
  });
  const HandleOnchage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setformdata((prev) => {
      const update = { ...prev, [name]: value };
      if (name === "Amount" && prev.Ws_price) {
        const calperc = (Number(value) * 100) / Number(prev.Ws_price);
        update.percentage = { perce: calperc };
      }
      return update;
    });
  };
  const handleOnsubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const perc_Num = formData.percentage?.perce;

    const createPayload: Disc_requestInterface = {
      product_id: formData.product_id,
      product_name: formData.product_name,
      Amount: Number(formData.Amount),
      perc: perc_Num,
      pnum: Number(formData.pnum),
      UpdateFlag: false,
    };

    const UpdatePayload: Disc_requestInterface = {
      ...createPayload,
      UpdateFlag: true,
    };

    try {
      const response = await CreateDisCount(createPayload);
      if (response.data.confirm) {
        const userConfirmation = window.confirm(response.data.message);
        if (userConfirmation) {
          const update_Disc = await CreateDisCount(UpdatePayload);
          if (!update_Disc.data.success) {
            alert(update_Disc.data.message);
            return;
          }
          alert(update_Disc.data.message);
        } else {
          toast.info("Update cancelled by user");
        }
        return;
      }

      // case: fresh create or failed
      alert(response.data.message);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="offer-create-main-container">
      <div
        className="form-title"
        style={{
          background: "#e6f8ffff",
          display: "flex",
          columnGap: "10px",
          marginBottom: "12px",
        }}
      >
        <p>{`Discount For ${formData.product_name}`}</p>
      </div>
      <form className="offer-form-container" onSubmit={handleOnsubmit}>
        <div className="input-value">
          <label htmlFor="pname">Product-Name</label>
          <input
            type="text"
            name="product_name"
            id="pname"
            onChange={HandleOnchage}
            value={formData.product_name}
            required
            readOnly
          />
        </div>
        <div className="input-value">
          <label htmlFor="%">Percentage cuttoff</label>
          <input
            type="text"
            name="percentage"
            id="%"
            onChange={HandleOnchage}
            value={formData.percentage?.perce.toFixed(2)}
            required
            readOnly
          />
        </div>
        <div className="input-value">
          <label htmlFor="amount">Amount</label>
          <input
            type="text"
            name="Amount"
            id="amount"
            onChange={HandleOnchage}
            value={formData.Amount ?? 0}
            required
          />
        </div>
        <div className="input-value">
          <label htmlFor="pnum">Product Number/Litre</label>
          <input
            type="text"
            name="pnum"
            id="pnum"
            onChange={HandleOnchage}
            value={formData.pnum}
            required
            placeholder="Enter product number start cutoff"
          />
        </div>
        <div className="btn-container">
          <Submitbtn buttonName="Create" type="submit" />
        </div>
      </form>
      <div>
        <ToastContainer />
      </div>
    </div>
  );
};
export const Editdebt: React.FC<DebtRecord> = ({
  product_name,
  total_quantity,
  latest_paid_amount,
  debt_id,
  Onclose,
}) => {
  const [price, setprice] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value.replace(/,/g, "");
    if (!/^\d*$/.test(rawValue)) return;
    const formatted = rawValue ? Number(rawValue).toLocaleString() : "";
    setprice(formatted);
  };

  const updatepayload = {
    paidmoney: Number(price.replace(/,/g, "")),
  };

  const handleUpdateDebt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await UpdateDebt(updatepayload, debt_id);
      if (!response.data.success) {
        alert(response.data.message);
        return;
      }
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };
  return (
    <>
      <div className="debt-frm-cfrm-container">
        <ToastContainer />
        <div className="icon-conyainer" onClick={Onclose}>
          <div className="icon">
            <RiCloseFill color="white" size={30} fontWeight={500} />
          </div>
        </div>
        <div className="frm-container">
          <div className="form-title">
            <span>Update Debt</span>
          </div>
          <form className="main-form-content" onSubmit={handleUpdateDebt}>
            <div className="input-value">
              <label htmlFor="pname">Product-Name</label>
              <input
                type="text"
                name="product_name"
                id="pname"
                value={product_name}
                required
                readOnly
              />
            </div>
            <div className="two-column-inputs">
              <div className="input-value">
                <label htmlFor="%">Already-Paid</label>
                <input
                  type="text"
                  name="percentage"
                  id="%"
                  value={Number(latest_paid_amount).toLocaleString()}
                  required
                  readOnly
                />
              </div>
              <div className="input-value">
                <label htmlFor="amount">Total Quantity </label>
                <input
                  type="text"
                  name="Amount"
                  id="amount"
                  value={total_quantity}
                  required
                />
              </div>
            </div>
            <div className="input-value">
              <label htmlFor="price"> Add Price</label>
              <input
                type="text"
                id="price"
                name="price"
                value={price}
                onChange={handleChange}
                placeholder="Enter amount"
              />
            </div>
            <div className="btn-container">
              <Submitbtn buttonName="Update Debt" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export const PlaceOrder: React.FC<Oncloseform> = ({ onclose }) => {
  const [Orderpayload, setOrderpayload] = useState<ICreateOrder>();
  const [iscustomerexist, setiscustomerexist] = useState<boolean>(false);
  const [isproductexist, setproductexist] = useState<boolean>(false);
  const [customerdetails, setcustomerdetails] = useState<CustomerInfo[]>([]);
  const [searchTerm, setsearchTerm] = useState("");
  const [CombinedProductstate, setCombinedProductstate] = useState<ProductItem[]>([]);
  const handleCustomerSelection = (selectedCustomerName: string) => {
    const selectedCustomer = customerdetails.find(
      (customer) => customer.customer_name === selectedCustomerName
    );
    
    if (selectedCustomer) {
      setOrderpayload((prev) => ({
        ...prev,
        client_name: selectedCustomer.customer_name,
        client_phone: selectedCustomer.phone_number,
      }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    
    if (name === "client_name" && iscustomerexist) {
      handleCustomerSelection(value);
    } else {
      setOrderpayload((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleCustomerDetails = async () => {
    const response = await customerInfo();
    setcustomerdetails(response.data.data);
  };
  const handleCombinedProduct = async () => {
    try {
      const response = await CombinedProduct();
      if (!response.data.success) {
        alert("failed  to load Product");
        return;
      }
      setCombinedProductstate(response.data.data);
    } catch (err) {
      console.error(err);
      alert(err);
      return;
    }
  };
  useEffect(() => {
    handleCustomerDetails();
    handleCombinedProduct();
  }, []);
const filtercombineproduct: ProductItem[] = CombinedProductstate.filter(
  (item) => item.product_name?.toLowerCase().includes(searchTerm.toLowerCase())
);

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!Orderpayload?.product_name || !Orderpayload?.client_name || !Orderpayload?.client_phone || 
        !Orderpayload?.OrderDate || !Orderpayload?.payamount || !Orderpayload?.Quantity || !Orderpayload?.Orderstatus) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      // Prepare the order data
      const orderData = {
        product_name: Orderpayload.product_name,
        client_name: Orderpayload.client_name,
        client_phone: Orderpayload.client_phone,
        OrderDate: Orderpayload.OrderDate,
        paidMoney: Number(Orderpayload.paidMoney) || 0,
        payamount: Number(Orderpayload.payamount),
        Quantity: Orderpayload.Quantity,
        Phone_number: Orderpayload.client_phone, // Use client_phone as Phone_number
        Orderstatus: Orderpayload.Orderstatus,
        Order_Description: Orderpayload.Order_Description || ""
      };

      console.log("Sending order data:", orderData);
      
      const response = await CreateOrder(orderData);
      console.log("Order creation response:", response);
      
      if (response.data.success) {
        toast.success("Order created successfully!",{
          onClose: () => {
            onclose?.();
          },
        });

        setOrderpayload({});
        onclose?.();
      } else {
        toast.error(response.data.message || "Failed to create order");
      }
    } catch (error: any) {
      console.error("Order creation error:", error);
      toast.error("Error creating order: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <>
      <div className="debt-frm-cfrm-container">
        <ToastContainer />
        <div className="icon-conyainer" onClick={onclose}>
          <div className="icon">
            <RiCloseFill color="white" size={30} fontWeight={500} />
          </div>
        </div>
        <div className="frm-container">
          <div className="form-title">
            <span>Place Order</span>
          </div>
          <form className="main-form-content" onSubmit={handleOrderSubmit}>
            {iscustomerexist === true ? (
              <div className="two-column-inputs">
                <div className="input-value">
                  <label htmlFor="client_name">Customer Name</label>
                  <input
                    type="text"
                    name="client_name"
                    id="client_name"
                    value={Orderpayload?.client_name || ""}
                    required
                    readOnly
                  />
                </div>
                <div className="input-value">
                  <label htmlFor="client_phone">Phone Number</label>
                  <input
                    type="text"
                    name="client_phone"
                    id="client_phone"
                    value={Orderpayload?.client_phone || ""}
                    required
                    readOnly
                  />
                </div>
              </div>
            ) : (
              <div className="two-column-inputs">
                <div className="input-value">
                  <label htmlFor="client_name">Customer Name</label>
                  <select
                    name="client_name"
                    value={Orderpayload?.client_name || ""}
                    onChange={handleChange}
                  >
                    <option value="">Select customer name</option>
                    {customerdetails && customerdetails.length > 0 ? (
                      customerdetails.map((item) => (
                        <option key={item.Cid} value={item.customer_name}>
                          {item.customer_name}
                        </option>
                      ))
                    ) : (
                      <option value="">No Any details</option>
                    )}
                  </select>
                </div>
                <div className="input-value">
                  <label htmlFor="client_phone">Phone Number</label>
                  <input
                    type="text"
                    name="client_phone"
                    id="client_phone"
                    value={Orderpayload?.client_phone || ""}
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
            <div className="two-column-inputs">
              {isproductexist === true ? (
                <>
                
                <div className="input-value">
                  <label htmlFor="productName">Product Name</label>
                  <select
                    id="productName"
                    name="product_name"
                    value={Orderpayload?.product_name || ""}
                    onChange={handleChange}
                  >
                    <option value="">Select product name</option>
                    {filtercombineproduct && filtercombineproduct.length > 0 ? (
                      filtercombineproduct.map((item) => (
                        <option
                          key={item.product_name}
                          value={item.product_name}
                        >
                          {item.product_name}
                        </option>
                      ))
                    ) : (
                      <option value="">No product available</option>
                    )}
                  </select>
                </div>
                </>
              ) : (
                <div className="input-value">
                  <label htmlFor="product_name">Product Name</label>
                  <input
                    type="text"
                    name="product_name"
                    id="product_name"
                    value={Orderpayload?.product_name || ""}
                    required
                    onChange={handleChange}
                  />
                </div>
              )}

              <div className="input-value">
                <label htmlFor="quantity">Total Quantity</label>
                <input
                  type="text"
                  name="Quantity"
                  id="quantity"
                  value={Orderpayload?.Quantity || ""}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="two-column-inputs">
              <div className="input-value">
                <label htmlFor="paidMoney">Paid Money</label>
                <input
                  type="number"
                  id="paidMoney"
                  name="paidMoney"
                  value={Orderpayload?.paidMoney || ""}
                  onChange={handleChange}
                  placeholder="Enter amount he/she pay"
                />
              </div>
              <div className="input-value">
                <label htmlFor="payamount">Pay Amount</label>
                <input
                  type="number"
                  id="payamount"
                  name="payamount"
                  value={Orderpayload?.payamount || ""}
                  onChange={handleChange}
                  placeholder="Enter amount he/she suppose to pay"
                  required
                />
              </div>
            </div>
            <div className="input-value">
              <label htmlFor="orderDate">Order Date</label>
              <input
                type="date"
                name="OrderDate"
                id="orderDate"
                value={Orderpayload?.OrderDate || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-value">
              <label htmlFor="orderStatus">Order Status</label>
              <select
                name="Orderstatus"
                id="orderStatus"
                value={Orderpayload?.Orderstatus || ""}
                onChange={handleChange}
                required
              >
                <option value="">Select order status</option>
                <option value="fullpaid">Full Paid</option>
                <option value="partialpaid">Partial Paid</option>
                <option value="pending">Pending</option>
                <option value="Partial">Partial</option>
              </select>
            </div>
            <div className="input-value">
              <label htmlFor="orderDescription">Order Description (Optional)</label>
              <textarea
                name="Order_Description"
                id="orderDescription"
                value={Orderpayload?.Order_Description || ""}
                onChange={handleChange}
                placeholder="Enter order description..."
                rows={3}
              />
            </div>
            <div className="btn-container">
              <button
                onClick={() => setiscustomerexist(!iscustomerexist)}
                className="toggle-customer-btn"
              >
                {iscustomerexist === true ? "Customer Exist" : "New Customer"}
              </button>
              <button
                onClick={() => setproductexist(!isproductexist)}
                className="toggle-customer-btn"
              >
                {isproductexist === false ? "Product Exist" : "New Product"}
              </button>
            </div>
            <div className="btn-container">
              <Submitbtn buttonName="Place Order" type="submit" onclick={handleOrderSubmit} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export const useFormClose = () => {
  const [isOpen, setIsOpen] = useState(true);

  const openForm = () => setIsOpen(true);
  const closeForm = () => setIsOpen(false);

  return { isOpen, openForm, closeForm };
};
