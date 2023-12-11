import React, { useState } from "react";
import "./index.css";
import authControllers from "../../api/auth";
import logo from "../../components/assests/image/mati.png";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  let [show, setShow] = useState(false);
  let [number, setNumber] = useState("");
  let [otp, setOTP] = useState("");
  const [validation, setValidation] = useState(false);
  let navigate = useNavigate();
  let sendOTP = (data) => {
    authControllers
      .sendOTP({ phone_number: data })
      .then((res) => {
        setShow(true);
          toast.success(res.data.response.message);
          
      })
      .catch((err) => {
          toast.error("Only admin can access");
      });
  };

  const isValidPhoneNumber = (phone) => {
    let abc = /^[6-9]\d{9}$/.test(phone);
    return abc;
  };
  const handlesChange = (event) => {
    let inputValue = event.target.value.replace(/\D/g, "");
    inputValue = inputValue.substring(0, 10);
    setNumber(inputValue);
  };
  const handleGetOTP = () => {
    if (!isValidPhoneNumber(number)) {
      setValidation(true);
    } else {
      sendOTP(number);
    }
  };

  let verifyOTP = (data, data2) => {
    authControllers
      .login({ phone_number: data, otp: data2 })
      .then((res) => {
        localStorage.setItem(
          "access_token",
          res.data.response.message.login_token
        );
        localStorage.setItem("mobile_number", data);

        navigate("/dashboard");
      })
      .catch((err) => {
        console.log("first err", err);
      });
  };
  function handleChange(event) {
    setNumber(event.target.value);
  }
  function otpHandler(event) {
    setOTP(event.target.value);
  }
  const handlesubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-pic">
      <div class="mt-4 pt-3">
        <div class="form ">
          <form class="register-form" onSubmit={handlesubmit}>
            <img src={logo} className="mb-3" width={135} />
            <h6 className=" text-center mt-1 ">Welcome to DhurMaati Portal</h6>

            <input
              className={`mt-3 inputs ${
                validation && number.length === 0 ? "is-invalid" : ""
              }`}
              onChange={handlesChange}
              value={number}
              placeholder="Please enter the phone number"
            />
            {validation && !isValidPhoneNumber(number) && (
              <span className="text-danger foneer">
                Please enter a valid 10-digit mobile number
              </span>
            )}
            <div className="jsa">
              <div className="mt-3">
                {show ? (
                  <a>
                    <h6 className="mt-5">
                      OTP has been sent to your mobile number
                    </h6>
                  </a>
                ) : (
                  <button
                    className="btn btn-success btun"
                    type="button"
                    onClick={handleGetOTP}
                  >
                    Get OTP
                  </button>
                )}
              </div>
              <div className="otp-input-wrapper ">
                {show ? (
                  <div>
                    <input
                      maxlength="4"
                      pattern="[0-9]*"
                      autocomplete="off"
                      className="mt-2"
                      value={otp}
                      onChange={otpHandler}
                    />
                    <svg viewBox="0 0 240 1" xmlns="http://www.w3.org/2000/svg">
                      <line
                        x1="0"
                        y1="0"
                        x2="240"
                        y2="0"
                        stroke="#3e3e3e"
                        stroke-width="2"
                        stroke-dasharray="44,22"
                      />
                    </svg>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div>
                {show ? (
                  <button
                    className="btn btn-success  mt-3"
                    onClick={() => {
                      verifyOTP(number, otp);
                      setShow(false);
                    }}
                  >
                    Verify OTP
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
