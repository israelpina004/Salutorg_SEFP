import { Link } from "react-router-dom";
import Logo2 from "../../Assets/Images/Logo-5.svg"
import { SpaceBar } from "@mui/icons-material";

// Login page
const Login=()=> {
    return (
        <>
            <div id="AuthPage" className="container-fluid min-vh-100 bg-white">
                <div className="w-100 d-flex align-items-center justify-content-center p-3 border-bottom border-gray-300">
                    <Link to="/" className="btn btn-link" style={{minWidth: 120}}>
                        <img width={120} src={ Logo2 } />
                    </Link>
                </div>
                <div className="w-100 d-flex align-items-center justify-content-center p-3 border-bottom border-gray-300">
                    Login                   
                </div>
                
                <div className="w-100 d-flex align-items-center justify-content-center p-3 border-bottom border-gray-300">
                    <form>
                        <div style={{paddingTop: 10}}>
                            <input className="nav-search" type="text" placeholder="Username" style={{ width: '300px', marginBottom: '10px', padding: '10px' }} />
                        </div>
                        <div style={{paddingBottom: 10}}>
                            <input className="nav-search" type="text" placeholder="Password" style={{ width: '300px', padding: '10px' }} />
                        </div>
                    </form>
                </div>

                {/* Links to application page, needs fixing. */}
                <div className="w-100 d-flex align-items-center justify-content-center p-3">
                    Not a registered user?&nbsp;<Link to="/">Apply</Link>&nbsp;to become one.
                </div>
            </div>
        </>
    )
}

export default Login;