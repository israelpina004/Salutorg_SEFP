import { Link } from "react-router-dom";
import Logo2 from "../../Assets/Images/Logo-5.svg";
import "./login.css";

const Login = () => {
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
        <form className="auth-form">
          <input
            type="text"
            placeholder="Username"
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Password"
            className="auth-input"
          />
          <div className="auth-submit-container">
            <input
              type="submit"
              value="Log In"
              className="auth-submit-button"
            />
          </div>
        </form>
      </div>

      {/* Redirect Link Section */}
      <div className="auth-redirect">
        Not a registered user?&nbsp;
        <Link to="/register">Apply</Link>&nbsp;to become one.
      </div>
    </div>
  );
};

export default Login;