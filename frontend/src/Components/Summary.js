import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreateOrder.css";
import { MdKeyboardArrowDown } from "react-icons/md";

function Summary({ items, total, onBack, onConfirm }) {
  const [store, setStore] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const pickupCharges = 90;
  const grandTotal = total + pickupCharges;

  const [userAddresses] = useState([
    "#223, 10th road, JP Nagar, Bangalore",
    "Flat 402, A-block, Sunrise Apartments, Chennai",
  ]);
  const [selectedAddress, setSelectedAddress] = useState(userAddresses[0]);

  useEffect(() => {
    setIsButtonEnabled(store && storeAddress && phone);
  }, [store, storeAddress, phone]);

  const handleConfirm = async () => {
    const order = {
      items,
      store,
      storeAddress,
      phone,
      address: selectedAddress,
      pickupCharges,
      total: grandTotal,
    };
    try {
      await axios.post("http://localhost:5000/api/orders", order);
      onConfirm(); // ✅ Close Summary and show SuccessPopup in parent
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  const handleAddAddressClick = () => {
    document.getElementById("store-fields").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="summary-popup-content">
      <div className="popup-nav">
        <h2 style={{ position: "relative", color: "white", top: "20px", left: "20px" }}>Summary</h2>
        <button className="close-btn" onClick={onBack}>×</button>
      </div>

      <div className="summary-details">
        <div className="store-info" id="store-fields">
          {/* Store Selection */}
          <label style={{ display: "flex", flexDirection: "column", marginBottom: "40px", position: "relative" }}>
            <strong style={{ marginBottom: "5px" }}>Store:</strong>
            <select
              value={store}
              onChange={(e) => setStore(e.target.value)}
              style={{
                appearance: "none",
                border: "none",
                borderBottom: "2px solid #ccc",
                padding: "5px 30px 5px 5px",
                backgroundColor: "transparent",
                fontSize: "16px",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="" disabled hidden>Select Store</option>
              <optgroup label="Available Stores">
                <option value="Jp Nagar">Jp Nagar</option>
                <option value="Mangalore">Mangalore</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Mumbai">Mumbai</option>
              </optgroup>
            </select>
            <span style={{ position: "absolute", right: "10px", bottom: "5px", pointerEvents: "none", fontSize: "20px", color: "#555" }}>
              <MdKeyboardArrowDown />
            </span>
          </label>

          {/* Address and Phone */}
          <label style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
            <strong>Store Address:</strong>
            <input
              type="text"
              value={storeAddress}
              onChange={(e) => setStoreAddress(e.target.value)}
              placeholder="Enter store address"
              style={{ marginTop: "5px" }}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
            <strong>Phone:</strong>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              style={{ marginTop: "5px" }}
            />
          </label>
        </div>

        {/* Order Summary */}
        <div className="order-details">
          <h3>Order Details:</h3>
          <table className="summary-table">
            <tbody>
              {items.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.type}</td>
                  <td>{item.washType.join(", ")}</td>
                  <td>{item.quantity} x {item.price / item.quantity} =</td>
                  <td style={{ color: "#5861AE", fontWeight: "bold" }}>{item.price}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="4" style={{ textAlign: "right", paddingTop: "10px" }}>
                  <p><strong>Sub Total:</strong> {total}</p>
                  <p><strong>Pickup Charges:</strong> {pickupCharges}</p>
                  <h3><strong>Total:</strong> Rs {grandTotal}</h3>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Address Section */}
        <div style={{ marginTop: "20px" }}>
          <h3>Address</h3>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {userAddresses.map((addr, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedAddress(addr)}
                style={{
                  border: selectedAddress === addr ? "2px solid green" : "1px solid #ccc",
                  backgroundColor: "#fff",
                  padding: "15px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  position: "relative",
                  width: "200px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                }}
              >
                {addr}
                {selectedAddress === addr && (
                  <span style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    color: "green",
                    fontSize: "20px",
                  }}>
                    ✓
                  </span>
                )}
              </div>
            ))}
            <div
              onClick={handleAddAddressClick}
              style={{
                color: "#1A73E8",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
              }}
            >
              Add New
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="summary-buttons" style={{ marginTop: "30px" }}>
          <button
            onClick={handleConfirm}
            disabled={!isButtonEnabled}
            style={{
              backgroundColor: isButtonEnabled ? "#1A73E8" : "#ADD8E6",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: isButtonEnabled ? "pointer" : "not-allowed",
              fontSize: "16px",
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default Summary;
