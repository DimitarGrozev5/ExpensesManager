window.onload = () => {
    /*--------------------Data validation--------------------*/
    

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