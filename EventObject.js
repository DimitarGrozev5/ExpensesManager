/*
EventStates is used to check for the active state of an Event and to change the active state
*/
let eventStates = () => {
    let state = 0;
    return {
        notStarted: () => state === 0,
        suspended: () => state === 1,
        active: () => state === 2,

        start: () => state = 2,
        restart: () => state = state === 1 ? 2 : 0,
        suspend: () => state = state > 0 ? 1 : 0, //An event can only be suspended if it is active
        stop: () => state = 0
    }
}

/*
The Event Object is the base class that is used for collecting and processing touch event data
The main purpose is to save the touch coordinates and to calculate from them values that are useful alseware
*/
let EventObject = () => {
    //The event state hidden property
    let eventState = eventStates();

    //Cooridantes and time when the event started
    let baseX = null;
    let baseY = null;
    let baseT = null;

    //The coordinates and time from the last update
    let currentX = null;
    let currentY = null;
    let currentT = null;

    //Filter object, that calculates a basic filter value of the velocity of movement
    let filterObject = (weight = 0.9) => {
        //The weight of the filter between 0 and 1
        //The higher the weight, the slower reacting the computed Velocity
        let p = weight;

        //The computed velocity
        let v = 0;

        //The previous values of the displacement X and the time T
        let x = null;
        let t = null;

        return {
            get v() {
                return v;
            },
            addPosition: (newX) => {
                //The current time is determined in function
                let newT = Date.now();

                //If the x value is not null
                //Which is to say If there is a previous x value
                if (!!x) {
                    //Applying the filter
                    v = v * p + (newX - x) / (newT - t) * (1 - p);
                }
                x = newX;
                t = newT;
            }
        }
    }
    //Setting filters for the different dirrections of travel
    let V = filterObject();
    let Vx = filterObject();
    let Vy = filterObject();

    //Saving the maximum displacement
    let maxDisplacement = 0;

    return {
        //Getter that returns the Event state
        get state () {
            return eventState;
        },
        //Getters that return basic calculated values
        get dX () {
            return currentX - baseX;
        },
        get dY () {
            return currentY - baseY;
        },
        get dT () {
            return currentT - baseT;
        },
        get V () {
            return V.v;
        },
        get Vx () {
            return Vx.v;
        },
        get Vy () {
            return Vy.v;
        },
        get maxD () {
            return maxDisplacement;
        },
        startEvent: (clientX, clientY) => {
            eventState.start();
            baseX = clientX;
            baseY = clientY;
            baseT = Date.now();
            currentX = clientX;
            currentY = clientY;
            currentT = Date.now();

            V = filterObject();
            Vx = filterObject();
            Vy = filterObject();

            maxDisplacement = 0;
        },
        //When suspending the event, noting else needs to be changed
        suspendEvent: () => eventState.suspend(),
        restartEvenet: () => eventState.restart(),
        updateEvent: (clientX, clientY) => {
            if (!eventState.notStarted()) {
                
            }
            //Calculating velocities
            let D = Math.sqrt(
                Math.pow(clientX - currentX, 2) + Math.pow(clientY - currentY, 2)
            );
            V.addPosition(D);
            Vx.addPosition(clientX - currentX);
            Vy.addPosition(clientY - currentY);

            //Checking the maximum difference
            maxDisplacement = Math.max(maxDisplacement, D);

            //Updating current values
            currentX = clientX;
            currentY = clientY;
            currentT = Date.now();
        },
        stopEvent: () => {
            //When stoping an Event the function retruns a copy of the last computed values
            let copy = {
                state: eventState,
                dX: currentX - baseX,
                dY: currentY - baseY,
                V: V.v,
                Vx: Vx.v,
                Vy: Vy.v
            }

            //Clearing all values
            eventState.stop();
            baseX = null;
            baseY = null;
            baseT = null;
            currentX = null;
            currentY = null;
            currentT = null;
            V = filterObject();
            Vx = filterObject();
            Vy = filterObject();

            return copy;
        }
    }
}