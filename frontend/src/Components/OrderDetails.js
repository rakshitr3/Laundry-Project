//same as summary popup this will show order details on clicking of eye button

import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import "./CreateOrder.css";

const STATUS_STEPS = ["Ready to Pickup", "In Washing", "In Ironing", "Ready to Deliver"];

const STATUS_DISPLAY_NAMES = {
  "Ready to Pickup": "Picked up",
  "In Washing": "Washed",
  "In Ironing": "Ironed",
  "Ready to Deliver": "Delivered"
};

const OrderDetails = ({ order, onClose, onCancel }) => {
  const [store, setStore] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [userAddresses] = useState([
    { title: "Home", address: "#223, 10th road, JP Nagar, Bangalore" }
  ]);
  const [selectedAddress, setSelectedAddress] = useState(userAddresses[0].address);

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
  const subTotal = total - pickupCharges;
  const grandTotal = total;

  const getStepClass = (step) => {
    const index = STATUS_STEPS.indexOf(step);
    const currentIndex = STATUS_STEPS.indexOf(status);
    return index <= currentIndex ? "step active" : "step";
  };

  const getCircleColor = (step) => {
    if (status === "Ready to Pickup") {
      return "white"; // Circle color becomes white if status is "Ready to Pickup"
    }
    // For active steps, color them blue
    return step === status || STATUS_STEPS.indexOf(step) < STATUS_STEPS.indexOf(status) ? "blue" : "gray";
  };

  return (
    <>
      <div className="summary-popup-content">
        <div className="popup-nav">
          <p style={{ position: "relative", color: "white", top: "20px", left: "20px", font: "normal normal 500 22px/25px Open Sans" }}>Summary</p>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="summary-details" style={{ position: "relative", bottom: "30px" }}>
          <div className="store-info" id="store-fields" style={{ position: "relative", top: "-22px" }}>
          <label style={{ display: "flex", flexDirection: "column",gap:"8px", position:"relative",bottom: "5px", color: "grey",top: "15px",left:"35px" }}>
              <strong>Store Location</strong>
              <input
                type="text"
                value={store}
                placeholder="__"
                onChange={(e) => setStore(e.target.value)}
                style={{ border: "none" }}
              />
            </label>

            {/* Address and Phone */}
            <label style={{ display: "flex", flexDirection: "column",gap:"8px", marginBottom: "5px", color: "grey", marginTop: "15px" }}>
              <strong>Store Address:</strong>
              <input
                type="text"
                value={storeAddress}
                placeholder="__"
                onChange={(e) => setStoreAddress(e.target.value)}
                style={{ border: "none" }}
              />
            </label>

            <label style={{ display: "flex", flexDirection: "column",gap:"8px", marginBottom: "5px", color: "grey", marginTop: "15px",marginLeft:"-45px" }}>
              <strong>Phone</strong>
              <input
                type="text"
                value={phone}
                placeholder="__"
                onChange={(e) => setPhone(e.target.value)}
                style={{ border: "none",position: "relative",left:"-4px" }}
              />
            </label>
          </div>

          <div style={{ display: "flex", borderBottom: "1px solid lightgrey", height: "50px" }}>
            {STATUS_STEPS.map((step, i) => (
              <div
                key={i}
                className={getStepClass(step)}
                style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
              >
                <span className="circle" style={{ backgroundColor: getCircleColor(step) }}>
                  {getStepClass(step) === "step active" && <FaCheck size={12} />}
                </span>

                <span className="step-label" style={{ position: "relative", top: "-2px" }}>
                  &nbsp; {STATUS_DISPLAY_NAMES[step]}
                </span>
                {i !== STATUS_STEPS.length - 1 ? (
                  <div className="line" />
                ) : (
                  <div className="half-blue-line" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="status-nav">
          <div className="order-details">
            <br /><br />
            <h4 style={{ position: "relative", left: "10px", top: "-30px", color: "grey" }}>Order Details</h4>
            <table className="summary-table">
              <tbody>
                {items.map((item, idx) => (
                  <tr key={idx}>
                    <td style={{
                      borderBottom: "0.5px solid lightgrey", font: "normal normal normal 20px/50px Open Sans", letterSpacing: "0.43px",
                      color: "#1B2734"
                    }}>{item.type}</td>
                    <td style={{
                      borderBottom: "0.5px solid lightgrey", font: "italic normal normal 16px/50px Open Sans",
                      letterSpacing: "0.38px"
                    }}>{item.washType.join(", ")}</td>
                    <td style={{
                      borderBottom: "0.5px solid lightgrey", font: "normal normal 400 17px/50px Open Sans",
                      letterSpacing: "0.38px"
                    }}>{item.quantity} x {item.price / item.quantity} =</td>
                    <td style={{
                      borderBottom: "0.5px solid lightgrey", color: "#5861AE", font: "normal normal 600 20px/27px Open Sans",
                      letterSpacing: "0.48px",textAlign:"right",position:"relative",left:"-28px"
                    }}>{item.price}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="4" style={{ textAlign: "right", paddingTop: "10px" }}>
                    <td style={{ borderBottom: "0.5px solid lightgrey", display: "flex", justifyContent: "right", gap: "60px", position: "relative", left: "493px", width: "200px" }}>Sub Total: <strong style={{ font: "normal normal 600 20px/24px Open Sans" }}>{subTotal}</strong></td>
                    <td style={{ display: "flex", justifyContent: "right", gap: "60px", position: "relative", left: "-30px", top: "10px" }}>Pickup Charges: <strong style={{ font: "normal normal 600 20px/24px Open Sans" }}>{pickupCharges}</strong></td>
                    <h3 style={{ color: "white", background: "#5861AE", width: "720px", height: "49px" }}>
                      <span style={{ position: "relative", top: "10px", right: "20px", fontWeight: "400" }}>Total: &nbsp; &nbsp; &nbsp;<strong style={{ font: "normal normal bold 20px/30px Open Sans",letterSpacing: "1.43px"}}>Rs {grandTotal}</strong></span>
                    </h3>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ position: "relative", top: "450px", right: "730px" }}>
            <h3 style={{ color: "grey" }}>Address</h3>
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
                  <strong>{addrObj.title}</strong>
                  <div style={{ marginTop: "5px", fontSize: "14px", color: "#555" }}>
                    {addrObj.address}
                  </div>
                  {selectedAddress === addrObj.address && (
                    <span style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      color: "green",
                      fontSize: "20px",
                    }}>

                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="summary-buttons">
        {status === "Ready to Pickup" && (
          <button className="cancel-order-btn" onClick={onCancel}>
            Cancel Order
          </button>
        )}
      </div>
    </>
  );
};

export default OrderDetails;
