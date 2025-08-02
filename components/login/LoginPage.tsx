
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Redux_store/slices/userSlice";
import Loader from "../Loader/Loader";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = new URL('./LoginPage.css', import.meta.url).href;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  type form_details = {
    email: string;
    password: string;
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loader,set_loader]=useState<boolean>(false)
  const [formData, setFormData] = useState<form_details>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<form_details>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { placeholder, value } = e.target;
    const field = placeholder === "Write your email" ? "email" : "password";
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    const mailRegex = /^\S+@\S+\.\S+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email can't be empty";
    } else if (!formData.email.match(mailRegex)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password can't be empty";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const Login_User = async () => {
    try {
      const response = await fetch("https://436jr2ajxe.execute-api.ap-southeast-2.amazonaws.com/prod/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.toLowerCase(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        // Dispatch the loginUser action with user data to update Redux state
        dispatch(
          loginUser({
            firstname: data.username,
            role: data.role,
            userImgURL: data.userImageUrl || "",
            clientId:data.userId,
            email:data.email
          })
        );

        // Store token in localStorage (optional)
        localStorage.setItem("token", data.token);

        // Navigate to the next page
        navigate("/mybookings");
      } else {
        // Show backend error message in password field
        setErrors({
          email: "",
          password:  "Either email or password is incorrect. Please try again." // || data.message,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({
        email: "",
        password: "Network error. Please check your internet connection.",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validate();

    if (isValid) {
      set_loader(true)
      await Login_User();
      set_loader(false)
    }
  };

  return (
    <div className="main_container">
      <div className="image-container">
        <img
          src="/login_assets/login_image.png"
          alt="Luxury blue car with ocean view"
          className="car-image"
        />
      </div>
      <div className="form-container">
        <div className="form-content">
          <h1 className="login-form-title">Log in</h1>
          <p className="login-form-subtitle">Glad to see you again</p>

          <form className="login-form" onSubmit={handleSubmit}>
            {/*email*/}
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                id="login-email"
                type="text"
                className={`form-input ${errors.password ? "error-input" : ""}`}
                placeholder="Write your email"
                onChange={handleChange}
                value={formData.email}
              />
              <p
                className="error-message"
                style={{
                  visibility: errors.email ? "visible" : "hidden",
                }}
              >
                {errors.email}
              </p>
            </div>

            {/*password*/}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="password-container">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  className={`form-input ${errors.password ? "error-input" : ""}`}
                  placeholder="Write your password"
                  onChange={handleChange}
                  value={formData.password}
                />
                <button
                  type="button"
                  className="eye-button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <img src="/login_assets/eye-outline.svg" />
                  ) : (
                    <img src="/login_assets/eye-off-outline.svg" />
                  )}
                </button>
              </div>
              <div className="error-message-container">
                {errors.password ? (
                  <p className="error-message">{errors.password}</p>
                ) : (
                  <label className="form-label-2">
                    Minimum 8 characters with at least 1 capital letter and 1 digit
                  </label>
                )}
              </div>
            </div>

            {/* Button */}
            <div className="button-group">
              <button type="submit" className="login-button" style={loader?{backgroundColor:"rgb(255, 0, 0, 0.6)"}:{}} onClick={handleSubmit} disabled={loader}>
              <div className="w-[100px]">
              {
                 loader ? "Logging in" : "Login"
              }
            </div>
            <div className="">
              {
                loader ? 
                <Loader/> : ""
              }
            </div>
              </button>
            </div>
          </form>

          <div className="signup-link">
            New here? <Link to="/signup">Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
