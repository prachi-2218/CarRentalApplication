import { useState,useEffect } from "react";
import { Link } from "react-router";
import Loader from "../Loader/Loader";
import Toast from "../Toast/Toast";
import { useNavigate } from "react-router";


const Sign_up: React.FC = () => {

  const navigate=useNavigate()

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = new URL('./Sign_up.css', import.meta.url).href;
    document.head.appendChild(link);
  
    return () => {
      document.head.removeChild(link);
    };
  }, []);
  
  type form_details = {
    firstName: string,
    lastName:string,
    email: string,
    password: string,
    confirmPassword: string
  }
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [show_Toast,set_Toast] = useState<boolean>(false)
  const [handle_register,set_register]=useState<boolean>(false)
  const [toast_type,set_toast_type]=useState<"success"|"alert">("success")
  const [toast_message,set_toast_message]=useState<string>("")

  const [formData, setFormData] = useState<form_details>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<form_details>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handle_cancel=()=>{
    
      setShowPassword(false)
      setShowConfirmPassword(false)
      setErrors({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
      setFormData({
           firstName: "",
           lastName: "",
           email: "",
           password: "",
           confirmPassword: "",
      })
  }
  const validateFirstName = (value: string, currentErrors: any) => {
    const nameRegex = /^[a-zA-Z]+$/;
    const newErrors = { ...currentErrors };
  
    if (!value.trim()) {
      newErrors.firstName = "First name can't be empty";
    } else if (!nameRegex.test(value)) {
      newErrors.firstName = "Only Latin letters are allowed";
    } else if (value.length < 2) {
      newErrors.firstName = "Name should be at least 2 characters long";
    } else if(value.length>150){
      newErrors.firstName = "Name should be at atmost 150 characters long";
    } else {
      newErrors.firstName = "";
    }
  
    return newErrors;
  };
  
  const validateLastName = (value: string, currentErrors: any) => {
    const lastnameRegex = /^[a-zA-Z]{1,}$/;
    const newErrors = { ...currentErrors };
  
    if (value !== "" && !lastnameRegex.test(value)) {
      newErrors.lastName = "Only Latin letters are allowed";
    } else if(value.length>150){
      newErrors.lastName = "Last name should be at atmost 150 characters long";
    } else {
      newErrors.lastName = "";
    }
  
    return newErrors;
  };
  
  const validateEmail = (value: string, currentErrors: any) => {
    const mailRegex = /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}|(?:\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z-]*[a-zA-Z]:[^\]]+)\]))$/;
    const newErrors = { ...currentErrors };
  
    if (!value.trim()) {
      newErrors.email = "Email can't be empty";
    } else if (!mailRegex.test(value)) {
      newErrors.email = "Invalid email format";
    }else if(value.length>150){
      newErrors.email = "Email should be at atmost 150 characters long";
    } else {
      newErrors.email = "";
    }
  
    return newErrors;
  };
  
  const validatePassword = (value: string, currentErrors: any) => {
    const newErrors = { ...currentErrors };
  
    if (!value.trim()) {
      newErrors.password = "Password can't be empty";
    } else if (/\s/.test(value)) {
      newErrors.password = "Password must not contain spaces";
    } else if (value.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (!/[A-Z]/.test(value)) {
      newErrors.password = "Password should contain at least one capital letter";
    } else if (!/[0-9]/.test(value)) {
      newErrors.password = "Password should contain at least one digit";
    }else if(value.length>150){
      newErrors.password = "Password should be at atmost 150 characters long";
    } else {
      newErrors.password = "";
    }
  
    return newErrors;
  };
  
  const validateConfirmPassword = (value: string, password: string, currentErrors: any) => {
    const newErrors = { ...currentErrors };
  
    if (!value.trim()) {
      newErrors.confirmPassword = "Confirm password can't be empty";
    } else if (value !== password) {
      newErrors.confirmPassword = "Passwords should match";
    } else {
      newErrors.confirmPassword = "";
    }
  
    return newErrors;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { placeholder, value } = e.target;
  
    const fieldMap: Record<
      string,
      {
        field: keyof typeof formData;
        action: (val: string) => void;
      }
    > = {
      "Write your name": {
        field: "firstName",
        action: (val) => {
          const updatedErrors = validateFirstName(val, errors);
          setErrors(updatedErrors);
        },
      },
      "Write your surname": {
        field: "lastName",
        action: (val) => {
          const updatedErrors = validateLastName(val, errors);
          setErrors(updatedErrors);
        },
      },
      "Write your email": {
        field: "email",
        action: (val) => {
          const updatedErrors = validateEmail(val, errors);
          setErrors(updatedErrors);
        },
      },
      "Create password": {
        field: "password",
        action: (val) => {
          const updatedErrors = validatePassword(val, errors);
          setErrors(updatedErrors);
        },
      },
      "Confirm password": {
        field: "confirmPassword",
        action: (val) => {
          const updatedErrors = validateConfirmPassword(val, formData.password, errors);
          setErrors(updatedErrors);
        },
      },
    };
  
    const { field, action } = fieldMap[placeholder];
  
    setFormData((prev) => ({ ...prev, [field]: value }));
    action(value);
  };

  const validate = () => {
    return Object.values(errors).every((error) => error === "");
  };


  async function Register_user() {
    try {
      set_register(true)
      const fetch_data = await fetch("https://436jr2ajxe.execute-api.ap-southeast-2.amazonaws.com/prod/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email.toLowerCase(),
          password: formData.password
        })
      });
  
      const parsed_data = await fetch_data.json();
  
      if (fetch_data.status === 201) {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });  
        setShowPassword(false);
        setShowConfirmPassword(false);
        set_toast_type("success");
        set_toast_message("You have successfully created account");
        set_Toast(true);
        setTimeout(() => {
          navigate('/login');
          set_Toast(false);
        }, 2000);
      } else if (fetch_data.status === 401) {
        setErrors({ ...errors, email: parsed_data.message });
      } else {
        set_toast_type("alert");
        set_toast_message(parsed_data.message);
        set_Toast(true);
        setTimeout(() => set_Toast(false), 2000);
      }
      set_register(false);
    } catch (error) {
      // Handle fetch/network error
      set_toast_type("alert");
      set_toast_message("Network error. Please check your internet connection.");
      set_Toast(true);
      set_register(false);
      setTimeout(() => set_Toast(false), 2000);
    } 
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validate();

    if (isValid) {
      await Register_user()      
    }
  };

  return (
    <div className="main_container">
      <div className="image-container">
        <img
          src="/sign_up_assets/sign_up_image.png"
          alt="Car"
          className="car-image"
        />
      </div>

      <div className="form-container">
        <div className="form-content">
          <h1 className="form-title">Create an account</h1>
          <p className="form-subtitle">
            Enter your details below to get started
          </p>

          <form className="signup-form" onSubmit={handleSubmit}>
            {/* Name fields */}
            <div className="form-group">
              <div className="name-fields">
                <div style={{ width: "100%" }}>
                  <label className="form-label">Name</label>
                  <input
                    id="signup-name"
                    type="text"
                    className={`form-input ${
                      errors.firstName ? "error-input" : ""
                    }`}
                    placeholder="Write your name"
                    style={{ width: "100%" }}
                    onChange={handleChange}
                    value={formData.firstName}
                  />

                  <p
                    className="error-message"
                    style={{
                      visibility: errors.firstName ? "visible" : "hidden",
                    }}
                  >
                    {errors.firstName}
                  </p>
                </div>

                <div style={{ width: "100%" }}>
                  <label className="form-label">Surname</label>

                  <input
                    id="signup-surname"
                    type="text"
                    style={{ width: "100%" }}
                    className={`form-input ${
                      errors.lastName ? "error-input" : ""
                    }`}
                    placeholder="Write your surname"
                    onChange={handleChange}
                    value={formData.lastName}
                  />

                  <p
                    className="error-message"
                    style={{
                      visibility: errors.lastName ? "visible" : "hidden",
                    }}
                  >
                    {errors.lastName}
                  </p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                id="signup-email"
                type="text"
                className={`form-input ${errors.email ? "error-input" : ""}`}
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

            {/* Password */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="password-container">
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  className={`form-input ${
                    errors.password ? "error-input" : ""
                  }`}
                  placeholder="Create password"
                  onChange={handleChange}
                  value={formData.password}
                />
                <button
                  type="button"
                  className="eye-button"
                  onClick={() => setShowPassword(!showPassword)}
                >

                  {showPassword ? 
                   <img src="/sign_up_assets/eye-outline.svg" alt="eye" />
                   : <img src="/sign_up_assets/eye-off-outline.svg" alt="eye" />
                  }
                </button>
              </div>

              {
                  errors.password!=="" ?
                  <p
                className="error-message"
                style={{
                  visibility: errors.password ? "visible" : "hidden",
                  marginBottom:"2px"

                }}
              >
                {errors.password}
              </p>
                   :   <p className="error-message"
                   style={{
                     visibility: !errors.password ? "visible" : "hidden",
                     color:"gray",
                     
                   }}
                 >
                  Minimum 8 characters with at least 1 capital letter and 1 digit
                 </p>
              }
              
            
            </div>

            {/* Confirm Password */}
            <div style={{marginTop:"5px"}} className="form-group">
              <label className="form-label">Confirm Password</label>
              <div className="password-container">
                <input
                  id="signup-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  className={`form-input ${
                    errors.confirmPassword ? "error-input" : ""
                  }`}
                  placeholder="Confirm password"
                  onChange={handleChange}
                  value={formData.confirmPassword}
                />
                <button
                  type="button"
                  className="eye-button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ?
                  <img src="/sign_up_assets/eye-outline.svg" alt="eye" />
                   : <img src="/sign_up_assets/eye-off-outline.svg" alt="eye" />
                   }

                </button>
              </div>
              <p
                className="error-message"
                style={{
                  visibility: errors.confirmPassword ? "visible" : "hidden",
                }}
              >
                {errors.confirmPassword}
              </p>
            </div>

            <div className="button-group">
              <button onClick={handle_cancel} style={{borderRadius:"2rem",height:"100%"}} type="button" className="cancel-button">
                Cancel
              </button>
              <button type="submit" style={handle_register ? {backgroundColor:"rgb(255, 0, 0, 0.6)",borderRadius:"2rem"  } :  {borderRadius:"2rem" }} className="register-button bg-red-600" disabled={handle_register}>
                <span style={{marginRight:"10px"}}> 
                {
                  handle_register ? "Registering" : "Register"
                }
                </span>

                {
                  handle_register && <Loader/>
                }
              </button>
            </div>
          </form>

          <div style={{fontWeight:"500"}} className="login-link">
            Already here? <Link style={{fontWeight:"500"}} to="/login">Log in</Link>
          </div>
        </div>
        {show_Toast && (
          // <div id="toast_wrapper">
            <Toast type={toast_type} message={toast_message}/>
          // </div>
        )}
      </div>
    </div>
  );
};

export default Sign_up;
