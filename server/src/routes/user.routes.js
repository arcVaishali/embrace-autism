const Router = require("express") ;
const userRouter = Router() ;
const verifyJWT  = require("../middlewares/auth.middleware");
const {upload } = require("../middlewares/multer.middleware")

const { login , signup , updatePassword , updateAccountDetails , userData , updateAvatar , updateCoverImage , logout , refreshAccessToken } = require("../controllers/user.controller");

userRouter.route("/login").post( login );
userRouter.route("/signup").post( signup ) ;

userRouter.route("/logout").post( verifyJWT , logout ) ;
userRouter.route("/refresh-token").post(verifyJWT ,refreshAccessToken)
userRouter.route("/userData").get( verifyJWT , userData ) ;
userRouter.route("/updatePassword").patch(verifyJWT , updatePassword );
userRouter.route("/updateAccountDetails").patch( verifyJWT , updateAccountDetails) ;
userRouter.route("/updateAvatar").patch(verifyJWT , upload.single('image') , updateAvatar )
userRouter.route("/updateCoverImage").patch(verifyJWT , upload.single('image') , updateCoverImage )

userRouter.route("/myCommunityEvents")
userRouter.route("/myStories") 
userRouter.route("/myCampaigns")


module.exports = { userRouter } ;