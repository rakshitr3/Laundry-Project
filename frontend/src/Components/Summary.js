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

      onConfirm(); //Close Summary and show SuccessPopup in parent using onConfirm fn that it got from createSummary

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
                position:"relative",top:"20px",left:"20px"
              }}
            >
              <option value="" disabled hidden>Store Location</option>
              <optgroup label="Available Stores">
                <option value="Jp Nagar">Jp Nagar</option>
                <option value="Mangalore">Mangalore</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Mumbai">Mumbai</option>
              </optgroup>
            </select>
            <span style={{ position: "absolute", right: "-15px", bottom: "10px", pointerEvents: "none", fontSize: "20px", color: "#555" }}>
              <MdKeyboardArrowDown />
            </span>
          </label>

          {/* Address and Phone */}
          <label style={{ display: "flex", flexDirection: "column", marginBottom: "5px",color:"black",marginTop:"15px"}}>
            <strong>Store Address:</strong>
            <input
              type="text"
              value={storeAddress}
              onChange={(e) => setStoreAddress(e.target.value)}
              style={{ width:"30px",marginTop:"-10px" }}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", marginBottom: "5px",color:"black",marginTop:"15px" }}>
            <strong>Phone</strong>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ width:"30px",marginTop:"-10px" }}
            />
          </label>
        </div>

        {/* Order Summary */}
        <div className="order-details">
          <h4 style={{position:"relative",left:"10px",color:"grey"}}>Order Details:</h4>
          <table className="summary-table" style={{borderSpacing:"20px"}}>
            <tbody>
              {items.map((item, idx) => (
                <tr key={idx}>
                  <td style={{borderBottom:"0.5px solid lightgrey"}}>{item.type}</td>
                  <td style={{borderBottom:"0.5px solid lightgrey",fontStyle:"italic"}}>{item.washType.join(", ")}</td>
                  <td style={{borderBottom:"0.5px solid lightgrey"}}>{item.quantity} x {item.price / item.quantity} =</td>
                  <td style={{ color: "#5861AE", fontWeight: "bold" }}>{item.price}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="4" style={{ textAlign: "right", paddingTop: "10px" }}>
                  <p style={{borderBottom:"0.5px solid lightgrey"}}>Sub Total: <strong> {total}</strong></p>
                  <p> Pickup Charges: <strong>{pickupCharges} </strong></p>
                  <h3 style={{color:"white", background:"#5861AE",width:"700px",height:"49px"}}><span style={{position:"relative",top:"10px",right:"10px"}}>  Total: &nbsp; &nbsp;<strong>Rs {grandTotal}</strong> </span></h3>
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

   
        <div className="summary-buttons" style={{ marginTop: "30px",width: "926px",height: "70px",background:"#F4F4F4",boxShadow: "0px -3px 6px #00000015" }}>
          <button
            onClick={handleConfirm}
            disabled={!isButtonEnabled}
            style={{
              backgroundColor: isButtonEnabled ? "#5861AE" : "#9CA3D9",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              height:"42px",
              width:"150px",
              position:"relative",
              top:"15px",
              left:"640px",
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
