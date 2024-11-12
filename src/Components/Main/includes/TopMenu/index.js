import { Link } from "react-router-dom"
import { BsChevronDown } from 'react-icons/bs';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Flag from "../../../../Assets/Images/usa.png"


const TopMenu=()=> {
    return (
        <>
            <div id='TopMenu' className='border-bottom'>
                <div className="d-flex justify-content-between w-100 mx-auto" style={{paddingTop: 15}}>
                    <ul id ='TopMenuLeft' className="d-flex align-items-center text-small text-dark px-2 h-8">
                        <li className="position-relative px-3">
                            <Link href='/auth' className="d-flex align-items-center gap-2 text-decoration-none">
                                <div>Login</div>
                                <BsChevronDown />
                            </Link>
                            <div id='AuthDropdown' className="d-none login position-absolute bg-white">
                                <div className="d-flex align-items-center justify-content-start gap-2 p-3">
                                    <img width={50} src='../../Assets/Images/logo.png' />
                                    <div className="font-weight-bold">Username</div>
                                </div>

                                <div className="border-bottom">
                                    <ul className="bg-white">
                                        <li className="text-small py-2 px-4 w-100 hover-underline text-primary hover:text-primary-dark cursor-pointer">
                                            <Link href='/orders'>
                                                My Orders
                                            </Link>
                                        </li>
                                        <li className="text-small py-2 px-4 w-100 hover-underline text-primary hover:text-primary-dark cursor-pointer">
                                            <Link>
                                                Sign Out
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <ul className="px-3 text-decoration-none cursor-pointer">
                            Help & Contact
                        </ul>
                    </ul>

                    <ul id="TopMenuRight" className="topMenuRight d-flex align-items-center">
                        <ul className="d-flex align-items-center gap-2 px-3 text-decoration-none cursor-pointer">
                            <img width={32} src={Flag} />
                            Ship to
                        </ul>
                        {/* <ul className="px-3 hover:underline cursor-pointer">
                            <div className="relative">
                                <AiOutlineShoppingCart size={22} />
                            </div>
                        </ul>  */}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default TopMenu;