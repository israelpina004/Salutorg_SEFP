// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Logo2 from "../../Assets/Images/Logo-5.svg";

// const Profile = () => {
//     const [username, setUsername] = useState(""); // State to store username
//     const [registrationDate, setRegistrationDate] = useState(""); // State to store registration date
//     const [rating, setRating] = useState(null); // State to store user rating
//     const [VIPStatus, setVIPStatus] = useState(false); // State to store VIP status

//     // Fetch logged-in user data
//     useEffect(() => {
//         fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/getlogin`, {
//             method: "POST",
//         })
//             .then((res) => {
//                 if (!res.ok) {
//                     return res.json().then((error) => {
//                         throw new Error(`Failed to fetch logged-in user: ${error.message}`);
//                     });
//                 }
//                 return res.json();
//             })
//             .then((data) => {
//                 if (data && data.loggedInUser) {
//                     setUsername(data.loggedInUser.username); // Set the username
//                     setRegistrationDate(data.loggedInUser.registration_date.split("T")[0]); // Set the registration date
//                     setRating(data.loggedInUser.rating); // Set the user rating
//                     setVIPStatus(data.loggedInUser.VIP_status); // Set the VIP status
//                 } else {
//                     console.error("No user is currently logged in.");
//                 }
//             })
//             .catch((err) => console.error("Error fetching logged-in user:", err));
//     }, []);

//     return (
//         <>
//             <div id="ProfilePage" className="container-fluid bg-white min-vh-100">
//                 {/* Header with Logo */}
//                 <div className="w-100 d-flex align-items-center justify-content-center p-3 border-bottom border-gray-300">
//                     <Link to="/" className="btn btn-link" style={{ minWidth: 120 }}>
//                         <img width={120} src={Logo2} alt="Logo" />
//                     </Link>
//                 </div>

//                 {/* Tabs Navigation */}
//                 <div className="tabs-container w-100 p-3 border-bottom border-gray-300">
//                     <ul className="nav nav-tabs justify-content-center">
//                         <li className="nav-item">
//                             <Link className="nav-link active" to="/profile">
//                                 Account
//                             </Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/payment-details">
//                                 Payment Details
//                             </Link>
//                         </li>
//                     </ul>
//                 </div>

//                 {/* About Section */}
//                 <div className="container p-4">
//                     <div className="row">
//                         {/* About You */}
//                         <div className="col-md-6 mb-4">
//                             <div className="card shadow-sm p-4">
//                                 <h5>About You</h5>
//                                 <p>
//                                     <strong>Name:</strong> {username}
//                                 </p>
//                                 <p>
//                                     <strong>Member Since:</strong> {registrationDate}
//                                 </p>
//                                 <p>
//                                     <strong>Rating:</strong> {rating !== null ? rating : "No rating yet"}
//                                 </p>
//                                 <p>
//                                     <strong>VIP status:</strong> {VIPStatus ? "VIP" : "NOT VIP"}
//                                 </p>
//                                 <button className="btn btn-outline-dark">
//                                     Edit public profile
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Location Settings */}
//                         <div className="col-md-6 mb-4">
//                             <div className="card shadow-sm p-4">
//                                 <h5>Location Settings</h5>
//                                 <p>Set where you live, what language you speak, and the currency you use.</p>
//                                 <label htmlFor="region">Region:</label>
//                                 <select id="region" className="form-control mt-2">
//                                     <option value="us">United States</option>
//                                     <option value="ca">Canada</option>
//                                     <option value="uk">United Kingdom</option>
//                                 </select>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Profile;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo2 from "../../Assets/Images/Logo-5.svg";

const Profile = () => {
    const [username, setUsername] = useState(""); // State to store username
    const [registrationDate, setRegistrationDate] = useState(""); // State to store registration date
    const [rating, setRating] = useState(null); // State to store user rating
    const [VIPStatus, setVIPStatus] = useState(false); // State to store VIP status

    // Fetch logged-in user data
    useEffect(() => {
        fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/getlogin`, {
            method: "POST",
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch user data");
                }
                return res.json();
            })
            .then((data) => {
                setUsername(data.loggedInUser.username);
                setRegistrationDate(data.loggedInUser.registration_date);
                setRating(data.loggedInUser.rating);
                setVIPStatus(data.loggedInUser.VIP);
            })
            .catch((err) => {
                console.error("Error fetching profile data:", err);
            });
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
                            <Link className="nav-link active" to="/profile">
                                Account
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
                                    <strong>Name:</strong> {username}
                                </p>
                                <p>
                                    <strong>Member Since:</strong> {registrationDate}
                                </p>
                                <p>
                                    <strong>Rating:</strong> {rating !== null ? rating : "No rating yet"}
                                </p>
                                <p>
                                    <strong>VIP status:</strong> {VIPStatus ? "VIP" : "Standard Member"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
