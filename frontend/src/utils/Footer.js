import React from 'react'
import '../App.css'
import facebook from "../img/facebook.svg"
import insta from "../img/instagram.svg"
import linkdin from "../img/linkedin.svg"

const Footer = () => {
  return (
    <div>
         <div className="navbar terms" style={{ background: "#F8F9FF 0% 0% no-repeat padding-box", boxShadow: "0px -3px 6px #0000000B" }}>
        <h2 className='referral'>Now Refer & Earn ₹500 for every referral*</h2>
        <p className='conditions'>* Terms and conditions will be applied</p>
      </div>

      <div className="bottom">

        <div>
        <div><h2 className='about'>ABOUT US</h2><p className='doorstep-bottom'>Doorstep Wash & Dryclean Service</p></div>
        </div>

        <div className='bottom-seperate'>
        <div className='home-bottom'><h2>Home</h2><p>Sign In</p><p>Register</p></div>
        <div><h2>Pricing</h2></div>
        <div><h2>Career</h2><p>Blogs</p><p>Create</p></div>
        <div><h2>Contact</h2></div>
        <div>
  <h2>SOCIAL MEDIA</h2>
  <div style={{display:"flex",gap:"40px",padding:"4px"}}>
  <img src={facebook} alt="Facebook" />
  <img src={insta} alt="Instagram" />
  <img src={linkdin} alt="LinkedIn" />
  </div>
 
</div>

      </div>
      </div>

      <div className='last-footer'>2021 &copy; Laundry</div>
    </div>
  )
}

export default Footer