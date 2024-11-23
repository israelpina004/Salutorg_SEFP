import { Link } from "react-router-dom";
import Logo2 from "../../Assets/Images/Logo-5.svg"
import "./register.css";

const Register = () => {
  return (
    <div className="register-container">
      {/* Header Section */}
      <div className="register-header">
        <Link to="/">
          <img src={Logo2} alt="Logo" className="register-logo" />
        </Link>
      </div>

      {/* Title Section */}
      <div className="register-title">
        Apply to become a user
      </div>

      {/* Form Section */}
      <div className="register-form-container">
        <form className="register-form">
          <input
            type="text"
            placeholder="Enter email"
            className="register-input"
          />
          <input
            type="text"
            placeholder="Set username"
            className="register-input"
          />
          <input
            type="password"
            placeholder="Set password"
            className="register-input"
          />
          <div className="register-submit-container">
            <input
              type="submit"
              value="Apply"
              className="register-submit-button"
            />
          </div>
        </form>
      </div>

      {/* Login Redirect Section */}
      <div className="register-login-redirect">
        Already registered with us?&nbsp;
        <Link to="/login">Login</Link>.
      </div>
    </div>
  );
};

export default Register;

