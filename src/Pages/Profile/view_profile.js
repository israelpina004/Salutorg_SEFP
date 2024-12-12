import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo2 from "../../Assets/Images/Logo-5.svg";

const Profile = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        rating: null,
    });

    const [error, setError] = useState("");

    // Fetch logged-in user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("/getLoggedInUser");
                const data = await response.json();

                if (data.success) {
                    setUser(data.loggedInUser);
                } else {
                    setError(data.message || "Failed to fetch user data.");
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError("An error occurred while fetching user data.");
            }
        };

        fetchUserData();
    }, []);

    return (
        <>
            <div id="ProfilePage" className="container-fluid bg-white min-vh-100">
                {/* Header with Logo */}
                <div className="w-100 d-flex align-items-center justify-content-center p-3 border-bottom border-gray-300">
                    <Link to="/" className="btn btn-link" style={{ minWidth: 120 }}>
                        <img width={120} src={Logo2} alt="Logo" />
                    </Link>
                </div>

                {/* Tabs Navigation */}
                <div className="tabs-container w-100 p-3 border-bottom border-gray-300">
                    <ul className="nav nav-tabs justify-content-center">
                        <li className="nav-item">
                            <span className="nav-link active">Account</span>
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
                                {error ? (
                                    <p style={{ color: "red" }}>{error}</p>
                                ) : (
                                    <>
                                        <p>
                                            <b>Name:</b> {user.username}
                                        </p>
                                        <p>
                                            <b>Email:</b> {user.email}
                                        </p>
                                        <p>
                                            <b>Rating:</b> {user.rating !== null ? user.rating : "No rating yet"}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
