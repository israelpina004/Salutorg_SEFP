import { Link } from "react-router-dom";
import Logo2 from "../../Assets/Images/Logo-5.svg"
import Validation from "./validation"
import { useEffect, useState } from "react";
import ReCaptcha from "../../Components/ReCaptcha/recaptcha";

const Register=()=> {
   const [values, setValues] = useState({
      email: '',
      username: '',
      password: ''
   })
   const [token, setToken] = useState('')
   const [submitEnabled, setSubmitEnabled] = useState(false)

   useEffect(()=>{
      if(token.length) {
         setSubmitEnabled(true)
      }
   }, [token])

   const [errors, setErrors] = useState({})
   const handleInput = (event) => {
      setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
   }
   const handleSubmit = (event) => {
      event.preventDefault();
      setErrors(Validation(values));
   }
   const handleToken = (token) => {
      setToken(token)
   }

   const SITEKEY = "6Lf7V4QqAAAAAAWCTNqw61SEy4pBhEwQvGSnEhYI";

   return (
      <>
         <div id="RegisterPage" className="container-fluid min-vh-100 bg-white">
            <div className="w-100 d-flex align-items-center justify-content-center p-3 border-bottom border-gray-300">
               <Link to="/" className="btn btn-link" style={{minWidth: 120}}>
                  <img width={120} src={ Logo2 } />
               </Link>
            </div>
            <div className="w-100 d-flex align-items-center justify-content-center p-3 border-bottom border-gray-300">
               Apply to become a user:                  
            </div>

            <div className="w-100 d-flex align-items-center justify-content-center p-3 border-bottom border-gray-300">
               <form action="" onSubmit={handleSubmit}>
                  <div style={{paddingTop: 10}}>
                     <input className="nav-search" type="text" placeholder="Enter email:" 
                     name="email" onChange={handleInput} style={{ width: '300px', marginBottom: '10px', padding: '10px' }} />
                     {errors.email && <span className="text-danger">{errors.email}</span>}
                  </div>
                  <div>
                     <input className="nav-search" type="text" placeholder="Set username:" 
                     name="username" onChange={handleInput} style={{ width: '300px', marginBottom: '10px', padding: '10px' }} />
                     {errors.username && <span className="text-danger">{errors.username}</span>}
                  </div>
                  <div style={{paddingBottom: 10}}>
                     <input className="nav-search" type="text" placeholder="Set password:" 
                     name="password" onChange={handleInput} style={{ width: '300px', padding: '10px' }} />
                     {errors.password && <span className="text-danger">{errors.password}</span>}
                  </div>
                  <div>
                     <ReCaptcha sitekey={SITEKEY} callback={handleToken}/>
                  </div>

                  {/* When apply is clicked, should redirect to confirmation page (app-submitted.js) that application was submitted. */}
                  <div className="d-flex align-items-center justify-content-center" style={{paddingTop: 15, paddingBottom: 10}}>
                     <input type="submit" value="Apply" 
                     disabled={!submitEnabled}
                     onClick={handleSubmit}/>
                  </div>
               </form>
            </div>

            <div className="w-100 d-flex align-items-center justify-content-center p-3">
               Already registered with us?&nbsp;<Link to="/login">Login</Link>.
            </div>
         </div>
      </>
   )   
}

export default Register;