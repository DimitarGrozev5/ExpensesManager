/*
EventsControllerObject creates specific Event objects and manages the dependencies between them
*/
let EventsControllerObject = () => {
    //Constants, containing the event names
    const SWIPE = "swipe";
    const CLICK = "click"

    //Helper object, used to apply a command to multiple objects in an array
    let eventGroup = function () {
        let eventsInGroup = [];
        return {
            add: function (event) {
                eventsInGroup.push(event);
            },
            suspend: function () {
                eventsInGroup.forEach(event => event.suspend())
            },
            restart: function () {
                eventsInGroup.forEach(event => event.restart())
            },
            reject: function () {
                eventsInGroup.forEach(event => event.reject())
            },
            resolve: function () {
                eventsInGroup.forEach(event => event.resolve())
            }
        }
    }

    //Object that contains the supported objects
    let eventsMap = new Map();
    eventsMap.set(SWIPE, eventGroup());
    eventsMap.set(CLICK, eventGroup());

    return {
        //Function that returns an object of the supported events
        get eventTypes () {
            return {
                swipe: SWIPE,
                click: CLICK
            }
        },

        //Function Register adds the new event to to Map
        register: {
            set swipe(swipeObj) {
                eventsMap.get(SWIPE).add(swipeObj);
            },
            set click(clickObj) {
                eventsMap.get(CLICK).add(clickObj);
            }
        },

        //Function Start takes care of dependencies
        registerStartOf: {
            swipe: () => {
                //Swipe doesn't affect other events
            },
            click: () => {
                //Click supends swipe
                eventsMap.get(SWIPE).suspend();
            }
        },
        registerResolveOf: {
            swipe: () => {
                //Swipe doesn't affect other events
            },
            click: () => {
                //Click supends swipe
                eventsMap.get(SWIPE).reject();
            }
        },
        registerRejectOf: {
            swipe: () => {
                //Swipe doesn't affect other events
            },
            click: () => {
                //Click supends swipe
                eventsMap.get(SWIPE).restart();
            }
        }
    }
}