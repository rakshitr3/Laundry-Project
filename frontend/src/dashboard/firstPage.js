import React from 'react';
import DashboardNav from './dashboardNav';
import { useNavigate } from 'react-router-dom';

const FirstPage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <DashboardNav />
            <div style={{ height: "900px", width: "1400px" }}>
                <h3 style={{position: "relative",left:"30px",top:"20px"}}>Orders | 0</h3>
                <div style={{ position: "relative", top: "50%", left: "50%" }}>
                    <p style={{ position: "relative", right: "50px", color: "grey" }}>No Orders available</p>
                    <button
                        style={{
                            position: "relative",
                            top: "15px",
                            left: "-35px",
                            width: "107px",
                            height: "32px",
                            border: "1px solid #5861AE",
                            borderRadius: "4px",
                            color: "#5861AE"
                        }}
                        onClick={() => navigate("/create")}
                    >
                        Create
                    </button>
                </div>
            </div>
            <div className='last-footer'>2021 &copy; Laundry</div>
        </div>
    );
}

export default FirstPage;
