//to show summary popup

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreateOrder.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import tick from "../img/tick.svg"

function Summary({ items, total, onBack, onConfirm }) {
  const [store, setStore] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const pickupCharges = 90;
  const grandTotal = total + pickupCharges;

  const [userAddresses] = useState([
    { title: "Home", address: "#223, 10th road, JP Nagar, Bangalore" },
    { title: "Other", address: "Flat 402, A-block, Sunrise Apartments, Chennai" },
  ]);
  const [selectedAddress, setSelectedAddress] = useState(userAddresses[0].address);


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

      onConfirm(); //Close Summary and show SuccessPopup in parent using onConfirm fn that it got from createOrder

    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  const handleAddAddressClick = () => {
    document.getElementById("store-fields").scrollIntoView({ behavior: "smooth" });      //we can also use useref here
  };

  return (
    <div className="summary-popup-content">
      <div className="popup-nav">
        <p style={{ position: "relative", color: "white", top: "20px", left: "20px", font: "normal normal 500 22px/25px Open Sans" }}>Summary</p>
        <button className="close-btn" onClick={onBack}>×</button>
      </div>

      <div className="summary-details">
        <div className="store-info" id="store-fields">

          <label style={{ display: "flex", flexDirection: "column", marginBottom: "40px", position: "relative" }}>
            <select
              value={store}
              onChange={(e) => setStore(e.target.value)}
              className={store ? "store-select selected" : "store-select"}
            >

              <option value="" disabled hidden>Store Location</option>
              <optgroup label="Available Stores" style={{ color: "black" }}>
                <option value="Jp Nagar">Jp Nagar</option>
                <option value="Mangalore">Mangalore</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Mumbai">Mumbai</option>
              </optgroup>
            </select>
            <span style={{ position: "absolute", right: "-20px", bottom: "7px", pointerEvents: "none", fontSize: "20px", color: "#555" }}>
              <MdKeyboardArrowDown />
            </span>
          </label>

          {/* Address and Phone */}
          <label style={{ display: "flex", flexDirection: "column", marginBottom: "5px", color: "grey", marginTop: "15px" }}>
            <strong>Store Address:</strong>
            <input
              type="text"
              value={storeAddress}
              placeholder="__"
              onChange={(e) => setStoreAddress(e.target.value)}
              style={{ border: "none" }}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", marginBottom: "5px", color: "grey", marginTop: "15px" }}>
            <strong>Phone</strong>
            <input
              type="text"
              value={phone}
              placeholder="__"
              onChange={(e) => setPhone(e.target.value)}
              style={{ border: "none" }}
            />
          </label>
        </div>

        {/* Order Summary */}
        <div className="order-details">
          <h4 style={{ position: "relative", left: "10px", top: "-53px", color: "grey" }}>Order Details:</h4>
          <table className="summary-table">
            <tbody>
              {items.map((item, idx) => (
                <tr key={idx}>
                  <td style={{
                    borderBottom: "0.5px solid lightgrey", font: "normal normal normal 20px/24px Open Sans", letterSpacing: "0.43px",
                    color: "#1B2734"
                  }}>{item.type}</td>
                  <td style={{
                    borderBottom: "0.5px solid lightgrey", font: "italic normal normal 16px/22px Open Sans",
                    letterSpacing: "0.38px"
                  }}>{item.washType.join(", ")}</td>
                  <td style={{
                    borderBottom: "0.5px solid lightgrey", font: "normal normal 400 17px/30px Open Sans",
                    letterSpacing: "0.38px"
                  }}>{item.quantity} x {item.price / item.quantity} =</td>
                  <td style={{
                    borderBottom: "0.5px solid lightgrey", color: "#5861AE",textAlign:"right",position:"relative",right:"32px",font: "normal normal 600 22px/50px Open Sans",
                    letterSpacing: "0.48px"
                  }}>{item.price}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="4" style={{ textAlign: "right", paddingTop: "10px" }}>
                  <td style={{ borderBottom: "0.5px solid lightgrey", display: "flex", justifyContent: "right", gap: "60px", position: "relative", left: "465px", width: "200px",top:"3px" }}>Sub Total: <strong style={{ font: "normal normal 600 21px/40px Open Sans",letterSpacing: "0.43px",position:"relative",top:"-7px" }}> {total}</strong></td>
                  <td style={{ display: "flex", justifyContent: "right", gap: "60px", position: "relative", left: "-37px",top:"7px" }}> Pickup Charges: <strong style={{ font: "normal normal 600 24px/27px Open Sans" }}>{pickupCharges} </strong></td>
                  <h3 style={{ color: "white", background: "#5861AE", width: "700px", height: "49px" }}><span style={{ position: "relative", top: "10px", right: "40px", fontWeight: "400" }}>  Total: &nbsp; &nbsp; &nbsp;<strong style={{ fontWeight: "700" }}>Rs {grandTotal}</strong> </span></h3>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Address Section */}
        <div style={{ marginTop: "20px" }}>
          <h3>Address</h3>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {userAddresses.map((addrObj, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedAddress(addrObj.address)}
                style={{
                  border: selectedAddress === addrObj.address ? "1px solid #5861AE" : "1px solid #ccc",
                  backgroundColor: "#fff",
                  padding: "15px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  position: "relative",
                  width: "200px",
                  height: "60px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                }}
              >
                <strong style={{font: "normal normal bold 18px/24px Open Sans",letterSpacing: "0.18px",position:"relative",top:"-5px"}}>{addrObj.title}</strong>
                <div style={{ marginTop: "3px",color: "#555",font: "normal normal normal 16px/18px Open Sans",letterSpacing: "0.80px" }}>
                  {addrObj.address}
                </div>
                {selectedAddress === addrObj.address && (
                  <span style={{
                    position: "absolute",
                    top: "8px",
                    right: "10px",
                    color: "green",
                    fontSize: "20px",
                  }}>
                    <img src={tick} alt="tick" />
                  </span>
                )}
              </div>
            ))}

            <div
              onClick={handleAddAddressClick}
              style={{
                color: "#5861AE",
                font: "normal normal bold 18px/24px Open Sans",
                display: "flex",
                alignItems: "center",
              }}
            >
              ADD NEW
            </div>
          </div>
        </div>


        <div className="summary-buttons1">
          <button
            onClick={handleConfirm}
            disabled={!isButtonEnabled}        //disabled untill isButtonEnabled false
            style={{
              backgroundColor: isButtonEnabled ? "#5861AE" : "#9CA3D9",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              height: "42px",
              width: "150px",
              position: "relative",
              top: "15px",
              left: "640px",
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
