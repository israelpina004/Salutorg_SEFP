import { Link } from "react-router-dom"
import Logo2 from "../../Assets/Images/Logo-5.svg"
import "../Login/login.css"

// Page launches when visitor submits application to become user.
const appSubmitted=()=> {
    return (
        <>
            <div id="AuthPage" className="container-fluid">
                {/* Header Section */}
                <div className="auth-header">
                    <Link to="/" className="auth-logo-link">
                    <img src={Logo2} alt="Logo" className="auth-logo" />
                    </Link>
                </div>
                <div className="auth-redirect">
                    Thank you for your application. A super-user will review it and give confirmation to your status as a user
                    as soon as possible.                
                </div>
                <div className="auth-redirect">
                    Click on our logo to return to the homepage.
                </div>
            </div>
        </>
    )
}

export default appSubmitted;