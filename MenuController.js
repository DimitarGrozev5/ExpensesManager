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

    //Setting up timing
    const ANIMATIONDURATION = 500;
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

    //Starting animations
    let animations = animationHelperObject();
    for (let i = 0; i < menus[1].length; i++) {
        console.log(menus[1][i].id)
        animations.add(menus[1][i].animate(keyframes[1][i], timing));
    }
    //animations.reverse();
}