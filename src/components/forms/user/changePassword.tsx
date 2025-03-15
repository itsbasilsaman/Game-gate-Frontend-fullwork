 
import "react-phone-number-input/style.css";  
// import BgImg from "../../../assets/images/logo.png";
import { useState } from "react";


  const  PasswordChange = () => {

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);



  return (
    <div
    className="flex items-center p-2 justify-center min-h-screen relative overflow-hidden"
    style={{
      // backgroundImage: `url(${BgImg})`,
      backgroundAttachment: "fixed",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    }}
  >
    {/* Background Animation */}
    <div className="absolute inset-0 animate-pulse  "></div>
    {/* Semi-transparent Overlay */}
    <div className="absolute inset-0  adminlogin-background">
    <div className="background-one   relative inset-0 flex justify-center items-start pt-[60px]">
        {/* <img src={BgImg} alt="" className="w-[110px]" /> */}
      </div>
      <div className="background-two"></div>
    </div>

    {/* Form Container */}
    <div
      className="relative z-10 flex flex-col bg-white   items-center px-[28px] py-[75px] w-full max-w-md admin-login-box   "
      style={{
        // backgroundImage: `url(${BgImg})`,
       
      }}
    >
      <div className="w-full max-w-sm mx-auto bg-white p-6 rounded-lg  ">
      <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{fontFamily:'Unbounded' , color:'#24288E'}}>Change password</h2>
      <p className="text-sm text-gray-600 mb-6">
        Do not use the same password as you do on other websites or for your email account.
        Changing your password will invalidate all existing login sessions.
      </p>

      {/* Current Password */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1"   style={{ color:'#24288E'}}>
          Current password
        </label>
        <div className="relative">
          <input
            type={showCurrentPassword ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-500"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          >
            {showCurrentPassword ? "🙈" : "👁️"}
          </button>
        </div>
        <a href="#" className="text-sm text-red-500 hover:underline mt-1 block">
          Forgot your password?
        </a>
      </div>

      {/* New Password */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1"  style={{ color:'#24288E'}}>
          New password
        </label>
        <div className="relative">
          <input
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-500"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? "🙈" : "👁️"}
          </button>
        </div>
      </div>

      {/* Confirm New Password */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1"  style={{ color:'#24288E'}}>
          Confirm new password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-500"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? "🙈" : "👁️"}
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
          style={{ backgroundColor:'#24288E'}}
        >
          Save
        </button>
      </div>
    </div>
      
    </div>
  </div>
  )
}

export default PasswordChange