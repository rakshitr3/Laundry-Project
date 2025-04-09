import React from 'react'
import '../App.css'

const Footer = () => {
  return (
    <div>
         <div className="navbar" style={{ background: "#F8F9FF 0% 0% no-repeat padding-box", boxShadow: "0px -3px 6px #0000000B" }}>
        <h2>Now Refer & Earn ₹500 for every referral*</h2>
        <p>* Terms and conditions will be applied</p>
      </div>

      <div className="bottom">
        <div><h2>ABOUT US</h2><p>Doorstep Wash & Dryclean Service</p></div>
        <div><h2>Home</h2><p>Sign In</p><p>Register</p></div>
        <div><h2>Pricing</h2></div>
        <div><h2>Career</h2><p>Blogs</p><p>Create</p></div>
        <div><h2>Contact</h2></div>
        <div><h2>SOCIAL MEDIA</h2></div>
      </div>

      <div className='last-footer'>2021 &copy; Laundry</div>
    </div>
  )
}

export default Footer