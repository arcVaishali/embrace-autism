const Router = require("express");
const eventRouter = Router();
const verifyJWT = require("../middlewares/auth.middleware");
const { upload } = require("../middlewares/multer.middleware");

const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  registerForEvent,
  unregisterFromEvent,
  getUpcomingEvents
} = require("../controllers/event.controller");

eventRouter.route("/get-all-community-event").get(getAllEvents);
eventRouter.route("/get-upcoming-community-event").get(getUpcomingEvents);
// use :id for fetching a single event
eventRouter.route("/get-this-community-event/:id").get(getEventById);

// create event (protected)
eventRouter.route("/create-community-event").post(verifyJWT , createEvent);
// join / unregister use :id of the event
eventRouter.route("/join-community-event/:id").post(verifyJWT , registerForEvent);
eventRouter.route("/unregister-community-event/:id").post(verifyJWT , unregisterFromEvent);
// delete with :id (protected)
eventRouter.route("/delete-community-event/:id").delete(verifyJWT , deleteEvent);
// update an event by id
eventRouter.route("/update-this-community-event/:id").post(verifyJWT , updateEvent);


module.exports = { eventRouter };
