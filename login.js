window.onload = () => {
    /*--------------------Data validation--------------------*/
    /*-----Test functions-----*/
    let checkEMail = email => /\S+@\S+\.\S+/.test(email);
    let checkName = name => /.+/.test(name);
    let checkPass = pass => pass.length >= 6;
    let checkPass2 = (pass1, pass2) => pass1 === pass2;
    
    /*-----References to input fields-----*/
    let loginEMail = document.getElementById("login-email-input");
    let loginPass = document.getElementById("login-pass-input");
    let loginSubmit = document.getElementById("login-submit");
    
    let registerName = document.getElementById("register-name-input");
    let registerEMail = document.getElementById("register-email-input");
    let registerPass1 = document.getElementById("register-pass-1-input");
    let registerPass2 = document.getElementById("register-pass-2-input");
    let registerSubmit = document.getElementById("register-submit");
    
    let forgotEMail = document.getElementById("forgot-email-input");
    let forgotSubmit = document.getElementById("forgot-submit");

    /*-----Setting up event listeners focus event-----*/
    let removeErrorClassOnFocus = (event) => event.target.parentElement.classList.remove("error");
    
    loginEMail.addEventListener("focus", removeErrorClassOnFocus);
    loginPass.addEventListener("focus", removeErrorClassOnFocus);
    
    registerName.addEventListener("focus", removeErrorClassOnFocus);
    registerEMail.addEventListener("focus", removeErrorClassOnFocus);
    registerPass1.addEventListener("focus", (event) => {
        removeErrorClassOnFocus(event);
        if (registerPass2.parentElement.classList.contains("error")) {
            registerPass2.value = '';
            removeErrorClassOnFocus({target: registerPass2});
        }
    });
    registerPass2.addEventListener("focus", removeErrorClassOnFocus);
    
    forgotEMail.addEventListener("focus", removeErrorClassOnFocus);

    /*-----Setting up event listeners blur event-----*/
    loginEMail.addEventListener("blur", (event) => {
        if (!checkEMail(event.target.value)) {
            event.target.parentElement.classList.add("error");
        }
    });
    //Login password doesn't require validation
    /*loginPass.addEventListener("blur", (event) => {
        
    });*/
    
    registerName.addEventListener("blur", (event) => {
        if (!checkName(event.target.value)) {
            event.target.parentElement.classList.add("error");
        }
    });
    registerEMail.addEventListener("blur", (event) => {
        if (!checkEMail(event.target.value)) {
            event.target.parentElement.classList.add("error");
        }
    });
    registerPass1.addEventListener("blur", (event) => {
        if (!checkPass(event.target.value)) {
            event.target.parentElement.classList.add("error");
        }
    });
    registerPass2.addEventListener("blur", (event) => {
        if (!checkPass2(event.target.value, registerPass1.value)) {
            event.target.parentElement.classList.add("error");
        }
    });
    
    forgotEMail.addEventListener("blur", (event) => {
        if (!checkEMail(event.target.value)) {
            event.target.parentElement.classList.add("error");
        }
    });

    /*--------------------Data submition--------------------*/
    async function postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST',
            //mode: 'cors', // no-cors, *cors, same-origin
            //credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            //redirect: 'follow', // manual, *follow, error
            //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: data
        });
        return response.text()//.json(); // parses JSON response into native JavaScript objects
    }
    
    registerSubmit.addEventListener("touchend", () => {
        let noError = true;
        noError = noError && !registerName.parentElement.classList.contains("error");
        noError = noError && !!registerName.value;
        noError = noError && !registerEMail.parentElement.classList.contains("error");
        noError = noError && !!registerEMail.value;
        noError = noError && !registerPass1.parentElement.classList.contains("error");
        noError = noError && !!registerPass1.value;
        noError = noError && !registerPass2.parentElement.classList.contains("error");
        noError = noError && !!registerPass2.value;

        if (noError) {
            let data = new Map();
            data.set("name", registerName.value);
            data.set("email", registerEMail.value);
            data.set("pass", registerPass1.value);

            data = Array.from(data.entries()).map(([name, value]) => `${name}=${value}`).join("&");
            
            postData("./php/register.php", data).then(response => {
                if (/^ok.*/.test(response)) {
                    alert("Please check your Email for a validation link.");
                } else {
                    alert("Something went wrong. Please try again later.");
                }
                console.log(response);
            });
        }
    })

    /*--------------------Setting up Register animation--------------------*/
    let register = document.getElementById("register");
    let registerHeader = document.getElementById("register-header");

    let timing = {
        duration: 500,
        iterations: 1
    }

    /*Keyframes for register window*/
    let keyframes = [
        {
            top: "13.5em",
            height: "1em"
        },
        {
            top: "0em",
            height: "20em"
        },
    ]
    let registerAnimation = register.animate(keyframes, timing);
    registerAnimation.pause();

    /*Keyframes for register children*/
    let registerChildren = document.querySelectorAll("div#register > div");
    keyframes = [
        {
            opacity: 0
        },
        {
            opacity: 1
        },
    ];
    let registerChildrenAnimations = Array.from(registerChildren).map(div => div.animate(keyframes, timing));
    registerChildrenAnimations.forEach(a => a.pause());

    /*Keyframes for register header*/
    keyframes = [
        {
            fontSize: "1em",
            opacity: 1
        },
        {
            fontSize: "1.5em",
            opacity: 1
        },
    ];
    let registerHeaderAnimation = registerHeader.animate(keyframes, timing);
    registerHeaderAnimation.pause();

    registerHeader.ontouchend = (event) => {
        if (register.classList.contains("link")) {
            register.classList.toggle("link");
            registerAnimation.play();
            registerHeaderAnimation.play();
            registerChildrenAnimations.forEach(a => a.play());
        }
    }


    
    /*--------------------Setting up Forgot Password animation--------------------*/
    let forgot = document.getElementById("forgot");
    let forgotHeader = document.getElementById("forgot-header");

    timing = {
        duration: 500,
        iterations: 1
    }

    /*Keyframes for forgot window*/
    keyframes = [
        {
            top: "15em",
            height: "1em"
        },
        {
            top: "0em",
            height: "20em"
        },
    ]
    let forgotAnimation = forgot.animate(keyframes, timing);
    forgotAnimation.pause();

    /*Keyframes for forgot children*/
    let forgotChildren = document.querySelectorAll("div#forgot > div");
    keyframes = [
        {
            opacity: 0
        },
        {
            opacity: 1
        },
    ];
    let forgotChildrenAnimations = Array.from(forgotChildren).map(div => div.animate(keyframes, timing));
    forgotChildrenAnimations.forEach(a => a.pause());

    /*Keyframes for forgot header*/
    keyframes = [
        {
            fontSize: "1em",
            opacity: 1
        },
        {
            fontSize: "1.5em",
            opacity: 1
        },
    ];
    let forgotHeaderAnimation = forgotHeader.animate(keyframes, timing);
    forgotHeaderAnimation.pause();

    forgotHeader.ontouchend = (event) => {
        if (forgot.classList.contains("link")) {
            forgot.classList.toggle("link");
            forgotAnimation.play();
            forgotHeaderAnimation.play();
            forgotChildrenAnimations.forEach(a => a.play());
        }
    }
}