import React from 'react';
import DashboardNav from './dashboardNav';
import { useNavigate } from 'react-router-dom';
import VerticalNav from '../utils/VerticalNav';
import search from "../img/search.svg"

const FirstPage = () => {
    const navigate = useNavigate();
    return (
        <div style={{width: "1440px",
            height: "931px"}}>
            <DashboardNav />
            <div className='middle-dash'>
                <div>
                <VerticalNav />
                </div>
           
            <div style={{height:"931px"}}>
            <div style={{ height: "900px", width: "1400px" }}>
                <h3 style={{position: "relative",left:"30px",top:"20px"}}>Orders | 0 
                    <img style={{position:"relative",right:"-985px",bottom:"-5px"}} src={search} alt='serach icon'/>
                    <input style={{position:"realtive",width:"15%",right:"-970px"}}/></h3>
                <div style={{ position: "relative", top: "35%", left: "47%" }}>
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
                            color: "#5861AE",
                            background:"white"
                        }}
                        onClick={() => navigate("/create")}
                    >
                        Create
                    </button>
                </div>
            </div>
            </div>
           
            </div>


          
       
       
            <div className='last-footer'>2021 &copy; Laundry</div>
        </div>
    );
}

export default FirstPage;
