import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreateOrder.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import SuccessPopup from "./SuccessPopup"; 

function Summary({ items, total, onBack }) {
  const [store, setStore] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const pickupCharges = 90;
  const grandTotal = total + pickupCharges;

  const [userAddresses, setUserAddresses] = useState([
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
      setShowSuccessPopup(true); // Show popup instead of alert
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

            <span
              style={{
                position: "absolute",
                right: "10px",
                bottom: "5px",
                pointerEvents: "none",
                fontSize: "14px",
                color: "#555",
              }}
            >
              <div style={{ fontSize: "20px" }}>
                <MdKeyboardArrowDown />
              </div>
            </span>
          </label>

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

        <div className="order-details">
          <h3>Order Details:</h3>
          <table className="summary-table">
            <tbody style={{ position: "relative", top: "30px", left: "-53px" }}>
              {items.map((item, idx) => (
                <tr key={idx}>
                  <td style={{ borderBottom: "0.5px solid lightgrey" }}>{item.type}</td>
                  <td style={{ borderBottom: "0.5px solid lightgrey" }}>{item.washType.join(", ")}</td>
                  <td style={{ borderBottom: "0.5px solid lightgrey" }}>
                    {item.quantity} x {item.price / item.quantity} =
                  </td>
                  <td style={{
                    borderBottom: "0.5px solid lightgrey",
                    font: "normal normal 600 20px/27px Open Sans",
                    letterSpacing: "0.48px",
                    color: "#5861AE",
                  }}>
                    {item.price}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="4" style={{ textAlign: "right", paddingTop: "10px" }}>
                  <p style={{
                    borderBottom: "0.5px solid lightgrey",
                    width: "123px",
                    position: "relative",
                    right: "-546px",
                  }}>
                    <strong>Sub Total:</strong> {total}
                  </p>
                  <p>
                    <strong>Pickup Charges:</strong> {pickupCharges}
                  </p>
                  <h3 className="second-nav">
                    <strong style={{ fontWeight: "normal", position: "relative", top: "8px" }}>
                      Total:
                    </strong>{" "}
                    Rs {grandTotal}
                  </h3>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

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
                  width: "300px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                }}
              >
                {addr}
                {selectedAddress === addr && (
                  <span style={{ position: "absolute", top: "10px", right: "10px", color: "green", fontSize: "20px" }}>
                    ✓
                  </span>
                )}
              </div>
            ))}
            <div
              onClick={handleAddAddressClick}
              style={{
                border: "2px dashed #1A73E8",
                padding: "15px",
                borderRadius: "8px",
                cursor: "pointer",
                width: "300px",
                textAlign: "center",
                color: "#1A73E8",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              + Add Address
            </div>
          </div>
        </div>

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

      {/* Success Popup */}
      {showSuccessPopup && <SuccessPopup onClose={onBack} />}
    </div>
  );
}

export default Summary;
