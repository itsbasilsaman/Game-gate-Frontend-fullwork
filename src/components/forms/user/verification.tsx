import React, { useState, useEffect } from "react";
import {
  verifiyOtpUser,
  loginUser,
} from "../../../reduxKit/actions/auth/authAction";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { IVerifyOtp } from "../../../interfaces/user/userLoginInterfaces";
import toast from "react-hot-toast";

const EmailVerification: React.FC = () => {
  const [Content, setContent] = useState<string | null>("");
  const [Type, setType] = useState<string | null>("");
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const { loading } = useSelector((state: RootState) => state.auth);
  const [timeLeft, setTimeLeft] = useState<number>(900); // 15 minutes in seconds

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const inputValue = queryParams.get("inputValue") || "";
  const type = queryParams.get("type") || "";

  // Handle OTP input change
  const handleInputChange = (value: string, index: number): void => {
    if (!/^\d*$/.test(value)) return; // Allow only numeric input
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // Ensure single-digit input
    setOtp(newOtp);

    // Automatically focus on the next input field
    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(
        `otp-input-${index + 1}`
      ) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  useEffect(() => {
    setContent(inputValue);
    setType(type);
  }, [inputValue, type]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft === 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Handle backspace key
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ): void => {
    if (e.key === "Enter") {
      handleSubmit(); // Call the submit function when Enter is pressed
    } else if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(
        `otp-input-${index - 1}`
      ) as HTMLInputElement;
      prevInput?.focus();
    }
  };

  // Handle paste event
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, otp.length);
    if (!/^\d+$/.test(pasteData)) return; // Allow only numeric input

    const newOtp = pasteData.split("").concat(otp.slice(pasteData.length));
    setOtp(newOtp.slice(0, otp.length));

    // Automatically focus on the last filled input
    const lastFilledIndex = pasteData.length - 1;
    const nextInput = document.getElementById(
      `otp-input-${lastFilledIndex}`
    ) as HTMLInputElement;
    nextInput?.focus();
  };

  // Resend OTP
  const handleResend = () => {
    if (!Content || !Type) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Email and Type are required fields!",
      });
      return;
    }

    setOtp(["", "", "", "", "", ""]);
    const payload = {
      contact: Content,
      type: Type,
    };
    dispatch(loginUser(payload));
    toast.success("OTP Resent Successfully");
    setTimeLeft(900); // Reset the timer to 15 minutes
  };

  // Handle OTP submission
  const handleSubmit = async (): Promise<void> => {
    const otpCode = otp.join("");
    const payload: IVerifyOtp = {
      contact: Content, // Provide the appropriate content value
      otp: otpCode,
      fcmToken: "fcm",
    };
    try {
      const data = await dispatch(verifiyOtpUser(payload)).unwrap();
      console.log("The OTP verification response:", data);
      if (data?.data?.accessToken) {
        toast.success("OTP successfully verified");
        navigate("/");
      } else {
        navigate(`/user/signup?inputValue=${encodeURIComponent(inputValue)}&type=${Type}`);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Verification Failed",
        text:
          (error as { message: string })?.message ||
          "Failed to verify OTP. Please try again.",
      });
    }
  };

  const handleCancel = () => {
    navigate("/user/login");
  };

  const handleGoToGmail = () => {
    window.location.href = "https://mail.google.com"; // Directly open Gmail
  };

  return (
    <div
      className="flex items-center p-2 justify-center min-h-screen relative overflow-hidden"
      style={{
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 animate-pulse"></div>

      <div className="absolute inset-0 adminlogin-background">
        <div className="background-one relative inset-0 flex justify-center items-start pt-[60px]"></div>
        <div className="background-two bg-white"></div>
      </div>

      <div className="relative z-10 flex flex-col bg-white items-center px-[28px] py-[45px] w-full max-w-md admin-login-box">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-sm p-8 bg-white rounded-lg">
            <h2
              className="text-[23px] font-bold mb-6 text-center text-white animate-bouncetext-center"
              style={{ fontFamily: "Unbounded", color: "#24288E" }}
            >
                OTP Verification
            </h2>

            <div className="flex justify-center space-x-2 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  className="w-10 h-10 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
            <p className="mb-6 text-center text-sm text-gray-500">
              <span className="py-2">
                Verify Your Email OTP. Expires in {formatTime(timeLeft)}{" "}
              </span>
              <br />
              <button
                onClick={handleResend}
                className="text-blue-900 font-medium no-underline hover:no-underline hover:bg-blue-900 hover:text-white px-4 py-2 m-2 rounded-full border border-blue-900 transition-all duration-300 ease-in-out"
              >
                Resend OTP
              </button>
              <button
                onClick={handleGoToGmail}
                className="text-blue-900 font-medium no-underline hover:no-underline hover:bg-blue-900 hover:text-white px-4 py-2 m-2 rounded-full border border-blue-900 transition-all duration-300 ease-in-out"
              >
                Open Gmail
              </button>
            </p>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 font-semibold text-white bg-blue-900 hover:bg-blue-950 rounded-full transition-all duration-300 ease-in-out"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                disabled={otp.some((digit) => digit === "")}
                className={`px-4 py-2 font-semibold text-white rounded-full transition-all duration-300 ease-in-out ${
                  otp.some((digit) => digit === "")
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-900 hover:bg-blue-950"
                }`}
                onClick={handleSubmit}
              >
                {loading ? "Verifying ..." : "Verify"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;