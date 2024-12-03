import { Link, useNavigate } from "react-router-dom";
import Logo2 from "../../Assets/Images/Logo-5.svg"
import Validation from "./validation"
import { useState } from "react";
import axios from "axios"
import ArithmeticBotChecker from "../../Components/ArithmeticBotCheck/bot-check";
import "./register.css"
// import ReCaptcha from "../../Components/ReCaptcha/recaptcha";

const Register=()=> {

   // Constants and functions used for setting up reCAPTCHA
   // const [token, setToken] = useState('')

   // useEffect(()=>{
   //    if(token.length) {
   //       setSubmitEnabled(true)
   //    }
   // }, [token])
   // const handleToken = (token) => {
   //    setToken(token)
   // }
   // const SITEKEY = "6Lf7V4QqAAAAAAWCTNqw61SEy4pBhEwQvGSnEhYI";

   const [values, setValues] = useState({
      email: '',
      username: '',
      password: ''
   });

   const [submitEnabled, setSubmitEnabled] = useState(false);
   const [errors, setErrors] = useState({});
   
   const handleInput = (event) => {
      setValues(prev => ({...prev, [event.target.name]: event.target.value}));
      // console.log("Updated values:", values);  Debugging step
   };
  
   const navigate = useNavigate();
   
   const handleSubmit = (event) => {
      event.preventDefault();
      const validationErrors = Validation(values); 
      setErrors(validationErrors); 

      if(Object.keys(validationErrors).length === 0) {
         axios.post("http://localhost:8081/register", values)
         .then(res => {
            navigate('/app-submitted')
         })
         .catch(err => {
            if (err.response && err.response.status === 400) {
               setErrors(prevErrors => ({
                  ...prevErrors, 
                  username: err.response.data.error
               }));
            }
            else {
               console.log(err);
            }
         });
      }
   };


   // Helps check if the applicant's answer to the bot check is correct.
   const handleValidAnswer = (isValid) => {
      setSubmitEnabled(isValid);
   }

   return (
      <>
         <div id="AuthPage" className="container-fluid">
            
            <div className="auth-header">
               <Link to="/" className="auth-logo-link">
                  <img src={Logo2} alt="Logo" className="auth-logo" />
               </Link>
            </div>
            
            <div className="auth-title">Apply to become a user</div>

            <div className="auth-form-container">
               
               <form action="" onSubmit={handleSubmit} className="auth-form">
                     
                  <input type="text" placeholder="Enter email:" 
                     name="email" onChange={handleInput} className="auth-input"/>
                  {errors?.email && <span className="text-danger">{errors.email}</span>}
                 
                  <input type="text" placeholder="Set username:"
                     name="username" onChange={handleInput} className="auth-input" />
                  {errors?.username && <span className="text-danger">{errors.username}</span>}
                  
                  <input type="text" placeholder="Set password:" 
                     name="password" onChange={handleInput} className="auth-input" />
                  {errors?.password && <span className="text-danger">{errors.password}</span>}
                  
                  {/* Where the reCAPTCHA would go */}
                  {/* <div>
                     <ReCaptcha sitekey={SITEKEY} callback={handleToken}/>
                  </div> */}
                  
                  <ArithmeticBotChecker onValidAnswer={handleValidAnswer} />

                  {/* When apply is clicked, should redirect to confirmation page (app-submitted.js) that application was submitted. */}
                  <div className="auth-submit-container">
                     <input type="submit" value="Apply" 
                     disabled={!submitEnabled}
                     onClick={handleSubmit} 
                     // Not sure how to implement styling while also implementing the bot check feature correctly.
                     />
                  </div>
               </form>
            </div>

            <div className="auth-redirect">
               Already registered with us?&nbsp;<Link to="/login">Login</Link>.
            </div>
         </div>
      </>
   )   
}

export default Register;