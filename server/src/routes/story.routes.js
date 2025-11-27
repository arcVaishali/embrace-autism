const Router = require("express") ;
const storyRouter = Router() ;


const verifyJWT = require("../middlewares/auth.middleware");
const {createStory , getStories , readStory , deleteStory } = require("../controllers/story.controller") ;

storyRouter.route("/createStory").post( verifyJWT , createStory  ) ;
storyRouter.route("/readStory/:id").get( readStory) ;
storyRouter.route("/getStories").get(getStories) ;
storyRouter.route("/deleteStory").delete(verifyJWT , deleteStory) ;

module.exports = { storyRouter } ;

