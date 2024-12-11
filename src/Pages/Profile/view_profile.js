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
                <p align="center"> <i>Click the logo above to return to the hompage!</i> </p>

                {/* About Section */}
                <div className="container p-4">
                    <div className="row">
                        {/* About You */}
                        <div className="col-md-6 mb-4">
                            <div className="card shadow-sm p-4">
                                <h5 align="center">About You</h5>
                                <p> <b>Name:</b> User Name  </p>
                                <p> <b>Email:</b>   </p>
                                <p> <b>Rating:</b>   </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
