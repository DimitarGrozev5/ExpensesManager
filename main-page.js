window.addEventListener("load", () => {

let eventsController = EventsControllerObject();

let swipeController = SwipeEventObject(eventsController);
eventsController.register.swipe = swipeController;

let clickController = ClickEventObject(eventsController, _ => console.log("click"));
eventsController.register.click = clickController;

//Setting up event listeners for the swipe action
let container = document.getElementById("main-content");
container.addEventListener("touchstart", (event) => {
    swipeController.startEvent(event.touches[0].clientX, event.touches[0].clientY);
    clickController.startEvent(event.touches[0].clientX, event.touches[0].clientY);
});
container.addEventListener("touchmove", (event) => {
    swipeController.updateEvent(event.touches[0].clientX, event.touches[0].clientY);
    clickController.updateEvent(event.touches[0].clientX, event.touches[0].clientY);
});
container.addEventListener("touchend", (event) => {
    swipeController.resolve();
    clickController.resolve();
});


//Setting up a click controller for the menu button
let menuController = MenuControllerObject();
let menuButton = document.getElementById("menu-toggle-row");
let menuClickController = ClickEventObject(eventsController, menuController.toggle(document.getElementById("menu").dataset.page));
eventsController.register.click = menuClickController;
menuButton.addEventListener("touchstart", (event) => {
    console.log("test")
    menuClickController.startEvent(event.touches[0].clientX, event.touches[0].clientY);
});
menuButton.addEventListener("touchmove", (event) => {
    menuClickController.updateEvent(event.touches[0].clientX, event.touches[0].clientY);
});
menuButton.addEventListener("touchend", (event) => {
    menuClickController.resolve();
});


//Testing menu animation
let menu = document.getElementById("menu-button");
let keyframes = [
    {clipPath: "polygon(5% 5%, 95% 5%, 95% 95%, 5% 95%, 5% 77%, 95% 77%, 95% 59%, 5% 59%, 5% 41%, 95% 41%, 95% 23%, 5% 23%)"},
    {clipPath: "polygon(5% 23%, 95% 23%, 95% 77%, 5% 77%, 5% 59%, 95% 59%, 95% 59%, 5% 59%, 5% 41%, 95% 41%, 95% 41%, 5% 41%)"},
    {clipPath: "polygon(5% 23%, 95% 23%, 95% 77%, 5% 77%, 5% 59%, 5% 59%, 5% 59%, 5% 59%, 5% 41%, 5% 41%, 5% 41%, 5% 41%)"},
    {clipPath: "polygon(5% 41%, 95% 41%, 95% 59%, 5% 59%, 5% 59%, 5% 59%, 5% 59%, 5% 59%, 5% 59%, 5% 59%, 5% 59%, 5% 59%)"},
    {clipPath: "polygon(5% 41%, 95% 41%, 95% 59%, 95% 59%, 95% 59%, 95% 59%, 95% 59%, 59% 59%, 59% 59%, 41% 59%, 41% 59%, 5% 59%)"},
    {clipPath: "polygon(5% 41%, 95% 41%, 95% 41%, 95% 41%, 95% 41%, 95% 41%, 95% 59%, 59% 59%, 59% 59%, 41% 59%, 41% 59%, 5% 59%)"},
    {clipPath: "polygon(5% 41%, 41% 41%, 41% 41%, 59% 41%, 59% 41%, 95% 41%, 95% 59%, 59% 59%, 59% 59%, 41% 59%, 41% 59%, 5% 59%)",
    transform: "rotate(0deg)"},
    {clipPath: "polygon(5% 41%, 41% 41%, 41% 5%, 59% 5%, 59% 41%, 95% 41%, 95% 59%, 59% 59%, 59% 95%, 41% 95%, 41% 59%, 5% 59%)",
    transform: "rotate(45deg)", offset: 0.5},
    {clipPath: "polygon(5% 41%, 41% 41%, 41% 5%, 59% 5%, 59% 41%, 95% 41%, 95% 59%, 59% 59%, 59% 95%, 41% 95%, 41% 59%, 5% 59%)",
    transform: "rotate(45deg)"},
]
timing = {
    duration: 10000,
    iterations: Infinity
}
//let a = menu.animate(keyframes, timing);
//a.pause();
//a.currentTime = 9999
});