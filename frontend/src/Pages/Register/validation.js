function Validation(values) {
    let error = {}
    const EMAILREGEX = /^[^\s@]+@[^\s@]+\.[^\s]+$/
    const USERREGEX = /^[^\s]{3,}$/
    const PASSREGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>_\-\[\]\\/])[^\s]{8,}$/

    if(values.email === "") {
        error.email = "Enter your email."
    }
    // else if(!email_pattern.test(values.email)) {
    //     error.email = "???"
    // }
    else {
        error.email = ""
    }

    if(values.usernmae === "") {
        error.username = "Enter your username."
    }
    else {
        error.username = ""
    }

    if(values.password === "") {
        error.password = "Enter your password."
    }
    // else if(!password_pattern.test(values.password)) {
    //     error.password = "???"
    // }
    else {
        error.password = ""
    }
}