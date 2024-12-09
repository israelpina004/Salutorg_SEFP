function Validation(values) {
    let error = {}
    
    const EMAILREGEX = /^[^\s@]+@[^\s@]+\.[^\s]+$/
    const USERREGEX = /^[^\s]{3,}$/
    const PASSREGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>_\-\[\]\\/])[^\s]{8,}$/

    if(!values.email) {
        error.email = "Enter your email."
    }
     else if(!EMAILREGEX.test(values.email)) {
         error.email = "Enter a valid email address."
     }

    if(!values.username) {
        error.username = "Enter your username."
    }
    else if(!USERREGEX.test(values.username)) {
        error.username = "Username must be at least three characters long and contain no whitespace."
    }

    if(!values.password) {
        error.password = "Enter your password."
    }
    else if(!PASSREGEX.test(values.password)) {
         error.password = "Password must be at least 8 characters long, contain at least one number, one lowercase and uppercase letter, at least one special character, and no whitespace."
    }

    return error
}

export default Validation;