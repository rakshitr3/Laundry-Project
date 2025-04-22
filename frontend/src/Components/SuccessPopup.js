import React from "react";
import { useNavigate } from "react-router-dom";
import { TiTick } from "react-icons/ti";

function SuccessPopup() {
  const navigate = useNavigate();

  const handleGoToOrders = () => {
    navigate("/orders");
  };
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: "400px",
          height: "400px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <div style={{ width: "120px", height: "120px", background: "#5861AE60", borderRadius: "100px" }}>
          <TiTick style={{ width: "70px", height: "70px", color: "#5861AE", position: "relative", top: "20%" }} /> </div>
        <h3 style={{ marginBottom: "20px" }}>Your order is<br /> successfully placed!</h3>
        <p>You can track the delivery in the<br /> "Orders" section.</p>
        <button
          onClick={handleGoToOrders}
          style={{
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "22px",
            cursor: "pointer",
            fontSize: "16px",
            width: "235px",
            height: "44px",
            background: "#5861AE"
          }}
        >
          Go to Orders
        </button>
      </div>
    </div>
  );
}

export default SuccessPopup;


/*
.centered-success-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
}

*/