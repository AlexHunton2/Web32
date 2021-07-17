/*

6/5/2021

Description: The whole point of this WidgetStructure System is to sit ontop of the existing React Components and act as
the layer liason between the server (database and persistence) and what the user sees.

*/
/*
This class acts the wrapper for the data that the widget will hold.
It will control the data flow
*/
class WidgetCustomData {
    constructor() {
        this.widgetData = {};
    }
    setPair(key, value) {
        this.widgetData[key] = value;
    }
    removePair(key) {
        this.widgetData[key] = null;
    }
    getPair(key) {
        return this.widgetData[key];
    }
    hasPair(key) {
        for (var k in this.widgetData) {
            if (key == k) {
                return true;
            }
        }
        return false;
    }
    convertJSON() {
    }
}
class WidgetStructureBase {
    constructor() {
        WidgetStructureBase.totalWidgets++;
        this.setCustomData(new WidgetCustomData());
    }
    isDefaultKey(key) {
        return WidgetStructureBase.defaultKeys.includes(key);
    }
    isFinalKey(key) {
        return WidgetStructureBase.finalKeys.includes(key);
    }
    setCustomData(data) {
        this.widgetCustomData = data;
    }
    //Used for the first loads into the data. No database updates
    //MUST BE AN DEFAULT KEY
    initalPair(key, value) {
        if (this.isDefaultKey(key)) {
            this.widgetCustomData.setPair(key, value);
        }
        else {
            throw new Error("WidgetStructureBase Error: Not a default key.");
        }
    }
    // Purpose: Real-time communication to database
    // Should be used when a specific widget wants to save a piece of information about itself
    // example: type or route, or ANY piece of data that needs to be saved and cannot be retrived
    // via a request to the route
    updatePair(key, value) {
        if (!this.isFinalKey(key)) {
            //SENDS REQUEST TO DATABASE FOR AN UPDATE
            this.widgetCustomData.setPair(key, value);
        }
        else {
            throw new Error("WidgetStructureBase Error: Cannot set a final key");
        }
    }
    getPair(key) {
        return this.widgetCustomData.getPair(key);
    }
}
WidgetStructureBase.totalWidgets = 0;
WidgetStructureBase.defaultKeys = ["type", "label", "route", "dbID"]; // Default keys
WidgetStructureBase.finalKeys = ["dbID", "type"]; // Once itialized, these keys cannot be changed. You gotta delete the widget
export class NewWidgetStructure extends WidgetStructureBase {
    constructor(type, label, route) {
        super();
        // TODO: Send request to append to the database with the new widget
        this.initalPair("type", type);
        this.initalPair("label", label);
        this.initalPair("route", route);
        this.initalPair("dbID", WidgetStructureBase.totalWidgets);
    }
}
export class ExistingWidgetStructure extends WidgetStructureBase {
    constructor(dbID) {
        super();
        this.initalPair("dBID", dbID);
        // TODO: Request data using loadData and the dbID
        // TODO: Load that data into the CustomData using initalPair
        // TODO: Add a "WidgetFailed" Widget, check if all defaultkeys have been filled
        // if not, then throw a WidgetFailed Widget instead of the desired Widget.
        // this.initiPair("type", "WidgetFailed")
    }
    loadData() {
        var dbID = this.getPair("dbID");
        // TODO: REQUEST TO THE SERVER PREVIOUS DATA USING dBID
        // SHOULD RETURN DICTIONARY WITH INFO
    }
}
export function requestTotalWidgets() {
    //TODO : Use requestor to ask for all the widgets
    return 0;
}
//# sourceMappingURL=widget-structure.js.map