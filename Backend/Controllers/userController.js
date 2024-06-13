const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const { ObjectId } = require('mongodb');

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // console.log("He;;p");
    const user = await User.findOne({ username });
    // console.log("Bye");

    if (!user) {
      return res.json({ msg: "Incorrect Username or Password", status: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ msg: "Incorrect Username or Password", status: false });
    }

    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    console.log("jjjjj");
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req,res,next)=>{
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
          "email",
          "username",
          "avatarImage",
          "_id",
          "contacts"
        ]);
        // console.log("Users---------------------------------------------------");
        console.log(users);
        return res.json(users);
      } catch (ex) {
        next(ex);
      }
};

module.exports.setAvatar=async (req,res,next)=>{
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(
          userId,
          {
            isAvatarImageSet: true,
            avatarImage,
          },
          { new: true }
        );
        return res.json({
          isSet: userData.isAvatarImageSet,
          image: userData.avatarImage,
        });
      } catch (ex) {
        next(ex);
      }
};

module.exports.logOut = (req,res,next)=>{
    try {
        if (!req.params.id) return res.json({ msg: "User id is required " });
        onlineUsers.delete(req.params.id);
        return res.status(200).send();
      } catch (ex) {
        next(ex);
      }
};

module.exports.addContact = async (req,res,next)=>{
  try{
    const userId=req.params.id;
    const contactEmail = req.body.contact;
    // console.log(req.body.contact);
    if(!userId || !contactEmail) return res.json({msg:"User id and contact id is required"});
    // const contactId = new ObjectId('your-object-id-as-string')  
    const contactId=await User.find({email:contactEmail}).select([
      "_id"
    ]);

    const userEmail=await User.find({_id:userId}).select([
      "email"
    ]);
    
    console.log("Hello");
    if(!contactId)return res.json({msg:"Contact not found"});
    const user = await User.findByIdAndUpdate(userId,{
      $push:{
        contacts:contactEmail
      }
    },{new:true});
    const contactUpdated=await User.findByIdAndUpdate(contactId,{
      $push:{
        contacts:userEmail
      }
    },{new:true});
    console.log("JJ");
    return res.json({user,contactUpdated});
  }
  catch(ex){
    next(ex);
  }
};