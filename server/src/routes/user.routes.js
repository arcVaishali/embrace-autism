const Router = require("express") ;
const userRouter = Router() ;
const verifyJWT  = require("../middlewares/auth.middleware");
const {upload } = require("../middlewares/multer.middleware");

const { login , signup , updatePassword , updateAccountDetails , userData , updateAvatar , updateCoverImage , logout , refreshAccessToken , getRegisteredEvents , getCreatedEvents} = require("../controllers/user.controller");

userRouter.route("/login").post( login );
userRouter.route("/signup").post( signup ) ;

userRouter.route("/logout").post( verifyJWT , logout ) ;
// refresh-token should not require a valid accessToken because the purpose of
// this endpoint is to exchange an existing refresh token for a new access token
userRouter.route("/refresh-token").post(refreshAccessToken)
userRouter.route("/userData").get( verifyJWT , userData ) ;
userRouter.route("/updatePassword").patch(verifyJWT , updatePassword );
userRouter.route("/updateAccountDetails").patch( verifyJWT , updateAccountDetails) ;
userRouter.route("/updateAvatar").patch(verifyJWT , upload.single('image') , updateAvatar )
userRouter.route("/updateCoverImage").patch(verifyJWT , upload.single('image') , updateCoverImage )


userRouter.route("/registered-community-events").get(verifyJWT , getRegisteredEvents)
userRouter.route("/created-community-events").get(verifyJWT , getCreatedEvents)
userRouter.route("/myStories") 
userRouter.route("/myCampaigns")


module.exports = { userRouter } ;