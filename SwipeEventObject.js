/*
The SwipeEventObject extend the EventObject
The SwipeEventObject makes a reference to the DOM Elements that are to be controlled
and it uses the Touch Event data to decide how to control the DOM Elements
*/
let SwipeEventObject = (eventsController) => {
    //An instance of the EventObject
    let event = EventObject();

    //Making a reference to the Main content Pages
    let mainContentPages = [
        document.getElementById("main-content-stats"),
        document.getElementById("main-content-categories"),
        document.getElementById("main-content-accounts"),
        document.getElementById("main-content-drive"),
    ];

    //Making a reference to the Menu items
    let mainContentMenus = [
        document.getElementById("menu-stats").classList,
        document.getElementById("menu-categories").classList,
        document.getElementById("menu-accounts").classList,
        document.getElementById("menu-drive").classList,
    ];

    //Setting up keyframes
    let keyframes = [
        [
            {
                transformOrigin: '50% 50%',
                opacity: 0.5,
                transform: 'scale(0.9) translate(0vw)'
            },
            {
                transform: 'scale(1.0) translate(0vw)',
                opacity: 1,
                offset: 0.2
            },
            {
                transform: 'translate(-100vw)',
                opacity: 0,
                offset: 0.4
            },
            {
                transform: 'translate(-200vw)'
            }
        ],
        [
            {
                transform: 'translate(100vw)'
            },
            {
                transform: 'translate(100vw)',
                opacity: 0,
                offset: 0.2
            },
            {
                transform: 'translate(0vw)',
                opacity: 1,
                offset: 0.4
            },
            {
                transform: 'translate(-100vw)',
                opacity: 0,
                offset: 0.6
            },
            {
                transform: 'translate(-200vw)'
            }
        ],
        [
            {
                transform: 'translate(100vw)'
            },
            {
                transform: 'translate(100vw)',
                opacity: 0,
                offset: 0.4
            },
            {
                transform: 'translate(0vw)',
                opacity: 1,
                offset: 0.6
            },
            {
                transform: 'translate(-100vw)',
                opacity: 0,
                offset: 0.8
            },
            {
                transform: 'translate(-200vw)'
            }
        ],
        [
            {
                transform: 'translate(100vw)'
            },
            {
                transform: 'translate(100vw)',
                opacity: 0,
                offset: 0.6
            },
            {
                transform: 'translate(0vw) scale(1.0)',
                opacity: 1,
                offset: 0.8
            },
            {
                transformOrigin: '50% 50%',
                opacity: 0.5,
                transform: 'translate(0vw) scale(0.9)',
                offset: 1
            },
            {
                transform: 'translate(0vw) scale(0.9)'
            }
        ]
    ];

    //Setting up timing
    const ANIMATIONDURATION = 1000;
    let timing = {
        duration: ANIMATIONDURATION,
        iterations: 1
    }
    //Each page is linked to a specific timing
    let mainContentPagesTiming = [
        ANIMATIONDURATION / 5 * 1,
        ANIMATIONDURATION / 5 * 2,
        ANIMATIONDURATION / 5 * 3,
        ANIMATIONDURATION / 5 * 4
    ];

    //Animation Object that facilitates apllying animation methods to multiple animations
    let animationHelperObject = () => {
        let animationArray = [];

        return {
            get animations () {
                return animationArray;
            },
            add: (animation) => {
                animationArray.push(animation);
            },
            reverse: () => {
                animationArray.forEach(page => page.reverse());
            },
            play: () => {
                animationArray.forEach(page => page.play());
            },
            pause: () => {
                animationArray.forEach(page => page.pause());
            },
            get currentTime() {
                return animationArray[0].currentTime;
            },
            set currentTime(time) {
                animationArray.forEach(page => page.currentTime = time);
            }
        }
    }

    //Starting animations
    let animations = animationHelperObject();
    mainContentPages.forEach(page => page.animate(keyframes, timing));//?????? What is this
    for (let i = 0; i < mainContentPages.length; i++) {
        animations.add(mainContentPages[i].animate(keyframes[i], timing));
    }
    animations.pause();
    
    
    //Setting up the current page
    let currentPage = function () {
        p = 1;
        return {
            get timing() {
                return mainContentPagesTiming[p];
            },
            get page() {
                return p;
            },
            set changeTo(page) {
                p = page;
            }
        }
    }();

    animations.currentTime = currentPage.timing;

    /*
    The following functions control the animation flow and are called from the Methods of the return Object
    */

    let changeCurrentTime = () => {
        let ratio = -1 * event.dX / mainContentPages[0].offsetWidth;
        let currentTiming = currentPage.timing;
        let targetTiming = currentTiming + ANIMATIONDURATION / 5 * ratio;

        //The target Timing should be below the animation total duration
        targetTiming = Math.min(targetTiming, ANIMATIONDURATION);
        //The target Timing should be above 0
        targetTiming = Math.max(0, targetTiming);

        animations.currentTime = targetTiming;
    }

    let resetToCurrentPage = async function () {
        let dt = animations.currentTime - currentPage.timing;
        /*if (dt > 0) {
            animations.reverse();
        } else {
            animations.play();
        }*/
        
        let time = currentPage.timing - animations.currentTime;
        const TIMER = 5
        let tickDown = () => {
            if (time > 0) {
                time = time - TIMER;
                animations.currentTime += TIMER;
                setTimeout(tickDown, TIMER);
            } else {
                animations.currentTime = currentPage.timing;
            }
        }
        let tickUp = () => {
            if (time < 0) {
                time = time + TIMER;
                animations.currentTime -= TIMER;
                setTimeout(tickUp, TIMER);
            } else {
                animations.currentTime = currentPage.timing;
            }
        }
        if (time < 0) {
            tickUp();
        } else {
            tickDown();
        }
    }

    let changeCurrentPage = () => {
        target = currentPage.page - Math.sign(event.dX);

        //The target Timing should be below the array size
        target = Math.min(target, mainContentPagesTiming.length - 1);
        //The target Timing should be above 0
        target = Math.max(0, target);

        //Toggle Menu visibility
        mainContentMenus[currentPage.page].toggle("invisible");

        currentPage.changeTo = target;

        //Toggle Menu visibility
        mainContentMenus[currentPage.page].toggle("invisible");
    }

    return {
        /*
        Function startEvent records the state at start time
        */
        startEvent: function (clientX, clientY) {
            event.startEvent(clientX, clientY);
            eventsController.registerStartOf.swipe();
        },
       
        /*
        Function updateEvent updates the state and determines if
        the Resolve or Reject methods should be activated

        The only criteria for Resolving a Swipe event is on TouchEnd so updateEvent can't resolve it
        The only criteria for Rejecting a Swipe event is if the state is stoped
        */
        updateEvent: function (clientX, clientY) {
            if (event.state.notStarted()) {
                return;
            }
            event.updateEvent(clientX, clientY);
            if (event.state.suspended()) {
                return;
            }
            changeCurrentTime();
        },

        /*
        Function resolve stops the event and plays the animation to the required stop point
        If the conditions are met the current page is changed
        */
        resolve: function () {
            if (event.state.notStarted()) {
                return;
            }
            if (Math.abs(event.Vx) > 0.01 || Math.abs(event.dX) > window.innerWidth / 2) {
                changeCurrentPage();
            }
            resetToCurrentPage();
            event.stopEvent();
            eventsController.registerResolveOf.swipe();
        },

        /*
        Function reject does the same as resolve
        */
        reject: function () {
            if (event.state.notStarted()) {
                return;
            }
            this.resolve();
        },

        /*
        Functions to control the Event state
        */
        suspend: function () {
            event.state.suspend();
        },
        restart: function () {
            event.state.restart();
        }
    }
}