
import { Pencil } from "lucide-react"
import { useState } from "react"
import styles from "./orders-table.module.css"

interface Order {
  id: string
  paidMoney: number
  payMoney: number
  username: string
  productName: string
  orderStatus: "pending" | "completed" | "cancelled" | "processing"
  clientPhone: string
  clientName: string
  orderDate: string
}

const sampleOrders: Order[] = [
  {
    id: "1",
    payMoney: 399.99,
    paidMoney: 299.99,
    username: "john_doe",
    productName: "Wireless Headphones",
    orderStatus: "completed",
    clientPhone: "+1 234-567-8900",
    clientName: "John Doe",
    orderDate: "2025-01-15",
  },
  {
    id: "2",
    payMoney: 199.99,
    paidMoney: 149.5,
    username: "jane_smith",
    productName: "Smart Watch",
    orderStatus: "processing",
    clientPhone: "+1 234-567-8901",
    clientName: "Jane Smith",
    orderDate: "2025-01-20",
  },
  {
    id: "3",
    payMoney: 89.99,
    paidMoney: 89.99,
    username: "bob_wilson",
    productName: "Phone Case",
    orderStatus: "pending",
    clientPhone: "+1 234-567-8902",
    clientName: "Bob Wilson",
    orderDate: "2025-01-22",
  },
]

export function OrdersTable() {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [orders, setOrders] = useState<Order[]>(sampleOrders)
  const [editForm, setEditForm] = useState<Order | null>(null)

  const handleEdit = (orderId: string) => {
    const orderToEdit = orders.find((order) => order.id === orderId)
    if (orderToEdit) {
      setEditingId(orderId)
      setEditForm({ ...orderToEdit })
    }
  }

  const handleSave = (orderId: string) => {
    if (editForm) {
      setOrders(orders.map((order) => (order.id === orderId ? editForm : order)))
      setEditingId(null)
      setEditForm(null)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditForm(null)
  }

  const handleInputChange = (field: keyof Order, value: string | number) => {
    if (editForm) {
      setEditForm({ ...editForm, [field]: value })
    }
  }

  const getStatusClass = (status: Order["orderStatus"]) => {
    const baseClass = styles.statusBadge
    switch (status) {
      case "completed":
        return `${baseClass} ${styles.statusCompleted}`
      case "processing":
        return `${baseClass} ${styles.statusProcessing}`
      case "pending":
        return `${baseClass} ${styles.statusPending}`
      case "cancelled":
        return `${baseClass} ${styles.statusCancelled}`
      default:
        return baseClass
    }
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th className={styles.tableHeaderCell}>Order Date</th>
            <th className={styles.tableHeaderCell}>Client Name</th>
            <th className={styles.tableHeaderCell}>Client Phone</th>
            <th className={styles.tableHeaderCell}>Product Name</th>
            <th className={styles.tableHeaderCell}>Username</th>
            <th className={styles.tableHeaderCell}>Order Status</th>
            <th className={styles.tableHeaderCell}>Total Amount</th>
            <th className={styles.tableHeaderCell}>Paid Money</th>
            <th className={styles.tableHeaderCell}>Edit</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {orders.map((order) => (
            <tr key={order.id} className={styles.tableRow}>
              <td className={`${styles.tableCell} ${styles.tableCellMuted}`}>
                {editingId === order.id ? (
                  <input
                    type="date"
                    value={editForm?.orderDate || ""}
                    onChange={(e) => handleInputChange("orderDate", e.target.value)}
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
                    onChange={(e) => handleInputChange("clientName", e.target.value)}
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
                    onChange={(e) => handleInputChange("clientPhone", e.target.value)}
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
                    onChange={(e) => handleInputChange("productName", e.target.value)}
                    style={{ width: "150px", padding: "4px" }}
                  />
                ) : (
                  order.productName
                )}
              </td>
              <td className={`${styles.tableCell} ${styles.tableCellMuted}`}>
                {editingId === order.id ? (
                  <input
                    type="text"
                    value={editForm?.username || ""}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    style={{ width: "120px", padding: "4px" }}
                  />
                ) : (
                  order.username
                )}
              </td>
              <td className={styles.tableCell}>
                {editingId === order.id ? (
                  <select
                    value={editForm?.orderStatus || "pending"}
                    onChange={(e) => handleInputChange("orderStatus", e.target.value)}
                    style={{ padding: "4px" }}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                ) : (
                  <span className={getStatusClass(order.orderStatus)}>{order.orderStatus}</span>
                )}
              </td>
              <td className={`${styles.tableCell} ${styles.tableCellMedium}`}>
                {editingId === order.id ? (
                  <input
                    type="number"
                    value={editForm?.payMoney || 0}
                    onChange={(e) => handleInputChange("payMoney", Number.parseFloat(e.target.value))}
                    style={{ width: "100px", padding: "4px" }}
                  />
                ) : (
                  `$${order.payMoney.toFixed(2)}`
                )}
              </td>
              <td className={`${styles.tableCell} ${styles.tableCellMedium} ${styles.firstColumn}`}>
                {editingId === order.id ? (
                  <input
                    type="number"
                    value={editForm?.paidMoney || 0}
                    onChange={(e) => handleInputChange("paidMoney", Number.parseFloat(e.target.value))}
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
                    <button className={styles.editButton} onClick={handleCancel} style={{ color: "#ef4444" }}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button className={styles.editButton} onClick={() => handleEdit(order.id)}>
                    <Pencil className={styles.editIcon} />
                    <span className={styles.srOnly}>Edit order {order.id}</span>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
