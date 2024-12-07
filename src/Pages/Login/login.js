import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo2 from "../../Assets/Images/Logo-5.svg";

function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post("http://localhost:8081/login", {
          username: values.username,
          password: values.password,
        });
        // Login successful
        if (response.data.success) {
          alert(response.data.message);

          // Redirect to the page indicated by backend (user or Superuser)
          navigate(response.data.redirectTo); 
        }
        // Login failed
        else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred while logging in.");
      }
    }
  };

  return (
    <div id="AuthPage" className="container-fluid">
      {/* Header Section */}
      <div className="auth-header">
        <Link to="/" className="auth-logo-link">
          <img src={Logo2} alt="Logo" className="auth-logo" />
        </Link>
      </div>

      {/* Title Section */}
      <div className="auth-title">Login</div>

      {/* Form Section */}
      <div className="auth-form-container">
        <form className="auth-form" action="" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username" 
            name="username"
            onChange={handleInput}
            className="auth-input"
          />
          {errors.username && <span className='text-danger'>{errors.username}</span>}
          <input
            type="password"
            placeholder="Password" 
            name="password"
            onChange={handleInput}
            className="auth-input"
          />
          {errors.password && <span className='text-danger'>{errors.password}</span>}
          <div className="auth-submit-container">
            <input
              type="submit"
              value="Log In"
              className="auth-submit-button"
            />
          </div>
        </form>
      </div>

      <div className="auth-redirect">
        Not a registered user?&nbsp;
        <Link to="/register">Apply</Link>&nbsp;to become one.
      </div>
    </div>
  );
};

export default Login;
