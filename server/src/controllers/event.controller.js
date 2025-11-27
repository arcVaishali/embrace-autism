const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { Event } = require("../models/events.model");
const { User } = require("../models/user.model");


const createEvent = asyncHandler(async (req, res) => {
  const { name, about, eventDate } = req.body;
  const owner = req.user._id ;
  if (!name || !about || !eventDate) {
    throw new ApiError(400, "All fields are required");
  }

//   coverImage upload to cloudinary pending
  const event = await Event.create({
    name,
    // coverImage,
    about,
    eventDate,
    owner,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, event, "Event created successfully"));
});


const getAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find().populate("owner", "username email");
 const eventsWithFormattedDate = events.map(event => ({
  ...event.toObject(),
  formattedDate: event.formatDate()
}));
  return res
    .status(200)
    .json(new ApiResponse(200, eventsWithFormattedDate, "Events fetched successfully"));
});

const getUpcomingEvents = asyncHandler( async (req , res ) => {
// const events = await Event.upcomingEvents();
  const events = await Event.upcomingEvents().sort({ eventDate: 1 }).limit(5);

  const eventsWithFormattedDate = events.map(event => ({
    ...event.toObject(),
    formattedDate: event.formatDate()
  }));

  return res
    .status(200)
    .json(new ApiResponse(200, eventsWithFormattedDate, "Upcoming events fetched successfully"));
});
const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id).populate(
    "owner",
    "username email"
  );
  if (!event) throw new ApiError(404, "Event not found");
  return res
    .status(200)
    .json(new ApiResponse(200, event, "Event fetched successfully"));
});


const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!event) throw new ApiError(404, "Event not found");
  return res
    .status(200)
    .json(new ApiResponse(200, event, "Event updated successfully"));
});


const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) throw new ApiError(404, "Event not found");
  await event.deleteOne();
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Event deleted successfully"));
});


const registerForEvent = asyncHandler(async (req, res) => {
  const userId = req.user ? req.user._id : req.body.userId;
  const eventId = req.params.id;
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");
  const alreadyRegistered = user.eventsRegistered.some(
    (eid) => eid.toString() === eventId.toString()
  );

  if (!alreadyRegistered) {
    user.eventsRegistered.push(eventId);
    await user.save();
  }
  return res.status(200).json(new ApiResponse(200, {}, "Registered for event"));
});


const unregisterFromEvent = asyncHandler(async (req, res) => {
  const userId = req.user ? req.user._id : req.body.userId;
  const eventId = req.params.id;
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");
  user.eventsRegistered = user.eventsRegistered.filter(
    (eid) => eid.toString() !== eventId
  );
  await user.save();
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Unregistered from event"));
});

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  registerForEvent,
  unregisterFromEvent,
  getUpcomingEvents
};
