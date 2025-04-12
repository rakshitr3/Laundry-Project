import React, { useState } from "react";
import axios from "axios";

function Summary({ items, total, onBack }) {
  const [address, setAddress] = useState("#223, 10th road, JP Nagar, Bangalore");
  const pickupCharges = 90;
  const grandTotal = total + pickupCharges;

  const handleConfirm = async () => {
    const order = {
      items,
      store: "Jp Nagar",
      storeAddress: "Near Phone booth, 10th road",
      phone: "9999999999",
      address,
      pickupCharges,
      total: grandTotal,
    };
    try {
      await axios.post("http://localhost:5000/api/orders", order);
      alert("Order placed!");
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="summary-container">
      <h2>Summary</h2>
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>
            <strong>{item.type}</strong> - {item.washType.join("/")} - {item.quantity} x{" "}
            {item.price / item.quantity} = Rs {item.price}
          </li>
        ))}
      </ul>
      <p>Subtotal: Rs {total}</p>
      <p>Pickup Charges: Rs {pickupCharges}</p>
      <h3>Total: Rs {grandTotal}</h3>
      <p><strong>Address:</strong> {address}</p>

      <button onClick={handleConfirm}>Confirm</button>
      <button onClick={onBack}>Back</button>
    </div>
  );
}

export default Summary;
