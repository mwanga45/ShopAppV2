import { Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import styles from "./order-list.module.css";
import { fetchOrders, fetchOrdersByDateRange } from "../../central-api/central-api";
import { toast, ToastContainer } from "react-toastify";

interface Order {
  id: string;
  paidMoney: number;
  payMoney: number;
  productName: string;
  orderStatus:
    | "pending"
    | "completed"
    | "cancelled"
    | "processing"
    | "Paid"
    | "Partial"
    | "Pending";
  clientPhone: string;
  clientName: string;
  orderDate: string;
}

export function OrdersTable() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [editForm, setEditForm] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

  // Fetch orders on mount
  useEffect(() => {
    loadOrders();
  }, []);

  // Filter by date range
  useEffect(() => {
    if (startDate && endDate) {
      const filtered = orders.filter((order) => {
        const orderDate = new Date(order.orderDate);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return orderDate >= start && orderDate <= end;
      });
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
  }, [orders, startDate, endDate]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await fetchOrders();

      if (response.data.success) {
        // Normalize backend response
        const normalized = response.data.data.map((item: any) => ({
          id: String(item.id),
          paidMoney: Number(item.paidmoney),
          payMoney: Number(item.paymoney),
          productName: item.productname,
          orderStatus:
            item.orderstatus.toLowerCase() === "partialpaid"
              ? "Partial"
              : item.orderstatus.toLowerCase() === "paid"
              ? "Paid"
              : item.orderstatus.toLowerCase() === "pending"
              ? "Pending"
              : item.orderstatus,
          clientPhone: item.clientphone,
          clientName: item.clientname,
          orderDate: item.orderdate,
        }));

        setOrders(normalized);
        setFilteredOrders(normalized);
        toast.success("Orders loaded successfully!");
      } else {
        toast.error(response.data.message || "Failed to load orders");
      }
    } catch (error: any) {
      console.error("Error loading orders:", error);
      toast.error(
        "Error loading orders: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDateRangeFilter = async () => {
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates");
      return;
    }

    try {
      setLoading(true);
      const response = await fetchOrdersByDateRange(startDate, endDate);
      if (response.data.success) {
        const normalized = response.data.data.map((item: any) => ({
          id: String(item.id),
          paidMoney: Number(item.paidmoney),
          payMoney: Number(item.paymoney),
          productName: item.productname,
          orderStatus:
            item.orderstatus.toLowerCase() === "partialpaid"
              ? "Partial"
              : item.orderstatus.toLowerCase() === "paid"
              ? "Paid"
              : item.orderstatus.toLowerCase() === "pending"
              ? "Pending"
              : item.orderstatus,
          clientPhone: item.clientphone,
          clientName: item.clientname,
          orderDate: item.orderdate,
        }));

        setOrders(normalized);
        setFilteredOrders(normalized);
        toast.success(`Found ${response.data.data.length} orders in date range`);
      } else {
        toast.error(response.data.message || "Failed to fetch orders");
      }
    } catch (error: any) {
      console.error("Error fetching orders by date range:", error);
      toast.error(
        "Error fetching orders: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (orderId: string) => {
    const orderToEdit = orders.find((order) => order.id === orderId);
    if (orderToEdit) {
      setEditingId(orderId);
      setEditForm({ ...orderToEdit });
    }
  };

  const handleSave = (orderId: string) => {
    if (editForm) {
      setOrders(
        orders.map((order) => (order.id === orderId ? editForm : order))
      );
      setEditingId(null);
      setEditForm(null);
      toast.success("Order updated successfully!");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleInputChange = (field: keyof Order, value: string | number) => {
    if (editForm) {
      setEditForm({ ...editForm, [field]: value });
    }
  };

  const getStatusClass = (status: Order["orderStatus"]) => {
    const baseClass = styles.statusBadge;
    switch (status) {
      case "completed":
      case "Paid":
        return `${baseClass} ${styles.statusCompleted}`;
      case "processing":
        return `${baseClass} ${styles.statusProcessing}`;
      case "pending":
      case "Pending":
        return `${baseClass} ${styles.statusPending}`;
      case "cancelled":
        return `${baseClass} ${styles.statusCancelled}`;
      case "Partial":
        return `${baseClass} ${styles.statusProcessing}`;
      default:
        return baseClass;
    }
  };

  const formatStatus = (status: Order["orderStatus"]) => {
    switch (status) {
      case "Paid":
        return "Completed";
      case "Partial":
        return "Partial";
      case "Pending":
        return "Pending";
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className={styles.tableContainer}>
        <div style={{ textAlign: "center", padding: "50px" }}>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <ToastContainer />
      {/* Date Range Filter */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          padding: "15px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          alignItems: "center",
        }}
      >
        <div>
          <label style={{ marginRight: "5px", fontWeight: "bold" }}>
            Start Date:
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{
              padding: "5px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div>
          <label style={{ marginRight: "5px", fontWeight: "bold" }}>
            End Date:
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{
              padding: "5px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <button
          onClick={handleDateRangeFilter}
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Filter by Date
        </button>
        <button
          onClick={loadOrders}
          style={{
            padding: "8px 16px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Load All Orders
        </button>
        <div style={{ marginLeft: "auto", fontWeight: "bold" }}>
          Total Orders: {filteredOrders.length}
        </div>
      </div>

      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th className={styles.tableHeaderCell}>Order Date</th>
            <th className={styles.tableHeaderCell}>Client Name</th>
            <th className={styles.tableHeaderCell}>Client Phone</th>
            <th className={styles.tableHeaderCell}>Product Name</th>
            <th className={styles.tableHeaderCell}>Order Status</th>
            <th className={styles.tableHeaderCell}>Total Amount</th>
            <th className={styles.tableHeaderCell}>Paid Money</th>
            <th className={styles.tableHeaderCell}>Edit</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {filteredOrders.map((order) => (
            <tr key={order.id} className={styles.tableRow}>
              <td className={`${styles.tableCell} ${styles.tableCellMuted}`}>
                {editingId === order.id ? (
                  <input
                    type="date"
                    value={editForm?.orderDate || ""}
                    onChange={(e) =>
                      handleInputChange("orderDate", e.target.value)
                    }
                    style={{ padding: "4px" }}
                  />
                ) : (
                  new Date(order.orderDate).toLocaleDateString()
                )}
              </td>
              <td className={styles.tableCell}>
                {editingId === order.id ? (
                  <input
                    type="text"
                    value={editForm?.clientName || ""}
                    onChange={(e) =>
                      handleInputChange("clientName", e.target.value)
                    }
                    style={{ width: "120px", padding: "4px" }}
                  />
                ) : (
                  order.clientName
                )}
              </td>
              <td className={`${styles.tableCell} ${styles.tableCellMuted}`}>
                {editingId === order.id ? (
                  <input
                    type="text"
                    value={editForm?.clientPhone || ""}
                    onChange={(e) =>
                      handleInputChange("clientPhone", e.target.value)
                    }
                    style={{ width: "130px", padding: "4px" }}
                  />
                ) : (
                  order.clientPhone
                )}
              </td>
              <td className={styles.tableCell}>
                {editingId === order.id ? (
                  <input
                    type="text"
                    value={editForm?.productName || ""}
                    onChange={(e) =>
                      handleInputChange("productName", e.target.value)
                    }
                    style={{ width: "150px", padding: "4px" }}
                  />
                ) : (
                  order.productName
                )}
              </td>
              <td className={styles.tableCell}>
                {editingId === order.id ? (
                  <select
                    value={editForm?.orderStatus || "pending"}
                    onChange={(e) =>
                      handleInputChange("orderStatus", e.target.value)
                    }
                    style={{ padding: "4px" }}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                ) : (
                  <span className={getStatusClass(order.orderStatus)}>
                    {formatStatus(order.orderStatus)}
                  </span>
                )}
              </td>
              <td
                className={`${styles.tableCell} ${styles.tableCellMedium}`}
              >
                {editingId === order.id ? (
                  <input
                    type="number"
                    value={editForm?.payMoney || 0}
                    onChange={(e) =>
                      handleInputChange("payMoney", Number(e.target.value))
                    }
                    style={{ width: "100px", padding: "4px" }}
                  />
                ) : (
                  `$${order.payMoney.toFixed(2)}`
                )}
              </td>
              <td
                className={`${styles.tableCell} ${styles.tableCellMedium} ${styles.firstColumn}`}
              >
                {editingId === order.id ? (
                  <input
                    type="number"
                    value={editForm?.paidMoney || 0}
                    onChange={(e) =>
                      handleInputChange("paidMoney", Number(e.target.value))
                    }
                    style={{ width: "100px", padding: "4px" }}
                  />
                ) : (
                  `$${order.paidMoney.toFixed(2)}`
                )}
              </td>
              <td className={styles.tableCell}>
                {editingId === order.id ? (
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      className={styles.editButton}
                      onClick={() => handleSave(order.id)}
                      style={{ color: "#10b981" }}
                    >
                      Save
                    </button>
                    <button
                      className={styles.editButton}
                      onClick={handleCancel}
                      style={{ color: "#ef4444" }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className={styles.editButton}
                    onClick={() => handleEdit(order.id)}
                  >
                    <Pencil className={styles.editIcon} />
                    <span className={styles.srOnly}>
                      Edit order {order.id}
                    </span>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
