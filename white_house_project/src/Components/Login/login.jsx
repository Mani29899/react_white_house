import React from "react";
import { FaUserAlt, FaSignInAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsWhatsapp } from "react-icons/bs";
import { BiLogInCircle } from "react-icons/bi";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { doPost } from "../../Service";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [isRegister, setIsRegister] = useState(undefined);
  const navigate = useNavigate();

  const handleSubmit = () => {
    const credentials = {
      email: email,
      userName: userName,
    };
    if (isRegister) {
      if (!userName || !email) {
        toast.error("need all credentials to register");
        return;
      } else {
        doPost("register", credentials)
          .then((data) => {
            if (data?.response_code === 0) {
              toast.success("Registered Successfully");
              setIsRegister(undefined);
              setTimeout(() => {
                toast.info("Now You Can Login");
              }, 1000);
              return;
            }
          })
          .catch((err) => toast.error(err?.response?.data?.response_message));
      }
    } else {
      doPost("register/login", credentials).then((data) => {
        if (data?.response_code === 0) {
          toast.success("Login Successfully");
          setTimeout(() => {
            navigate("/users");
          }, 1000);
          return;
        }
      }).catch((err) => {
        toast.error(err?.response?.data?.response_message)
      })
    }
  };

  return (
    <div>
      <div className="container">
        <div className="screen">
          <div className="screen__content">
            <div className="login">
              <div className="login__field">
                <FaUserAlt className="login__icon fas fa-user" />
                <input
                  type="text"
                  className="login__input"
                  placeholder="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="login__field">
                <RiLockPasswordFill className="login__icon fas fa-lock" />
                <input
                  type="email"
                  className="login__input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button className="button login__submit" onClick={handleSubmit}>
                <span className="button__text">
                  {isRegister ? isRegister : "Log In Now"}
                </span>
                <BiLogInCircle className="button__icon fas fa-chevron-right" />
              </button>
            </div>
            <div className="social-login">
              <div className="social-icons">
                <button
                  className="button login__submit"
                  onClick={() => setIsRegister("Register")}
                >
                  <span className="button__text">Sign In Now</span>
                  <FaSignInAlt className="button__icon fas fa-chevron-right" />
                </button>
              </div>
            </div>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
