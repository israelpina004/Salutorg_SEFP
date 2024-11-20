// Validates if the user's registration parameters are valid.
// Usernames must be at least 3 characters long and contain no spaces.
// Passwords must contain at least one digit, a lowercase and uppercase letter, a special character, and be at least 8 characters long.

function Validation(values) {
    let error = {}
    const EMAILREGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const USERREGEX = /^[^\s]{3,}$/
    const PASSREGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>_\-\[\]\\/])[^\s]{8,}$/

    if (values.email === "") {
        error.email = "Enter your email."
    }
    else if(!email_pattern.test(values.email)) {
        error.email = "???"
    }
    else {
        error.email = ""
    }

    if(values.username === "") {
        error.username = "Enter your username."
    }
    else {
        error.username = ""
    }

    if(values.password === "") {
        error.password = "Enter your password."
    }
    else if(!password_pattern.test(values.password)) {
        error.password = "???"
    }
    else {
        error.password = ""
    }

    return error;
}