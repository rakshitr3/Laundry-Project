import React, { useEffect, useState } from 'react';
import DashboardNav from '../dashboard/dashboardNav';
import { useNavigate } from 'react-router-dom';
import VerticalNav from '../utils/VerticalNav';
import search from "../img/search.svg";
import { FaRegEye } from "react-icons/fa6";
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/orders')
      .then(res => {
        setOrders(res.data);
      })
      .catch(err => {
        console.error("Failed to fetch orders", err);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <div style={{ width: "1440px", height: "931px" }}>
      <DashboardNav />
      <div className='middle-dash'>
        <div><VerticalNav /></div>

        <div style={{ height: "931px" }}>
          <div style={{ height: "900px", width: "1400px" }}>
            <h3 style={{ position: "relative", left: "30px", top: "20px" }}>
              Orders | {orders.length}
              <button onClick={() => navigate("/create")} style={{ marginLeft: "20px" }}>Create</button>
              <img style={{ position: "relative", left: "860px" }} src={search} alt='search icon' />
              <input style={{ position: "relative", width: "15%", left: "870px" }} />
            </h3>

            {orders.length === 0 ? (
              <div style={{ position: "relative", top: "35%", left: "47%" }}>
                <p style={{ position: "relative", right: "50px", color: "grey" }}>No Orders available</p>
              </div>
            ) : (
              <table style={{position: "relative",top:"-10px"}}>
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
                    <th>View</th>
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
                      <td style={{ color: "green", fontWeight: "bold" }}>Ready to Pickup</td>
                      <td>
                      <FaRegEye  style={{ height: "20px", cursor: "pointer"}} onClick={() => navigate(`/order/${order._id}`)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <div className='last-footer'>2021 &copy; Laundry</div>
    </div>
  );
};

export default Orders;
