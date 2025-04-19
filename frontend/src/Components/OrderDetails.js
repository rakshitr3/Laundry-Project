import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import "./CreateOrder.css";

const STATUS_STEPS = ["Ready to Pickup", "In Washing", "In Ironing", "Ready to Deliver"];

const OrderDetails = ({ order, onClose }) => {
  const [store, setStore] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [showCancelAlert, setShowCancelAlert] = useState(false);

  useEffect(() => {
    if (order) {
      setStore(order.store || "");
      setStoreAddress(order.storeAddress || "");
      setPhone(order.phone || "");
    }
  }, [order]);

  if (!order) return null;

  const { items, total, status } = order;
  const pickupCharges = 90;
  const grandTotal = total + pickupCharges;
  const orderIdShort = order._id.slice(-6).toUpperCase();

  const getStepClass = (step) => {
    const index = STATUS_STEPS.indexOf(step);
    const currentIndex = STATUS_STEPS.indexOf(status);
    return index <= currentIndex ? "step active" : "step";
  };

  const handleCancel = () => {
    setShowCancelAlert(true);
  };

  const confirmCancel = () => {
    setShowCancelAlert(false);
    onClose();
  };

  return (
    <>
      <div className="summary-popup-content">
        <div className="popup-nav">
          <p className="popup-title">Summary</p>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="summary-details">
          <div className="store-info" id="store-fields">
            <label className="select-wrapper">
              <select value={store} onChange={(e) => setStore(e.target.value)} className="dropdown-select">
                <option value="" disabled hidden>Store Location</option>
                <optgroup label="Available Stores">
                  <option value="Jp Nagar">Jp Nagar</option>
                  <option value="Mangalore">Mangalore</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Mumbai">Mumbai</option>
                </optgroup>
              </select>
              <span className="dropdown-icon"><MdKeyboardArrowDown /></span>
            </label>

            <label className="info-label">
              <strong>Store Address:</strong>
              <input type="text" value={storeAddress} onChange={(e) => setStoreAddress(e.target.value)} />
            </label>

            <label className="info-label">
              <strong>Phone:</strong>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </label>
          </div>

          <div className="status-nav">
            {STATUS_STEPS.map((step, i) => (
              <div key={i} className={getStepClass(step)}>
                <span className="circle">{i + 1}</span>
                <span>{step}</span>
              </div>
            ))}
          </div>

          <div className="order-details">
            <table className="summary-table" style={{ borderSpacing: "20px" }}>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.type}</td>
                    <td>{item.washType.join(", ")}</td>
                    <td>{item.quantity} x {item.price / item.quantity} =</td>
                    <td>₹{item.price}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="4" style={{ textAlign: "right", paddingTop: "10px" }}>
                    <p>Sub Total: <strong>₹{total}</strong></p>
                    <p>Pickup Charges: <strong>₹{pickupCharges}</strong></p>
                    <h3 className="total-price-box">
                      <span>Total: ₹{grandTotal}</span>
                    </h3>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="summary-buttons">
            {status === "Ready to Pickup" && (
              <button className="cancel-order-btn" onClick={handleCancel}>
                Cancel Order
              </button>
            )}
          </div>
        </div>
      </div>

      {showCancelAlert && (
        <div className="alert-overlay">
          <div className="alert-box">
            <div className="alert-header">
              <span className="alert-title">Alert</span>
              <button className="close-btn" onClick={() => setShowCancelAlert(false)}>×</button>
            </div>
            <div className="alert-body">
              <p>Are you sure you want to cancel order No: <strong>{orderIdShort}</strong>?</p>
              <button className="proceed-btn" onClick={confirmCancel}>Proceed</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
