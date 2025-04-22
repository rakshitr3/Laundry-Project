import React, { useState } from "react";
import Summary from "./Summary";
import "./CreateOrder.css";

// Images
import washing from "../img/washing-machine.svg";
import towel from "../img/towel.svg";
import ironing from "../img/ironing.svg";
import bleach from "../img/bleach.svg";
import search from "../img/search.svg";

import shirt from "../img/shirt.jpg";
import tshirt from "../img/t-shirt.png";
import trousers from "../img/trousers.jpg";
import jeans from "../img/jeans.avif";
import boxers from "../img/boxers.jpg";
import joggers from "../img/joggers.jpg";
import others from "../img/cloths.jpg";
import SuccessPopup from "./SuccessPopup";

const items = [
  { name: "Shirts", icon: <img src={shirt} alt="Shirt" style={{ height: "30px", width: "35px" }} /> },
  { name: "T Shirts", icon: <img src={tshirt} alt="T-shirt" style={{ height: "30px", width: "35px" }} /> },
  { name: "Trousers", icon: <img src={trousers} alt="Trousers" style={{ height: "30px", width: "35px" }} /> },
  { name: "Jeans", icon: <img src={jeans} alt="Jeans" style={{ height: "30px", width: "35px" }} /> },
  { name: "Boxers", icon: <img src={boxers} alt="Boxers" style={{ height: "30px", width: "35px" }} /> },
  { name: "Joggers", icon: <img src={joggers} alt="Joggers" style={{ height: "30px", width: "35px" }} /> },
  { name: "Others", icon: <img src={others} alt="Others" style={{ height: "30px", width: "35px" }} /> },
];

const washTypes = [
  { type: "Washing", icon: washing },
  { type: "Ironing", icon: ironing },
  { type: "Dry Wash", icon: towel },
  { type: "Chemical Wash", icon: bleach },
];

const washTypePrices = {
  Washing: 10,
  Ironing: 15,
  "Dry Wash": 20,
  "Chemical Wash": 25,
};

function CreateOrder() {
  const [quantities, setQuantities] = useState({});
  const [washSelections, setWashSelections] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleQtyChange = (item, qty) => {
    const parsedQty = parseInt(qty) || 0;
    setQuantities({ ...quantities, [item]: parsedQty });
  };

  const handleWashToggle = (item, type) => {
    const current = washSelections[item] || [];
    const updated = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type];

    setWashSelections({ ...washSelections, [item]: updated });

    if (!quantities[item] && !current.includes(type)) {
      setQuantities({ ...quantities, [item]: 1 });
    }
  };

  const handleReset = (item) => {
    setQuantities((prev) => {
      const updated = { ...prev };
      delete updated[item];
      return updated;
    });

    setWashSelections((prev) => {
      const updated = { ...prev };
      delete updated[item];
      return updated;
    });
  };

  const getWashSum = (item) => {
    const selectedWashes = washSelections[item] || [];
    return selectedWashes.reduce((acc, wash) => acc + (washTypePrices[wash] || 0), 0);
  };

  const getPrice = (item) => {
    const qty = quantities[item];
    const washSum = getWashSum(item);
    if (!qty || washSum === 0) return 0;
    return qty * washSum;
  };

  const getTotal = () => {
    return items.reduce((acc, { name }) => acc + getPrice(name), 0);
  };

  const selectedItems = items
    .map(({ name }) => ({
      type: name,
      quantity: quantities[name],
      washType: washSelections[name],
      price: getPrice(name),
    }))
    .filter((item) => item.quantity > 0 && item.washType?.length > 0);

  const handleProceed = () => {
    setShowSummary(true);
  };

  const handleOrderConfirm = () => {
    setShowSummary(false);
    setShowSuccessPopup(true);
  };

  return (
    <div style={{ position: "relative" }}>
      <h2 style={{ color: "black", position: "relative", top: "27px", left: "50px" }}>Create Order</h2>

      <img style={{ position: "relative", right: "-1145px", bottom: "20px" }} src={search} alt="search icon" />
      <input style={{ position: "relative", width: "15%", right: "-1130px", bottom: "25px" }} />

      <table>
        <thead>
          <tr>
            <th><span style={{ position: "relative", left: "-170px" }}> Product Type</span></th>
            <th><span style={{ position: "relative", left: "-20px" }}> Quantity</span></th>
            <th><span style={{ position: "relative", left: "-170px" }}> Wash Type</span></th>
            <th><span style={{ position: "relative", left: "-35px" }}> Price</span></th>
            <th><span style={{ position: "relative", left: "-170px" }}> &nbsp;</span></th>
          </tr>
        </thead>
        <tbody>
          {items.map(({ name, icon }) => {
            const selectedWashes = washSelections[name] || [];
            const qty = quantities[name] || 0;
            const washSum = getWashSum(name);
            const price = getPrice(name);

            return (
              <tr key={name}>
                <td style={{ padding: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "24px" }}>{icon}</span>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <strong>{name}</strong>
                    <div>lorem ipsum is simply dummy text of the</div>
                  </div>
                </td>
                <td style={{ padding: "10px", position: "relative", top: "20px" }}>
                  <input
                    type="number"
                    min="0"
                    value={quantities[name] || ""}
                    onChange={(e) => handleQtyChange(name, e.target.value)}
                    style={{
                      width: "60px",
                      padding: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)"
                    }}
                  />
                </td>
                <td style={{ padding: "10px" }}>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    {washTypes.map(({ type, icon }) => {
                      const isSelected = selectedWashes.includes(type);
                      return (
                        <div
                          key={type}
                          className={`wash-option ${isSelected ? "selected" : ""}`}
                          onClick={() => handleWashToggle(name, type)}
                        >
                          <img src={icon} alt={type} />
                        </div>
                      );
                    })}
                  </div>
                </td>
                <td style={{ padding: "10px", width: "100px" }}>
                  {qty > 0 && washSum > 0 ? (
                    <>
                      <span style={{ fontWeight: "bold" }}>{qty}</span>
                      <span style={{ fontWeight: "bold" }}> × </span>
                      <span style={{ fontWeight: "bold" }}>{washSum}</span>
                      <span style={{ fontWeight: "bold" }}> = </span>
                      <span style={{ fontSize: "1.3em", color: "#5861AE", fontWeight: "bold" }}>{price}</span>
                    </>
                  ) : (
                    "__"
                  )}
                </td>
                <td style={{ padding: "10px", width: "80px", textAlign: "center" }}>
                  <button
                    onClick={() => handleReset(name)}
                    style={{
                      visibility: selectedWashes.length > 0 ? "visible" : "hidden",
                      width: "81px",
                    }}
                  >
                    Reset
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ display: "flex", justifyContent: "right", marginTop: "-35px", marginRight: "-50px" }}>
        <button
          onClick={() => {
            setQuantities({});
            setWashSelections({});
          }}
          style={{ marginRight: "10px" }}
        >
          Cancel
        </button>

        <button
          onClick={handleProceed}
          style={{
            background: "#5861AE", color: "white",
            ...(showSummary && { position: "relative", right: "120px" })
          }}>Proceed </button>

      </div>

      {showSummary && (                      //if showSummary true then only summary component called
        <div className="popup-overlay">
          <div className="popup-summary">
            <Summary
              items={selectedItems}
              total={getTotal()}
              onBack={() => setShowSummary(false)}
              onConfirm={handleOrderConfirm}            //sending this function to summary component and then it attached with confirm button there
            />
          </div>
        </div>
      )}

      {showSuccessPopup && (
        <div className="centered-success-popup">
          <SuccessPopup />
        </div>
      )}
    </div>
  );
}

export default CreateOrder;
