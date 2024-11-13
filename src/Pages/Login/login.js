import { Link } from "react-router-dom";
import Logo2 from "../../Assets/Images/Logo2.png"


const Login=()=> {
    return (
        <>
            <div className="container-fluid min-vh-100 bg-white">
                <div>
                    <Link href="/" className="btn btn-link" style={{minWidth: 170}}>
                        <img width={170} src={ Logo2 } />
                    </Link>
                </div>

                <div className="w-100 d-flex align-items-center justify-content-center p-3 border-bottom border-gray-300">
                    Login / Register
                </div>

            </div>
        </>
    )
}

export default Login;