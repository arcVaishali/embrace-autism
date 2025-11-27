const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { User } = require("../models/user.model");
const { Story } = require("../models/story.model");

const createStory = asyncHandler((req , res)=>{
    const { user , title , description } = req ;
    if ( user === "" || title === "" || description === "")  {
        throw ApiError(401 , "Empty fields");
    }

    Story.insertOne({
        postedBy : user._id ,
        title : title , 
        description: description
    })
})

const readStory = asyncHandler((req , res)=>{

})

const getStories = asyncHandler((req , res )=>{

})

const deleteStory = asyncHandler((req , res)={

})

module.exports = {
    createStory,
    readStory,
    getStories,
    deleteStory
}

