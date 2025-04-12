import React from 'react'
import DashboardNav from './dashboardNav'
import CreateOrder from '../Components/CreateOrder'

const SecondPage = () => {
    return (
        <div>
            <DashboardNav />
            
           <CreateOrder />

            <div className='last-footer'>2021 &copy; Laundry</div>
        </div>
    )
}

export default SecondPage