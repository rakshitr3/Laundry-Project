import React, { useEffect, useState } from 'react';
import DashboardNav from '../dashboard/dashboardNav';
import { useNavigate } from 'react-router-dom';
import VerticalNav from '../utils/VerticalNav';
import search from "../img/search.svg";
import { FaRegEye } from "react-icons/fa6";
import axios from 'axios';
import OrderDetails from './OrderDetails';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [viewOrderId, setViewOrderId] = useState(null);
  const navigate = useNavigate();

  const attachRandomStatus = (orders) => {
    if (orders.length === 0) return [];
    const statuses = ["Ready to Pickup", "In Washing", "In Ironing", "Ready to Deliver"];
    const updatedOrders = [...orders];
    const randomIndex = Math.floor(Math.random() * updatedOrders.length);
    updatedOrders[randomIndex].status = "Ready to Pickup";
    return updatedOrders.map((order, index) => {
      if (index === randomIndex) return order;
      return {
        ...order,
        status: statuses[Math.floor(Math.random() * statuses.length)]
      };
    });
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/orders')
      .then(res => {
        const updatedOrders = attachRandomStatus(res.data);
        setOrders(updatedOrders);
      })
      .catch(err => {
        console.error("Failed to fetch orders", err);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const cancelOrder = (orderId) => {
    const updatedOrders = orders.map(order =>
      order._id === orderId ? { ...order, status: "Cancelled" } : order
    );
    setOrders(updatedOrders);
    setViewOrderId(null);
  };

  const selectedOrder = orders.find(order => order._id === viewOrderId);

  return (
    <div style={{ width: "1440px", height: "931px" }}>
      <DashboardNav />
      <div className='middle-dash'>
        <VerticalNav />
        <div style={{ height: "931px" }}>
          <div style={{ height: "900px", width: "1400px" }}>
            <h3 style={{ position: "relative", left: "30px", top: "20px" }}>
              Orders | {orders.length}
              <button onClick={() => navigate("/create")} style={{ position: "relative", left: "840px" }}>Create</button>
              <img style={{ position: "relative", left: "860px" }} src={search} alt='search icon' />
              <input style={{ position: "relative", width: "15%", left: "870px" }} />
            </h3>

            {orders.length === 0 ? (
              <div style={{ position: "relative", top: "35%", left: "47%" }}>
                <p style={{ position: "relative", right: "50px", color: "grey" }}>No Orders available</p>
              </div>
            ) : (
              <table style={{ position: "relative", top: "-10px" }}>
                <thead>
                  <tr>
                    <th>Order Id</th>
                    <th>Order Date & Time</th>
                    <th>Store Location</th>
                    <th>City</th>
                    <th>Store Phone</th>
                    <th>Total Items</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index}>
                      <td>{order._id.slice(-6).toUpperCase()}</td>
                      <td>{formatDate(order.createdAt)}</td>
                      <td>{order.storeAddress || "—"}</td>
                      <td>{order.address || "—"}</td>
                      <td>{order.phone || "—"}</td>
                      <td>{order.items?.reduce((acc, item) => acc + (item.quantity || 0), 0)}</td>
                      <td>₹{order.total || 0}</td>
                      <td style={{
                        fontWeight: "bold",
                        color: order.status === "Ready to Pickup"
                          ? "green"
                          : order.status === "Cancelled"
                          ? "red"
                          : "#333"
                      }}>
                        {order.status}
                      </td>
                      <td>
                        <FaRegEye
                          style={{ height: "20px", cursor: "pointer", marginRight: "10px" }}
                          onClick={() => setViewOrderId(order._id)}
                        />
                        {order.status === "Ready to Pickup" && (
                          <span
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => cancelOrder(order._id)}
                          >
                            Cancel
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {viewOrderId && selectedOrder && (
              <OrderDetails
                order={selectedOrder}
                onClose={() => setViewOrderId(null)}
                onCancel={() => cancelOrder(selectedOrder._id)}
              />
            )}
          </div>
        </div>
      </div>

      <div className='last-footer'>2021 &copy; Laundry</div>
    </div>
  );
};

export default Orders;
