import Balance from "../../Components/Balance/Balance";
import { Link } from "react-router-dom";
import Logo2 from "../../Assets/Images/Logo-5.svg"

const PaymentDetails = ({ isLoggedIn, setIsLoggedIn }) => {
    return(
        <>
            <div id="ProfilePage" className="container-fluid bg-white min-vh-100">
                {/* Header with Logo */}
                <div className="w-100 d-flex align-items-center justify-content-center p-3 border-bottom border-gray-300">
                    <Link to= "/" className = "btn btn-link" style = {{minWidth: 120}}>
                        <img width = {120} src = { Logo2 } alt="" />
                    </Link>
                </div>
                <div>
                    <Balance/>
                </div>
            </div>
        </>
    );

}

export default PaymentDetails;