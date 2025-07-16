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
} = require("../controllers/event.controller");

eventRouter.route("/create-community-event").post(verifyJWT , createEvent);
eventRouter.route("/join-community-event").post(verifyJWT , registerForEvent);
eventRouter.route("/unregister-community-event").post(verifyJWT , unregisterFromEvent);
eventRouter.route("/delete-community-event").post(verifyJWT , deleteEvent);
eventRouter.route("/get-all-community-event").get(getAllEvents);
eventRouter.route("/get-this-community-event").post(verifyJWT , getEventById);
eventRouter.route("/update-this-community-event").post(verifyJWT , updateEvent);


module.exports = { eventRouter };
