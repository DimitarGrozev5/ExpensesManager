/*
This object will make a reference to all of the menu items
It will also provide animations for expanding end contracting the menu
*/

let MenuControllerObject = () => {
    /*
    The menus and keyframes will be referenced in an array by their consecutive number:
    0 - Stats
    1 - Categories
    2 - Accounts
    3 - Drive
    */
    let menus = [];
    let keyframes = [];

    //Referencing the Toggle button and label
    let toggleElements = [
        document.getElementById("menu-categories-toggle-menu-label"),
        document.getElementById("menu-categories-toggle-menu-icon"),
        document.getElementById("menu")
    ]

    //Referencing the DOM Elements of Submenu Categories
    menus[1] = [
        document.getElementById("menu-categories-add-category-row"),
        document.getElementById("menu-categories-add-category-label"),
        document.getElementById("menu-categories-add-category-icon"),
        document.getElementById("menu-categories-delete-category-row"),
        document.getElementById("menu-categories-delete-category-label"),
        document.getElementById("menu-categories-delete-category-icon"),
        document.getElementById("menu-categories-sort-categories-row"),
        document.getElementById("menu-categories-sort-categories-label"),
        document.getElementById("menu-categories-sort-categories-icon"),
        document.getElementById("menu-categories-divider-2"),
        document.getElementById("menu-categories-top-up-categories-row"),
        document.getElementById("menu-categories-top-up-categories-label"),
        document.getElementById("menu-categories-top-up-categories-icon"),
        document.getElementById("menu-categories-divider-3"),
        document.getElementById("menu-categories-logout-row"),
        document.getElementById("menu-categories-logout-label"),
        document.getElementById("menu-categories-logout-icon"),
    ];
    /*
    The keyframes will be dynamiclly calculated on Object COnstruction
    */
    keyframes[1] = [
        [//Add Category Row
            {opacity: 0, top: 0},
            {opacity: 1, top: "4em", offset: 0.15},
            {opacity: 1, top: "4em"}
        ],
        [
            {opacity: 0, right: "-1em"},
            {opacity: 0, right: "-1em", offset: 0.75},
            {opacity: 1, right: "1em"}
        ],
        [
            {opacity: 1},
            {opacity: 1}
        ],
        [//Delete Category Row
            {opacity: 0, top: 0},
            {opacity: 1, top: "8em", offset: 0.3},
            {opacity: 1, top: "8em"}
        ],
        [
            {opacity: 0, right: "-1em"},
            {opacity: 0, right: "-1em", offset: 0.75},
            {opacity: 1, right: "1em"}
        ],
        [
            {opacity: 1},
            {opacity: 1}
        ],
        [//Sort Categories Row
            {opacity: 0, top: 0},
            {opacity: 1, top: "12em", offset: 0.45},
            {opacity: 1, top: "12em"}
        ],
        [
            {opacity: 0, right: "-1em"},
            {opacity: 0, right: "-1em", offset: 0.75},
            {opacity: 1, right: "1em"}
        ],
        [
            {opacity: 1},
            {opacity: 1}
        ],
        [//Divider 2
            {opacity: 0, top: "16em", right: "0em", left: "100vw"},
            {opacity: 0, top: "16em", right: "0em", left: "100vw", offset: 0.6},
            {opacity: 1, top: "16em", right: "0.5em", left: "0.5em"}
        ],
        [//Top up Category Row
            {opacity: 0, top: 0},
            {opacity: 1, top: "16em", offset: 0.6},
            {opacity: 1, top: "16em"}
        ],
        [
            {opacity: 0, right: "-1em"},
            {opacity: 0, right: "-1em", offset: 0.75},
            {opacity: 1, right: "1em"}
        ],
        [
            {opacity: 1},
            {opacity: 1}
        ],
        [//Divder 3
            {opacity: 0, top: "20em", right: "0em", left: "100vw"},
            {opacity: 0, top: "20em", right: "0em", left: "100vw", offset: 0.75},
            {opacity: 1, top: "20em", right: "0.5em", left: "0.5em"}
        ],
        [//Logout
            {opacity: 0, top: 0},
            {opacity: 1, top: "20em", offset: 0.75},
            {opacity: 1, top: "20em"}
        ],
        [
            {opacity: 0, right: "-1em"},
            {opacity: 0, right: "-1em", offset: 0.75},
            {opacity: 1, right: "1em"}
        ],
        [
            {opacity: 1},
            {opacity: 1}
        ]
    ];

    //Keyframes for the Toggle button
    let keyframesToggle = [
        [
            {opacity: 0, right: "-1em"},
            {opacity: 0, right: "-1em", offset: 0.75},
            {opacity: 1, right: "1em"}
        ],
        [
            {clipPath: "polygon(5% 5%, 95% 5%, 95% 95%, 5% 95%, 5% 77%, 95% 77%, 95% 59%, 5% 59%, 5% 41%, 95% 41%, 95% 23%, 5% 23%)",
            transform: "rotate(0deg)", backgroundColor: "gray"},
            {clipPath: "polygon(5% 23%, 95% 23%, 95% 77%, 5% 77%, 5% 59%, 95% 59%, 95% 59%, 5% 59%, 5% 41%, 95% 41%, 95% 41%, 5% 41%)"},
            {clipPath: "polygon(5% 23%, 95% 23%, 95% 77%, 5% 77%, 5% 59%, 5% 59%, 5% 59%, 5% 59%, 5% 41%, 5% 41%, 5% 41%, 5% 41%)"},
            {clipPath: "polygon(5% 41%, 95% 41%, 95% 59%, 5% 59%, 5% 59%, 5% 59%, 5% 59%, 5% 59%, 5% 59%, 5% 59%, 5% 59%, 5% 59%)"},
            {clipPath: "polygon(5% 41%, 95% 41%, 95% 59%, 95% 59%, 95% 59%, 95% 59%, 95% 59%, 59% 59%, 59% 59%, 41% 59%, 41% 59%, 5% 59%)"},
            {clipPath: "polygon(5% 41%, 95% 41%, 95% 41%, 95% 41%, 95% 41%, 95% 41%, 95% 59%, 59% 59%, 59% 59%, 41% 59%, 41% 59%, 5% 59%)"},
            {clipPath: "polygon(5% 41%, 41% 41%, 41% 41%, 59% 41%, 59% 41%, 95% 41%, 95% 59%, 59% 59%, 59% 59%, 41% 59%, 41% 59%, 5% 59%)",
            transform: "rotate(0deg)"},
            {clipPath: "polygon(5% 41%, 41% 41%, 41% 5%, 59% 5%, 59% 41%, 95% 41%, 95% 59%, 59% 59%, 59% 95%, 41% 95%, 41% 59%, 5% 59%)",
            transform: "rotate(45deg)"},
            {clipPath: "polygon(5% 41%, 41% 41%, 41% 5%, 59% 5%, 59% 41%, 95% 41%, 95% 59%, 59% 59%, 59% 95%, 41% 95%, 41% 59%, 5% 59%)",
            transform: "rotate(45deg)", backgroundColor: "white"},
        ],
        [
            {width: "4em", height: "4em", backgroundColor: "rgba(0, 0, 0, 0)"},
            {width: "100vw", height: "100vh", backgroundColor: "rgba(0, 0, 0, 0)", offset: 0.01},
            {width: "100vw", height: "100vh", backgroundColor: "rgba(0, 0, 0, 0.4)"}
        ]
    ];

    //Setting up timing
    const ANIMATIONDURATION = 5000;
    let timing = {
        duration: ANIMATIONDURATION,
        iterations: 1
    }

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

    //Starting animations that play every time
    let universalAnimations = animationHelperObject();
    
    universalAnimations.add(toggleElements[0].animate(keyframesToggle[0], timing));
    universalAnimations.add(toggleElements[1].animate(keyframesToggle[1], timing));
    universalAnimations.add(toggleElements[2].animate(keyframesToggle[2], timing));

    universalAnimations.pause();

    //Starting Page specific animations
    let pageMenuAnimations = [
        animationHelperObject(),
        animationHelperObject(),
        animationHelperObject(),
        animationHelperObject()
    ];

    /*for (let i = 0; i < menus.length; i++) {*/
    for (let i = 1; i < 2; i++) {
        for (let j = 0; j < menus[i].length; j++) {
            pageMenuAnimations[i].add(menus[i][j].animate(keyframes[i][j], timing));
        }
        pageMenuAnimations[i].pause();
    }

    return {
        resolve: function (targetPageMenu) {
            toggleElements[2].classList.toggle("end");
            universalAnimations.reverse();
            pageMenuAnimations[targetPageMenu].reverse();
        }
    }
}