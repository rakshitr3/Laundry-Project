import React from 'react'
import DashboardNav from './dashboardNav'
import CreateOrder from '../Components/CreateOrder'
import VerticalNav from '../utils/VerticalNav'
import '../utils/VerticalNav.css'

const SecondPage = () => {
    return (
        <div style={{width: "1440px",
            height: "931px"}}>
            <DashboardNav />
            <div className='middle-dash'>
                <div>
                <VerticalNav />
                </div>
           
            <div style={{height:"931px"}}>
            <CreateOrder />
            </div>
           
            </div>
           

            <div className='last-footer'>2021 &copy; Laundry</div>
        </div>
    )
}

export default SecondPage