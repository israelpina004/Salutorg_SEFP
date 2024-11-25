import { Link } from "react-router-dom";
import Logo2 from "../../Assets/Images/Logo-5.svg"
import { useState } from "react";
import axios from 'axios';

// Login page
const Login=()=> {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        console.log("Form submitted");
        // Send login credentials to the server
        try {
            const response = await axios.post("http://localhost:5000/login", {
                username: username,
                password: password
            });
            console.log("Server response:", response);
            setMessage(response.data.message); // Show success message
        } catch (error) {
            // Handle error responses
            if (error.response && error.response.status === 401) {
                setMessage("Invalid username or password");
            } else {
                setMessage("An error occurred. Please try again.");
            }
        }
    }
    return (
        <>
            <div id="AuthPage" className="container-fluid min-vh-100 bg-white">
                <div className="w-100 d-flex align-items-center justify-content-center p-3 border-bottom border-gray-300">
                    <Link to="/" className="btn btn-link" style={{minWidth: 120}}>
                        <img width={120} src={ Logo2 } />
                    </Link>
                </div>
                <div className="w-100 d-flex align-items-center justify-content-center p-3 border-bottom border-gray-300">
                    Login:                   
                </div>
                
                <div className="w-100 d-flex align-items-center justify-content-center p-3 border-bottom border-gray-300">
                    <form onSubmit={handleSubmit}>
                        <div style={{paddingTop: 10}}>
                            <input className="nav-search" type="text" placeholder="Username" style={{ width: '300px', marginBottom: '10px', padding: '10px' }} 
                            onChange={e => setUserName(e.target.value)}/>
                        </div>
                        <div style={{paddingTop: 10}}>
                            <input className="nav-search" type="password" placeholder="Password" style={{ width: '300px', padding: '10px' }}
                            onChange={e => setPassword(e.target.value)}/>
                        </div>
                        <div className="d-flex align-items-center justify-content-center" style={{paddingTop: 25, paddingBottom: 10}}>
                            <input type="submit" value="Log In" />
                        </div>
                        {message && <p style={{ color: "black", textAlign: "center" }}>{message}</p>}
                    </form>
                </div>

                <div className="w-100 d-flex align-items-center justify-content-center p-3">
                    Not a registered user?&nbsp;<Link to="/register">Apply</Link>&nbsp;to become one.
                </div>
            </div>
        </>
    )
}

export default Login;