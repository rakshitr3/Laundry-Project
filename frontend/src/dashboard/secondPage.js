import React from 'react'
import DashboardNav from './dashboardNav'

const SecondPage = () => {
    return (
        <div>
            <DashboardNav />
            <br/>
            <div style={{ height: "900px", width: "1400px" }}>
                <p>welcome to our laundry website</p>
            </div>
            =
            <div className='last-footer'>2021 &copy; Laundry</div>
        </div>
    )
}

export default SecondPage