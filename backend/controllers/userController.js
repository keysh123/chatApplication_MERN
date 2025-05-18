const User = require("../model/userModel");
const bcrypt = require("bcrypt");
module.exports.register = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    const userNameCheck = await User.findOne({ userName: userName });
    if (userNameCheck) {
      return res.json({ message: "UserName Already exists", status: false });
    }
    const emailCheck = await User.findOne({ email: email });
    if (emailCheck) {
      return res.json({ message: "email Already exists", status: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = User.create({
      userName,
      email,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    console.log(error);
    return res.json({ error, status: false });
  }
};
module.exports.login = async (req, res, next) => {
    try {
      const { userName, password } = req.body;
    //   console.log(userName,password)
      const user = await User.findOne({ userName: userName });
      if(!user){
       return res.json({status : false , message : "No user found"})
      }
      const passwordCheck = await bcrypt.compare(password,user.password)
      if(passwordCheck){
       return res.json({status : true , user})
      }
     
      return res.json({ status: false,message :  "Incorrect password" });
    } catch (error) {
      console.log(error);
      return res.json({ error, status: false });
    }
  };

  module.exports.setAvatar = async (req, res, next) => {
    try {
      // const userId = req.params.id
      const userId = req.body.userId
      const avatarImage = req.body.avatarImage
      const userData = await User.findByIdAndUpdate(userId,{
        isAvatarImageSet : true,
        avatarImage
      })
      return res.json({ status: true,image : userData.avatarImage });
    } catch (error) {
      console.log(error);
      return res.json({ error, status: false });
    }
  };
  module.exports.getAllUsers = async (req, res, next) => {
    try {
      const userId = req.params.id
      const usersData = await User.find({_id : {$ne : userId}}).select([
        "_id" , "userName" , "email" , "avatarImage"
      ])
      return res.json({ status: true, usersData });
    } catch (error) {
      console.log(error);
      return res.json({ error, status: false });
    }
  };