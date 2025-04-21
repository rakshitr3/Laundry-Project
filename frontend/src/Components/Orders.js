import React, { useEffect, useState } from 'react';
import DashboardNav from '../dashboard/dashboardNav';
import { useNavigate } from 'react-router-dom';
import VerticalNav from '../utils/VerticalNav';
import search from "../img/search.svg";
import { FaRegEye } from "react-icons/fa6";
import { FaTriangleExclamation } from "react-icons/fa6";
import axios from 'axios';
import OrderDetails from './OrderDetails';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [viewOrderId, setViewOrderId] = useState(null);
  const [showCancelAlert, setShowCancelAlert] = useState(false);
  const [pendingCancelOrder, setPendingCancelOrder] = useState(null);

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
                    <th style={{font: "normal normal 600 15px/48px Open Sans"}}>Order Id</th>
                    <th style={{font: "normal normal 600 15px/48px Open Sans"}}>Order Date & Time</th>
                    <th style={{font: "normal normal 600 15px/48px Open Sans"}}>Store Location</th>
                    <th style={{font: "normal normal 600 15px/48px Open Sans"}}>City</th>
                    <th style={{font: "normal normal 600 15px/48px Open Sans"}}>Store Phone</th>
                    <th style={{font: "normal normal 600 15px/48px Open Sans"}}>Total Items</th>
                    <th style={{font: "normal normal 600 15px/48px Open Sans"}}>Price</th>
                    <th><label style={{position: "relative",left:"-90px",color:"white",font: "normal normal 600 15px/48px Open Sans"}}>Status </label></th>
                    <th><label style={{position: "relative",left:"-10px",color:"white",font: "normal normal 600 15px/48px Open Sans"}}>View</label></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index} style={{width: "1293px",height: "50px"}} 
                    className={
                     index % 2 === 0
                        ? "order-white"
                        : "order-blue"
                    }>
                      <td style={{ textAlign: "center" }}>{order._id.slice(-6).toUpperCase()}</td>
                      <td style={{ textAlign: "center" }}>{formatDate(order.createdAt)}</td>
                      <td style={{ textAlign: "center" }}>{order.storeAddress || "—"}</td>
                      <td style={{ textAlign: "center" }}>{order.store || "—"}</td>
                      <td style={{ textAlign: "center" }}>+91 &nbsp; {order.phone || "—"}</td>
                      <td style={{ textAlign: "center" }}>{order.items?.reduce((acc, item) => acc + (item.quantity || 0), 0)}</td>
                      <td style={{ textAlign: "center",color:"#5861AE",font: "normal normal bold 15px/48px Open Sans" }}>{order.total || 0} Rs</td>
                      <td style={{
                        color: order.status === "Cancelled" ? "red": "#333"
                      }}>
                       &nbsp; {order.status}

                        {order.status === "Ready to Pickup" && (
                          <span
                            style={{ color: "red", cursor: "pointer",font: "normal normal normal 15px/48px Open Sans" }}
                            onClick={() => cancelOrder(order._id)}
                          >
                           &nbsp; &nbsp; Cancel Order
                          </span>
                        )}
                      </td>
                      <td>
                        <FaRegEye
                          style={{ height: "20px", cursor: "pointer", marginRight: "10px" }}
                          onClick={() => setViewOrderId(order._id)}
                        />
                  
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

          {viewOrderId && selectedOrder && (
            <div className="popup-overlay1">
          <div className="popup-summary">
          <OrderDetails
                    order={selectedOrder}
                    onClose={() => setViewOrderId(null)}
                    onCancel={() => {
                      setViewOrderId(null);
                      setShowCancelAlert(true);
                      setPendingCancelOrder(selectedOrder);
                    }}
                  />
              </div>
              </div>
            )}
          
          {showCancelAlert && pendingCancelOrder && (
        <div className="alert-overlay">
          <div className="alert-box">
            <div className="alert-header">
              <span className="alert-title">Alert</span>
              <button className="close-btn1" onClick={() => setShowCancelAlert(false)}>×</button>
            </div>
            <div className="alert-body">
              
            <FaTriangleExclamation style={{color:"red",position: "relative",top:"53px",marginRight:"20px",width:"34px",
height: "30px"}} />
               <p style={{position:"relative",top:"15px",left:"10px",letterSpacing: "0.34px"}}>
                      Are you sure you want to cancel the <br />
                      order <strong style={{ color: "#5861AE", fontWeight: "550" }}>
                        No: {pendingCancelOrder._id.slice(-6).toUpperCase()}
                      </strong>
                    </p>
            </div>
            <button className="proceed-btn" onClick={() => {
                    cancelOrder(pendingCancelOrder._id);
                    setShowCancelAlert(false);
                    setPendingCancelOrder(null);
                  }}>Proceed</button>
          </div>
        </div>
      )}
          </div>
        </div>
      </div>

      <div className='last-footer'>2021 &copy; Laundry</div>
    </div>
  );
};

export default Orders;
 