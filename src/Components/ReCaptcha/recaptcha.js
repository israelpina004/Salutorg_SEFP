import React, { useEffect, useRef, useState } from 'react'

const ReCaptcha = ({sitekey, callback}) => {
    const recaptchaRef = useRef(null);
    const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);
    const [isRecaptchaRendered, setIsRecaptchaRendered] = useState(false);

    const onRecaptchaLoad=()=> {
        console.log("reCAPTCHA script loaded");
        setIsRecaptchaLoaded(true);
    }
    useEffect(()=> {
        window.onRecaptchaLoad = onRecaptchaLoad;
        if(!window.grecaptcha) {
            console.log("Loading reCAPTCHA script...");
            const script = document.createElement('script');
            script.src = "https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit";
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
        } 
        else if(window.grecaptcha && window.grecaptcha.render) {
            console.log("reCAPTCHA already loaded.");
            setIsRecaptchaLoaded(true);
        }

        return()=> {
            window.onRecaptchaLoad = null;
        };
    }, []);

    useEffect(()=>{
        if(isRecaptchaLoaded && !isRecaptchaRendered) {
            if(recaptchaRef.current) {
                console.log("Rendering reCAPTCHA on:", recaptchaRef.current);
                window.grecaptcha.render(recaptchaRef.current, {
                    "sitekey" : sitekey,
                    "callback" : callback
                });
                setIsRecaptchaRendered(true);
            }
            else {
                console.error("recaptchaRef is not available.")
            }
        }
    }, [isRecaptchaLoaded, isRecaptchaRendered]);

    return (
        <>
            <div ref={recaptchaRef}></div>
        </>
    );
};

export default ReCaptcha