/*
The ClickEventObject extend the EventObject
The ClickEventObject makes a reference to the DOM Elements that are to be controlled
and it uses the Touch Event data to decide how to control the DOM Elements
*/
let ClickEventObject = (eventsController, onResolve) => {
    //An instance of the EventObject
    let event = EventObject();

    return {
        /*
        Function startEvent records the state at start time
        */
        startEvent: function (clientX, clientY) {
            event.startEvent(clientX, clientY);
            eventsController.registerStartOf.click();
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
            if (event.maxD > 5) {
                this.reject();
            }
            event.updateEvent(clientX, clientY);
        },

        /*
        Function resolve stops the event and plays the animation to the required stop point
        If the conditions are met the current page is changed
        */
        resolve: function () {
            if (event.state.notStarted()) {
                return;
            }
            if (event.maxD > 5) {
                this.reject();
            }
            event.stopEvent();
            eventsController.registerResolveOf.click();
            onResolve();
        },

        /*
        Function reject does the same as resolve
        */
        reject: function () {
            if (event.state.notStarted()) {
                return;
            }
            event.stopEvent();
            eventsController.registerRejectOf.click();
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