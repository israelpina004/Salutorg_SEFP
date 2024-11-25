import { Link } from "react-router-dom"
import Logo2 from "../../Assets/Images/Logo-5.svg"

// Page launches when visitor submits application to become user.
const appSubmitted=()=> {
    return (
        <>
            <div id="RegisterPage" className="container-fluid min-vh-100 bg-white">
                <div className="w-100 d-flex align-items-center justify-content-center p-3 border-bottom border-gray-300">
                    <Link to="/" className="btn btn-link" style={{minWidth: 120}}>
                        <img width={120} src={ Logo2 } />
                    </Link>
                </div>
                <div className="w-100 d-flex align-items-center justify-content-center p-3">
                    Thank you for your application. A super-user will review it and give confirmation to your status as a user
                    as soon as possible.                
                </div>
                <div className="w-100 d-flex align-items-center justify-content-center p-3 border-bottom border-gray-300">
                    Click on our logo to return to the homepage.
                </div>
            </div>
        </>
    )
}

export default appSubmitted;