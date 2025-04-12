import React, { useState } from "react";
import Summary from "./Summary";

const items = ["Shirts", "T Shirts", "Trousers", "Jeans", "Boxers", "Joggers", "Others"];
const washTypes = ["Washing", "Ironing", "Dry Wash", "Chemical Wash"];

const prices = {
  Shirts: 20,
  "T Shirts": 15,
  Trousers: 25,
  Jeans: 30,
  Boxers: 10,
  Joggers: 100,
  Others: 50,
};

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
        <div key={item} style={{ marginBottom: "20px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
          <strong>{item}</strong>
          <input
            type="number"
            min="0"
            value={quantities[item] || ""}
            onChange={(e) => handleQtyChange(item, e.target.value)}
            style={{ marginLeft: "10px", marginRight: "10px" }}
          />
          {washTypes.map((type) => (
            <label key={type} style={{ marginRight: "10px" }}>
              <input
                type="checkbox"
                checked={washSelections[item]?.includes(type) || false}
                onChange={() => handleWashToggle(item, type)}
              />
              {type}
            </label>
          ))}

         <div>
  Price: {quantities[item] || 0} <span style={{ fontSize: '12px' }}>✖</span> &nbsp;
 
  {(quantities[item] && washSelections[item]?.length)
    ? prices[item] + washSelections[item].reduce((acc, wash) => acc + washTypePrices[wash], 0)
    : 0
  } = {getPrice(item)}
</div>
 {/*<div>Price: ₹{getPrice(item)}</div>*/}

          <button onClick={() => handleReset(item)} style={{ marginTop: "5px" }}>
            Reset
          </button>
        </div>
      ))}
      <div style={{ fontWeight: "bold", marginTop: "20px" }}>
        Total: ₹{getTotal()}
      </div>

<button onClick={() => {
  setQuantities({});
  setWashSelections({});
}} style={{ marginTop: "10px", marginRight: "10px" }}>
  Cancel
</button>

      <button onClick={handleProceed} style={{ marginTop: "10px" }}>
        Proceed
      </button>
    </div>
  );
}

export default CreateOrder;
