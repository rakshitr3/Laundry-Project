import React, { useState } from "react";
import Summary from "./Summary";
import washing from "../img/washing-machine.svg";
import towel from "../img/towel.svg";
import ironing from "../img/ironing.svg";
import bleach from "../img/bleach.svg";

// Item names and wash types
const items = ["Shirts", "T Shirts", "Trousers", "Jeans", "Boxers", "Joggers", "Others"];

const washTypes = [
  { type: "Washing", icon: washing },
  { type: "Ironing", icon: ironing },
  { type: "Dry Wash", icon: towel },
  { type: "Chemical Wash", icon: bleach },
];

// Base item prices
const prices = {
  Shirts: 20,
  "T Shirts": 15,
  Trousers: 25,
  Jeans: 30,
  Boxers: 10,
  Joggers: 100,
  Others: 50,
};

// Extra price per wash type
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

  const getPrice = (item) => {
    const qty = quantities[item];
    const selectedWashes = washSelections[item];
    if (!qty || !selectedWashes || selectedWashes.length === 0) return 0;

    const basePrice = prices[item];
    const washExtra = selectedWashes.reduce(
      (acc, wash) => acc + (washTypePrices[wash] || 0),
      0
    );

    return qty * (basePrice + washExtra);
  };

  const getTotal = () => {
    return items.reduce((acc, item) => acc + getPrice(item), 0);
  };

  const selectedItems = items
    .map((item) => ({
      type: item,
      quantity: quantities[item],
      washType: washSelections[item],
      price: getPrice(item),
    }))
    .filter((item) => item.quantity > 0 && item.washType?.length > 0);

  const handleProceed = () => {
    setShowSummary(true);
  };

  return showSummary ? (
    <Summary
      items={selectedItems}
      total={getTotal()}
      onBack={() => setShowSummary(false)}
    />
  ) : (
    <div>
      <h2>Create Order</h2>
      {items.map((item) => (
        <div
          key={item}
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "20px",
            borderBottom: "1px solid #ccc",
            paddingBottom: "10px",
          }}
        >
          <strong>{item}</strong>
          <input
            type="number"
            min="0"
            value={quantities[item] || ""}
            onChange={(e) => handleQtyChange(item, e.target.value)}
            style={{ margin: "10px 0", width: "80px" }}
          />

          {/* Wash type icons */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {washTypes.map(({ type, icon }) => {
              const isSelected = washSelections[item]?.includes(type);
              return (
                <div
                  key={type}
                  onClick={() => handleWashToggle(item, type)}
                  style={{
                    cursor: "pointer",
                    padding: "10px",
                    borderRadius: "6px",
                    backgroundColor: isSelected ? "#5861AE" : "#f0f0f0",
                    color: isSelected ? "#fff" : "#000",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "80px",
                    fontSize: "14px",
                    border: isSelected ? "2px solid #0056b3" : "1px solid #ccc",
                  }}
                >
                  <img src={icon} alt={type} style={{ width: "30px", height: "30px" }} />
                
                </div>
              );
            })}
          </div>

          {/* Show price only if wash type is selected */}
          {washSelections[item]?.length > 0 && (
            <div style={{ marginTop: "10px" }}>
              Price: {quantities[item] || 0} <span style={{ fontSize: '12px' }}>✖</span> &nbsp;
              {prices[item] + washSelections[item].reduce((acc, wash) => acc + washTypePrices[wash], 0)} = ₹{getPrice(item)}
            </div>
          )}

          {/* Show Reset button only if wash type is selected */}
          {washSelections[item]?.length > 0 && (
            <button onClick={() => handleReset(item)} style={{ marginTop: "10px" }}>
              Reset
            </button>
          )}
        </div>
      ))}

      <div style={{ fontWeight: "bold", marginTop: "20px" }}>
        Total: ₹{getTotal()}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => {
            setQuantities({});
            setWashSelections({});
          }}
          style={{ marginRight: "10px" }}
        >
          Cancel
        </button>

        <button onClick={handleProceed}>Proceed</button>
      </div>
    </div>
  );
}

export default CreateOrder;
