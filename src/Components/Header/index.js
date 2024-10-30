import { Link } from "react-router-dom";
import Logo from "../../Assets/Images/logo.png"
import { Button } from "@mui/material/";
import { IoMdSearch } from "react-icons/io";

const Header =()=> {
    return (
        <>
            <header className="header bg-blue">
                <div className="container">
                    <div className="row">
                        
                        <div className="logoWrapper d-flex align-items-center col-sm-2">
                            <Link to={'/'}><img src={Logo} alt="Logo" /></Link>
                        </div>

                        <div className="headerSearch ml-2 ml-3">
                            <input type="text" />
                            <Button><IoMdSearch /></Button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;