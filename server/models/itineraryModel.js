const { ObjectId } = require("mongodb");

class Itinerary {
  constructor(user, selectedEvents, selectedRestaurants) {
    this.user = user;
    this.selectedEvents = selectedEvents;
    this.selectedRestaurants = selectedRestaurants;
  }
}
module.exports = Itinerary;
