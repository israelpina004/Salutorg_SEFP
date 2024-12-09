import { Link } from "react-router-dom";
import Logo2 from "../../Assets/Images/Logo-5.svg"

const Profile = () => {
    return (
        <>
            <div id="ProfilePage" className="container-fluid bg-white min-vh-100">
                {/* Header with Logo */}
                <div className="w-100 d-flex align-items-center justify-content-center p-3 border-bottom border-gray-300">
                    <Link to= "/" className = "btn btn-link" style = {{minWidth: 120}}>
                        <img width = {120} src = { Logo2 } alt="" />
                    </Link>
                </div>

                {/* Tabs Navigation */}
                <div className="tabs-container w-100 p-3 border-bottom border-gray-300">
                    <ul className="nav nav-tabs justify-content-center">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/account">
                                Account
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/security">
                                Security
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/addresses">
                                Addresses
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/payment-details">
                                Payment Details
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* About Section */}
                <div className="container p-4">
                    <div className="row">
                        {/* About You */}
                        <div className="col-md-6 mb-4">
                            <div className="card shadow-sm p-4">
                                <h5>About You</h5>
                                <p>
                                    <strong>Name:</strong> User Name
                                </p>
                                <p>
                                    <strong>Member Since:</strong> Date Here 
                                </p>
                                <button className="btn btn-outline-dark">
                                    Edit public profile
                                </button>
                            </div>
                        </div>

                        {/* Location Settings */}
                        <div className="col-md-6 mb-4">
                            <div className="card shadow-sm p-4">
                                <h5>Location Settings</h5>
                                <p>Set where you live, what language you speak, and the currency you use.</p>
                                <label htmlFor="region">Region:</label>
                                <select id="region" className="form-control mt-2">
                                    <option value="us">United States</option>
                                    <option value="ca">Canada</option>
                                    <option value="uk">United Kingdom</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;