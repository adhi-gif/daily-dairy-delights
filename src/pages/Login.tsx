
import React, { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
        size: "invisible",
        callback: () => handleSendOtp(),
      }, auth);
    }
  };

  const handleSendOtp = () => {
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((result) => {
        setConfirmationResult(result);
        alert("OTP sent!");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to send OTP");
      });
  };

  const handleVerifyOtp = () => {
    if (confirmationResult) {
      confirmationResult.confirm(otp)
        .then((result) => {
          login(); // Call your context's login
          navigate("/");
        })
        .catch((err) => {
          alert("Invalid OTP");
        });
    }
  };

  return (
    <div>
      <h2>OTP Login</h2>
      <input
        type="tel"
        value={phone}
        placeholder="Enter phone with +91"
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={handleSendOtp}>Send OTP</button>
      <br />
      <input
        type="text"
        value={otp}
        placeholder="Enter OTP"
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerifyOtp}>Verify OTP</button>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Login;
